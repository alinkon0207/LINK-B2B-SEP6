import express from 'express';
import auth from '../middleware/auth.js';

import { withdrawNgnc, depositNgnc } from '../controllers/Stellar.js';

const router = express.Router();

// User routes for Registration (handled by Admin) and Login (handled by Users)
router.post('/deposit/', depositNgnc);

router.post('/withdraw/', withdrawNgnc);

export default router;
