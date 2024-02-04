import Mongoose from "mongoose";
const { Schema } = Mongoose;

const kybSchema = new Schema({
  businessName: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  contactMail: {
    type: String,
    trim: true,
    required: false,
    unique: true,
    lowercase: true,
  },
});

export default Mongoose.model("UserKyb", kybSchema);
