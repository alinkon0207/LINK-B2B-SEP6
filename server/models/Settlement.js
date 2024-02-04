import mongoose from 'mongoose';

const settlementSchema = new mongoose.Schema({
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
  settlementType: {
    type: String,
    lowercase: true,
    required: true,
  },
  ngncNetwork: {
    type: String,
    lowercase: true,
  },
  token: {
    type: String,
    lowercase: true,
  },
  tokenNetwork: {
    type: String,
    lowercase: true,
  },
  walletAddress: {
    type: String,
    lowercase: true,
  },
  linkAddress: {
    type: String,
    lowercase: true,
  },
  proofOfPayment: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  doneAt: {
    type: String,
  },
});

export default mongoose.model('Settlement', settlementSchema);
