import express from 'express';

import {
  register,
  login,
  loginAdmin,
  kyb,
  forgotPassword,
  resetPassword,
  updatePassword,
  getB2bUsers,
  validateKYC,
} from '../controllers/Users.js';

import auth from '../middleware/auth.js';
import isResetTokenValid from '../middleware/userToken.js';

const router = express.Router();

router.post('/login', login);

router.post('/login-admin', loginAdmin);

router.get('/all-users', getB2bUsers);

router.post('/register', register);

router.post('/requestKYB', kyb);

router.patch('/change-password/:id', auth, updatePassword);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', isResetTokenValid, resetPassword);

router.get('/wallet-validate', validateKYC);

export default router;
