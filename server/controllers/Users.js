import User from '../models/Users.js';
import UserKyb from '../models/userKyb.js';
import ngnAccount from '../models/NgnAccount.js';
import ngncWallet from '../models/NgncWallet.js';
import ResetToken from '../models/resetToken.js';
import StellarKyc from '../models/StellarKyc.js';
import bcrypt from 'bcryptjs';
import { Buffer } from 'node:buffer';
import jwt from 'jsonwebtoken';
const salt = await bcrypt.genSalt(10);

import {
  businessKyb,
  userResetPassword,
  userResetPasswordSuccessful,
} from '../utils/mail.js';

// import { createCustomer, createCustomerAccount } from '../utils/baniTest.js';
import { createCustomer, createCustomerAccount } from '../utils/bani.js';

// import {
//   createSubAccount,
//   createSubAccountAddress,
// } from '../utils/bitpowrTest.js';
import { createSubAccount, createSubAccountAddress } from '../utils/bitpowr.js';

// Used to handle error responses
import { sendError, randomBytes } from '../utils/helpers.js';

// Create a new B2B account for a User
export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    linkTag,
    email,
    password,
    phone,
    street,
    city,
    state,
  } = req.body;

  try {
    const validateUser = await User.findOne({ email }).exec();
    if (validateUser) {
      res.status(409);
      throw new Error('There is an account associated with this email already');
    }

    // User Info Verification $ Validation
    if (password && password.length < 8) {
      res.status(400);
      throw new Error('Password should be at least 8 characters');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save New User Details
    const user = new User({
      name: `${firstName} ${lastName}`,
      firstName: firstName,
      lastName: lastName,
      email,
      linkTag,
      phoneNumber: phone,
      street,
      city,
      state,
      password: hashedPassword,
    });
    await user.save();
    // console.log(user);

    const userID = user._id;

    // Generate customer NGNC subAccount ID.
    const subAccountID = await createSubAccount({
      userID,
      firstName,
    });
    // console.log(subAccountID);

    if (subAccountID.status !== 'success') {
      return res.status(403).json({
        status: 'Failed',
        message: subAccountID.message,
      });
    }
    let subId = subAccountID.data.uid;

    const asset = await createSubAccountAddress({
      subId,
      firstName,
      item: 'NGNC_SOL',
    });
    // console.log(asset);

    const newUserWallet = new ngncWallet({
      user: userID,
      Business: subAccountID.data.name,
      subAccount_id: subAccountID.data.uid,
      external_id: subAccountID.data.externalId,
      account_id: subAccountID.data.accountId,
      organization_id: subAccountID.data.organizationId,
      network: subAccountID.data.network,
      addresses: [
        {
          asset_guid: asset.data.guid,
          asset_uid: asset.data.uid,
          asset_address: asset.data.address,
          address_ref: asset.data.addressRef,
          asset_id: asset.data.assetId,
          asset_type: 'NGNC_SOL',
          asset_chain: asset.data.chain,
        },
      ],
    });
    await newUserWallet.save();
    // console.log(newUserWallet);

    // Use subAccount ID to Generate NGNC token address
    const tokens = ['NGNC_XLM', 'NGNC_MATIC'];

    tokens.map(async (item, index) => {
      let checkUser = await ngncWallet.findOne({
        user: userID,
      });

      const asset = await createSubAccountAddress({ subId, firstName, item });

      if (checkUser) {
        // console.log('we reached here');
        checkUser.addresses.push({
          asset_guid: asset.data.guid,
          asset_uid: asset.data.uid,
          asset_address: asset.data.address,
          address_ref: asset.data.addressRef,
          asset_id: asset.data.assetId,
          asset_type: item,
          asset_chain: asset.data.chain,
        });
        await checkUser.save();
      }
    });

    // Generate customer bani ngn account ID.
    const customerID = await createCustomer({
      firstName,
      lastName,
      phone,
      email,
      street,
      state,
      city,
    });
    // console.log(customerID);

    if (customerID.status !== true) {
      return res.status(403).json({
        status: 'Failed',
        message: customerID.message,
      });
    }

    // Use customer ID to Generate NGN Virtual Account
    const custVirAcc = await createCustomerAccount(customerID.customer_ref);
    // console.log(custVirAcc);

    // Save New User NGN account Details
    const customerAccount = new ngnAccount({
      user: user._id,
      account_id: customerID.customer_ref,
      account_name: custVirAcc.account_name,
      account_number: custVirAcc.holder_account_number,
      account_type: custVirAcc.account_type,
      reference: custVirAcc.payment_reference,
      email,
      phoneNumber: phone,
      bank_name: custVirAcc.holder_bank_name,
    });
    await customerAccount.save();
    // console.log(customerAccount);

    res.status(200).json({
      status: 'success',
      message: '✅ New Business Account created',
      user,
    });
  } catch (error) {
    res.status(400).json({ status: 'Failed', message: error.message });
  }
};

