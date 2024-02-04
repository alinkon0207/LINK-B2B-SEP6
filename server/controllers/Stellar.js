import Stellar from '../models/Stellar.js';

import {
  LobstrDepositTransaction,
  LobstrWithdrawTransaction,
} from '../utils/mail.js';

// Endpoint for receiving stellar deposit form input
export const depositNgnc = async (req, res) => {
  const {
    transaction,
    transaction_id,
    reference,
    asset_code,
    amount,
    fee,
    wallet_address,
    account_number,
    bankName,
    vendor_name,
    vendor_accNumber,
    vendor_bank,
  } = req.body;

  try {
    if (!amount) return res.status(400).send('Amount is required');
    if (!wallet_address)
      return res.status(400).send('Please provide a wallet address');

    const newDeposit = new Stellar({
      transaction,
      transaction_id,
      reference,
      asset_code,
      amount,
      fee,
      wallet_address,
      account_number,
      bank_name: bankName,
      vendor_name,
      vendor_accNumber,
      vendor_bank,
      doneAt: new Date().toISOString().split('T')[0],
    });
    await newDeposit.save();

    // Send Email of transaction info details to admin
    LobstrDepositTransaction(newDeposit);

    res.json({
      status: 200,
      message: '✅ Deposit request created successfully',
    });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

// Endpoint for receiving stellar withdrawal form input
export const withdrawNgnc = async (req, res) => {
  const {
    transaction,
    transaction_id,
    reference,
    asset_code,
    amount,
    fee,
    wallet_address,
    account_name,
    account_number,
    bankName,
  } = req.body;

  try {
    if (!account_name) return res.status(400).send('Account name is required');

    const newWithdrawal = new Stellar({
      transaction,
      transaction_id,
      reference,
      asset_code,
      amount,
      fee,
      wallet_address,
      account_name,
      account_number,
      bank_name: bankName,
      doneAt: new Date().toISOString().split('T')[0],
    });
    await newWithdrawal.save();

    // Send Email of transaction info details to admin
    LobstrWithdrawTransaction(newWithdrawal);

    res.json({
      status: 200,
      message: '✅ Withdraw request created successfully',
    });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};
