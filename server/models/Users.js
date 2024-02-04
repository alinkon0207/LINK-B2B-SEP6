import Mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const { Schema } = Mongoose;

const userSchema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    linkTag: {
      type: String,
      trim: true,
    },
    bvn: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    street: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      min: 8,
      max: 64,
    },
    avatar: {
      type: String,
      default: '/avatar.png',
    },
    accountLock: {
      type: Boolean,
      default: true,
    },
    accessMode: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: 'live',
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (password) {
  const result = bcrypt.compareSync(password, this.password);
  return result;
};

export default Mongoose.model('Business', userSchema);
