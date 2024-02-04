import User from '../models/Users.js';
import NgnWithdraw from '../models/NgnWithdraw.js';
import StellarKyc from '../models/StellarKyc.js';

import { NairaWithdraw, NgnTransfer } from '../utils/bani.js';

import { transferWithdrawTransaction } from '../utils/mail.js';

import {
  verifyCustomerBVN,
  verifyCustomer,
  verifyLicence,
} from '../utils/kyc.js';

export const withdraw = async (req, res) => {
  const {
    id,
    bankName,
    bankCode,
    amount,
    custRef,
    account_name,
    account_number,
  } = req.body;

  if (amount < 100) {
    return res.status(403).json({
      status: 'Failed',
      message: 'Minimum withdrawal amount is 100 NGN',
    });
  }

  try {
    if (!amount) return res.status(400).send('Amount is required');
    if (!bankName) return res.status(400).send('Amount is required');
    if (!account_name) return res.status(400).send('Account name is required');
    if (!account_number)
      return res.status(400).send('Account number is required');

    const userDetails = await User.findById({ _id: id });

    const firstName = account_name.split(' ')[0];
    const lastName = account_name.split(' ')[1];
    const accNum = account_number;

    const nairaWithdraw = await NairaWithdraw({
      amount,
      custRef,
      firstName,
      lastName,
      bankCode,
      accNum,
    });

    if (nairaWithdraw.status !== true) {
      return res.status(403).json({
        status: 'Failed',
        message: nairaWithdraw.message,
      });
    }

    const bankTransaction = new NgnWithdraw({
      userId: id,
      fullName: `${userDetails.name}`,
      email: userDetails.email,
      reference: nairaWithdraw.payout_ref,
      cust_reference: custRef,
      transferType: 'Withdraw',
      status: 'pending',
      amount,
      account_name,
      account_number,
      bank: `${bankName} ${bankCode}`,
      doneAt: new Date().toISOString().split('T')[0],
    });
    await bankTransaction.save();

    res.status(201).json({
      status: 200,
      message: '✅ Withdrawal request created',
    });
  } catch (error) {
    res.status(409).json({
      message: '❌ bank withdrawal request unsuccessful',
      message: error.message,
    });
  }
};

export const transfer = async (req, res) => {
  const {
    userId,
    userName,
    accNum,
    amount,
    value,
    payout,
    custRef,
    walletAddress,
  } = req.body;

  if (amount < 100) {
    return res.status(403).json({
      status: 'Failed',
      message: 'Minimum transfer amount is 100 NGN',
    });
  }

  try {
    const userDetails = await User.findById({ _id: userId });

    const nairaTransfer = await NgnTransfer({
      amountPayout: payout,
      custRef,
    });

    if (nairaTransfer.status !== true) {
      return res.status(403).json({
        status: 'Failed',
        message: nairaTransfer.message,
      });
    }

    const bankTransaction = new NgnWithdraw({
      userId,
      fullName: `${userDetails.name}`,
      reference: nairaTransfer.payout_ref,
      cust_reference: custRef,
      transferType: 'Transfer',
      status: 'pending',
      amount,
      account_name: 'External Transfer',
      account_number: '7818601225',
      bank: `wema bank 000017`,
      doneAt: new Date().toISOString().split('T')[0],
    });
    await bankTransaction.save();

    // Send Email of transaction info details to admin
    transferWithdrawTransaction({
      userName,
      accNum,
      amount,
      value,
      walletAddress,
    });

    res.status(201).json({
      status: 200,
      message: '✅ Transfer request created',
    });
  } catch (error) {
    res.status(409).json({
      message: '❌ Transfer request unsuccessful',
      message: error.message,
    });
  }
};

export const getTransactions = async (req, res) => {
  const { id } = req.query;
  try {
    const withdrawals = await NgnWithdraw.find({ userId: id });

    if (withdrawals.length > 0) {
      res.status(200).json({ status: 'success', withdrawals });
    } else {
      res.status(203).json({ status: 'okay', withdrawals: null });
    }
  } catch (error) {
    res.status(404).json({ status: 'failed', message: error.message });
  }
};

export const multiChainWithdraw = async (req, res) => {
  const { id, user, linkTag, network_address, amount, network } = req.body;

  try {
    if (!amount) return res.status(400).send('❗Amount is required');

    const userTag = await User.findOne({ linkTag }).exec();
    if (!userTag) return res.status(404).send('❗Your linkTag is wrong');

    // const multiChainTransaction = new Withdrawal({
    //   transaction: 'MultiChain Withdraw',
    //   userId: id,
    //   user: user,
    //   amount,
    //   linkTag,
    //   network,
    //   network_address,
    // });
    // await multiChainTransaction.save();

    res.status(201).json({
      status: 200,
      message: '✅ MultiChain withdrawal request created',
      multiChainTransaction,
    });
  } catch (error) {
    res.status(409).json({
      status: 400,
      message: '❌ MultiChain withdrawal request unsuccessful',
      message: error.message,
    });
  }
};

export const validateKYC = async (req, res) => {
  const { idType, idCode, idNumber, email, address } = req.query;

  // Check if Kyc details exist
  const existingUser = await StellarKyc.findOne({ id_number: idNumber });
  if (existingUser)
    return res.json({
      status: 'Failed',
      message: '❌This ID details already exist. Please check again.',
    });

  let getUSerData;
  try {
    if (idType === 'BVN') {
      getUSerData = verifyCustomerBVN;
    } else if (idType === 'NIN') {
      getUSerData = verifyCustomer;
    } else if (idType === 'Voters Card') {
      getUSerData = verifyCustomer;
    } else if (idType === 'Driving License') {
      getUSerData = verifyLicence;
    }

    const customerStat = await getUSerData({
      type: idCode,
      number: idNumber,
    });
    // console.log(customerStat);

    if (customerStat.error) {
      return res.json({
        status: 'Failed',
        message: customerStat.error,
      });
    } else {
      const newCustomer = new StellarKyc({
        wallet_address: address,
        id_type: idType,
        id_number: idNumber,
        contact_email: email,
        doneAt: new Date().toISOString().split('T')[0],
      });
      await newCustomer.save();

      return res.json({
        status: 'success',
        message: 'Validation successful',
      });
    }
  } catch (error) {
    res.status(404).json({ status: 'failed', message: error.message });
  }
};