// Business can Login to their  account
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email && !password)
      return res.status(400).send('❗ Please fill in your details');
    if (!email) return res.status(400).send('❗ Email address is required');
    if (!password) return res.status(400).send('❗ Password is required');

    // User Verification
    const existingUser = await User.findOne({ email });

    // json response message if no such user.email is found
    if (!existingUser)
      return res.status(400).send("❌ This user doesn't exist");

    // json response message That account has been locked
    if (existingUser.accessMode === false)
      return res
        .status(400)
        .send(
          'Account has been locked. contact support to migrate to the new dashboard'
        );

    // check if user.password is correct with the existing password
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    // json response message if password is incorrect
    if (!passwordMatch) return res.status(400).send('❌ Password is wrong');

    // Get jsonwebtoken and send t the frontend. Information to store in the token, + secret key string, + How long to stay logged in
    const accessToken = jwt.sign(
      {
        _id: existingUser._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    const { accountLock, accessMode, firstName, lastName, linkTag } =
      existingUser;

    res.status(201).json({
      accountLock,
      accessMode,
      accessToken,
      _id: existingUser._id,
      name: `${firstName} ${lastName}`,
      linkTag,
      email: existingUser.email,
      message: '✅ Successful Login',
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

// Admin Login to their  account
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email && !password)
      return res.status(400).send('❗ Please fill in your details');
    if (!email) return res.status(400).send('❗ Email address is required');
    if (!password) return res.status(400).send('❗ Password is required');

    // User Verification
    const existingUser = await User.findOne({ email });

    // json response message if no such user.email is found
    if (!existingUser)
      return res.status(400).send("❌ This user doesn't exist");

    if (existingUser.email !== 'marvel007@gmail.com')
      return res.status(400).send('❌ Unauthorised Login');
    else {
      // check if user.password is correct with the existing password
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      // json response message if password is incorrect
      if (!passwordMatch) return res.status(400).send('❌ Password is wrong');

      // Get jsonwebtoken and send t the frontend. Information to store in the token, + secret key string, + How long to stay logged in
      const accessToken = jwt.sign(
        {
          _id: existingUser._id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '30min' }
      );

      const { accountLock, accessMode, firstName, lastName, linkTag } =
        existingUser;

      res.status(201).json({
        accountLock,
        accessMode,
        accessToken,
        _id: existingUser._id,
        name: `${firstName} ${lastName}`,
        linkTag,
        email: existingUser.email,
        message: '✅ Successful Login',
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
      // data: error,
    });
  }
};

// Get data of Virtual account Created
export const getB2bUsers = async (req, res) => {
  try {
    const accounts = await User.find();
    res.status(200).json({ status: 'success', accounts });
  } catch (error) {
    res.status(404).json({ status: 'failed', message: error.message });
  }
};

// New User Provides basic KYB Info
export const kyb = async (req, res) => {
  const { businessName, contactMail } = req.body;

  try {
    if (!businessName) return res.status(400).send('Business Name is required');
    if (!contactMail) return res.status(400).send('Email is required');

    const newBusiness = await UserKyb.findOne({ businessName }).exec();

    if (newBusiness)
      return res
        .status(409)
        .send('An account with the Business name already exist for Kyb');

    // Save Business KYB
    const business = await UserKyb.create({
      businessName,
      contactMail,
    });

    // console.log("Account KYB successful");

    // Send Email of Business kyb to support
    businessKyb(business);

    res.status(201).json({
      message: '✅ Business Kyb request created successfully',
      business,
    });
  } catch (error) {
    res.status(400).json({
      message: '❌ Failed to create new user',
    });
  }
};

// update password of registered user
export const updatePassword = async (req, res) => {
  const { id: _id } = req.params;
  const { newPassword: password } = req.body;
  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).send('User not found');
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    const changePassword = await User.findByIdAndUpdate(_id, {
      password: newPassword,
      accountLock: false,
    });

    res.status(200).json({
      accountLock: changePassword.accountLock,
      message: '✅ Password Changed',
    });
  } catch (error) {
    res.status(400).send("❌ Couldn't update password");
  }
};

// forgot password of registered user
export const forgotPassword = async (req, res) => {
  try {
    const { email, linkTag } = req.body;

    if (!linkTag) return sendError(res, 'please provide a valid linkTag!');

    const user = await User.findOne({ linkTag });
    if (!user) return sendError(res, 'User not found, invalid request');

    const token = await ResetToken.findOne({ owner: user._id });
    if (token)
      return sendError(
        res,
        'New request token can only be generated after 30 minutes'
      );

    const newToken = await randomBytes();
    const resetToken = new ResetToken({ owner: user._id, token: newToken });
    let uniqueLink = `${
      process.env.NODE_ENV === 'production'
        ? 'https://ngnc.online'
        : 'http://localhost:3000'
    }/user/reset-password?q=${newToken}&e=${user.email}&d=${user._id}`;
    const resetEmail = userResetPassword(uniqueLink, user.email);
    await resetToken.save();

    res.status(201).json({
      success: true,
      message: 'Password Reset link is sent to your email',
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: 'failed', message: 'Failed to reset password' });
  }
};

// reset password of registered user
export const resetPassword = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    const isSamePassword = await user.comparePassword(password);
    if (isSamePassword)
      return res
        .status(400)
        .json({ message: 'New password cannot be old password' });

    if (password.trim().length < 8 || password.trim().length > 20)
      return res
        .status(400)
        .json({ message: 'Password must be 8-20 characters long' });
    user.password = await bcrypt.hash(password.trim(), salt);
    await user.save();

    await ResetToken.findOneAndDelete({ owner: user._id });

    let host = `${
      process.env.NODE_ENV === 'production'
        ? 'https://ngnc.online/auth/login'
        : 'http://localhost:3000/auth/login'
    }`;
    const resetEmail = userResetPasswordSuccessful(host, email);

    res.status(200).json({
      success: true,
      message: 'Password Reset successful',
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: 'failed', message: 'Failed to reset password' });
  }
};

export const validateKYC = async (req, res) => {
  const { address } = req.query;

  try {
    const validWallet = await StellarKyc.findOne({ wallet_address: address });
    // console.log(validWallet);

    const ref = Math.random().toString(36).slice(2, 20);
    const HexValue = Buffer.from(ref, 'utf8').toString('base64');

    return res.status(200).json({
      message: 'Wallet address present',
      validWallet,
      HexValue,
    });
  } catch (error) {
    res.status(404).json({ status: 'failed', message: error.message });
  }
};
