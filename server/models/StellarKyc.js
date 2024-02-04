import Mongoose from 'mongoose';
const { Schema } = Mongoose;

const kycSchema = new Schema({
  wallet_address: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  id_type: {
    type: String,
    required: false,
    lowercase: true,
  },
  id_number: {
    type: String,
    required: false,
    lowercase: true,
  },
  contact_email: {
    type: String,
    required: false,
    unique: true,
    lowercase: true,
  },
  doneAt: {
    type: String,
  },
});

export default Mongoose.model('CustomerKyc', kycSchema);
