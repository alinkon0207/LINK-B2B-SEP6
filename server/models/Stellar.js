import mongoose from 'mongoose';

const { Schema } = mongoose;

const stellarSchema = new Schema({
  transaction: {
    type: String,
    trim: true,
    required: true,
  },
  transaction_id: {
    type: String,
    lowercase: false,
    required: true,
  },
  reference: {
    type: Number,
    required: true,
  },
  asset_code: {
    type: String,
    lowercase: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  fee: {
    type: Number,
  },
  wallet_address: {
    type: String,
    trim: true,
  },
  account_name: {
    type: String,
    default: null,
  },
  account_number: {
    type: String,
  },
  bank_name: {
    type: String,
  },
  vendor_name: {
    type: String,
  },
  vendor_accNumber: {
    type: String,
  },
  vendor_bank: {
    type: String,
  },
  doneAt: {
    type: String,
  },
});

export default mongoose.model('Sep24Ramp', stellarSchema);
