import express from "express";

import { verifyLinkTag } from "../controllers/ngncWidget.js";

const router = express.Router();

router.get("/validate-link-tag", verifyLinkTag);

export default router;
