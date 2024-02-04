import mongoose from 'mongoose';

let addressSchema = new mongoose.Schema({
  asset_guid: {
    type: String,
  },
  asset_uid: {
    type: String,
  },
  asset_address: {
    type: String,
  },
  address_ref: {
    type: String,
  },
  asset_id: {
    type: String,
  },
  asset_type: {
    type: String,
  },
  asset_chain: {
    type: String,
  },
  streamable: {
    type: Boolean,
    default: false,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  Business: {
    type: String,
  },
  subAccount_id: {
    type: String,
  },
  external_id: {
    type: String,
  },
  account_id: {
    type: String,
  },
  organization_id: {
    type: String,
  },
  network: {
    type: String,
  },
  addresses: [addressSchema],
});
export default mongoose.model('NgncWallet', walletSchema);
