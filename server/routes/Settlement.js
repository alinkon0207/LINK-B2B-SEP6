import express from 'express';
import auth from '../middleware/auth.js';

import { usdcNgnc, ngncUsdc } from '../controllers/Settlement.js';

const router = express.Router();

router.post('/usdc-ngnc', auth, usdcNgnc);

router.post('/ngnc-usdc', auth, ngncUsdc);

export default router;
