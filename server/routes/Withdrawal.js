import express from 'express';
import crypto from 'crypto';

import auth from '../middleware/auth.js';
import {
  withdraw,
  transfer,
  multiChainWithdraw,
  getTransactions,
  validateKYC,
} from '../controllers/Withdrawal.js';

const router = express.Router();

router.post('/withdraw/bank', auth, withdraw);

router.post('/transfer/bank', auth, transfer);

router.get('/withdrawals', auth, getTransactions);

router.post('/withdraw/multichain', auth, multiChainWithdraw);

router.get('/customer-kyc', validateKYC);

export default router;
