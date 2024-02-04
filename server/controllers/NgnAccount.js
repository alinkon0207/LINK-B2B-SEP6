import ngnAccount from '../models/NgnAccount.js';
import NgnWithdraw from '../models/NgnWithdraw.js';

// import { verifyAccNumber } from '../utils/baniTest.js';
import { verifyAccNumber } from '../utils/bani.js';

// Get data of Virtual account Created
export const getUserAccountData = async (req, res) => {
  const { id } = req.query;

  try {
    const accounts = await ngnAccount.find({ user: id });
    res.status(200).json({ status: 'success', accounts });
  } catch (error) {
    res.status(404).json({ status: 'failed', message: error.message });
  }
};

// Get data of Virtual account Created
export const getAllAccountsData = async (req, res) => {
  try {
    const accounts = await ngnAccount.find({ status: 'live' });
    res.status(200).json({ status: 'success', accounts });
  } catch (error) {
    res.status(404).json({ status: 'failed', message: error.message });
  }
};

export const checkAccountNumber = async (req, res) => {
  const { num, bankCode } = req.query;
  // console.log(num, bankCode);
  try {
    const customerName = await verifyAccNumber({ accNum: num, bankCode });
    // console.log(customerName);

    if (customerName.status !== true) {
      return res.status(400).json({
        status: 'Failed',
        message: customerName.message,
      });
    } else {
      return res.status(200).json({
        status: 'success',
        name: customerName.account_name,
      });
    }
  } catch (error) {
    res.status(404).json({ status: 'failed', message: error.message });
  }
};

// Bani Account webhooks
export const baniWebhook = async (req, res) => {
  const webhook = req.body;
  try {
    switch (webhook.event) {
      // webhook case when amount is transferred successfully
      case 'payout':
        const bani_payout = webhook.data;
        const payout_details = bani_payout.payout_details;
        // console.log(payout_details);
        const node = await NgnWithdraw.findOne({
          cust_reference: payout_details.payout_ext_ref,
        });
        const send_response = await ngnAccount.findOne({
          user: node.userId,
        });
        const emailDebit = send_response.email;
        const amountOut = send_response.balance;
        const amountCharged = payout_details.receiver_amount;
        const newDebitBalance = amountOut - amountCharged;
        await ngnAccount.findOneAndUpdate(
          { account_number: send_response.account_number },
          {
            balance: newDebitBalance,
          }
        );
        await NgnWithdraw.findOneAndUpdate(
          { cust_reference: payout_details.payout_ext_ref },
          {
            status: 'delivered',
          }
        );
        break;

      // webhook case when amount is received in account
      case 'payin_bank_transfer':
        const bani_payin = webhook.data;
        // console.log(bani_payin);
        const receive_response = await ngnAccount.findOne({
          account_id: bani_payin.customer_ref,
        });
        const emailCredit = receive_response.email;
        const amountIn = receive_response.balance;
        const amountReceived = bani_payin.merch_amount;
        const newCreditBalance = amountIn + amountReceived;
        await ngnAccount.findOneAndUpdate(
          { account_id: bani_payin.customer_ref },
          {
            balance: newCreditBalance,
          }
        );
        const depositIn = new NgnWithdraw({
          userId: receive_response.user,
          fullName: receive_response.account_name,
          email: emailCredit,
          reference: bani_payin.pay_ref,
          cust_reference: bani_payin.transaction_ref,
          transferType: 'deposit',
          status: 'delivered',
          amount: bani_payin.merch_amount,
          currency: 'NGN',
          account_name: 'external payin',
          doneAt: new Date().toISOString().split('T')[0],
        });
        await depositIn.save();
        break;
      // accountCredit(amountReceived, newCreditBalance, emailCredit);

      // webhook case when amount is transferred successfully
      case 'payout_reversal':
        const bani_reverse = webhook.data;
        break;
      // console.log(bani_reverse);
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
};
