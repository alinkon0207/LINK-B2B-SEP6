import { Router } from 'express';
import auth from '../middleware/auth.js';

import {
  getUserAccountData,
  getAllAccountsData,
  checkAccountNumber,
  baniWebhook,
} from '../controllers/NgnAccount.js';

const router = Router();

router.get('/virtual-account', auth, getUserAccountData);

router.get('/virtual-accounts', auth, getAllAccountsData);

router.get('/verify-account-number', checkAccountNumber);

router.post('/bani/webhook', baniWebhook);

export default router;
