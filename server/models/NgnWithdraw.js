import mongoose from 'mongoose';

const ngnTransactionSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  reference: {
    type: String,
    required: true,
  },
  cust_reference: {
    type: String,
    required: true,
  },
  transferType: {
    type: String,
    lowercase: true,
  },
  status: {
    type: String,
    lowercase: true,
    default: 'delivered',
  },
  amount: {
    type: Number,
    lowercase: true,
  },
  currency: {
    type: String,
    default: 'NGN',
  },
  account_name: {
    type: String,
    required: true,
    lowercase: true,
  },
  account_number: {
    type: Number,
    lowercase: true,
  },
  bank: {
    type: String,
    lowercase: true,
  },
  doneAt: {
    type: String,
  },
});

export default mongoose.model('NgnTransaction', ngnTransactionSchema);
