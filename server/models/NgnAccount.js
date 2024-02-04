import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  account_id: {
    type: String,
  },
  account_name: {
    type: String,
    trim: true,
    required: true,
    lowercase: false,
  },
  account_number: {
    type: String,
    trim: true,
    required: true,
  },
  account_type: {
    type: String,
    trim: true,
  },
  reference: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  bvn: {
    type: Number,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    default: 'NGN',
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  bank_name: {
    type: String,
    required: true,
  },
  bank_code: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    default: 'live',
  },
});

export default mongoose.model('virtualAccount', accountSchema);
