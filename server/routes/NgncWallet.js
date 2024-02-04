import { Router } from 'express';
import auth from '../middleware/auth.js';

import {
  createWallet,
  fetchWallet,
  withdraw,
  transfer,
  getTransactions,
  bitpowrWebhook,
} from '../controllers/NgncWallet.js';

const router = Router();

router.post('/create', createWallet);

router.get('/fetch', auth, fetchWallet);

router.post('/transfer', transfer);

router.post('/withdraw', withdraw);

router.get('/transactions', getTransactions);

router.post('/bitpowr/webhook', bitpowrWebhook);

export default router;
