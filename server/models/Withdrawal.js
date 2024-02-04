import Mongoose from "mongoose";

const { Schema } = Mongoose;

const WithdrawSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    transaction: {
      type: String,
      trim: true,
    },
    transferType: {
      type: String,
      lowercase: true,
      default: "",
    },
    status: {
      type: String,
      lowercase: true,
      default: "processing",
    },
    account_name: {
      type: String,
      trim: true,
    },
    account_number: {
      type: Number,
      trim: true,
    },
    amount: {
      type: Number,
      trim: true,
    },
    bankName: {
      type: String,
      trim: true,
    },
    bankCode: {
      type: Number,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  }
  // { timestamps: true }
);

export default Mongoose.model("Withdrawal", WithdrawSchema);
