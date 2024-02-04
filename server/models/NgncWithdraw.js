import mongoose from 'mongoose';

const ngncTransactionSchema = new mongoose.Schema({
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
  asset: {
    type: String,
    lowercase: true,
    default: 'NGNC',
  },
  wallet_address: {
    type: String,
    lowercase: true,
  },
  network: {
    type: String,
  },
  doneAt: {
    type: String,
  },
});

export default mongoose.model('NgncTransaction', ngncTransactionSchema);
