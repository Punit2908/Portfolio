import express from "express";

import {
  adminLogin,
  getContacts,
  deleteContact,
  updateContactStatus,
} from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  adminLoginLimiter,
} from "../middleware/rateLimit.middleware.js";

const router = express.Router();

router.post(
  "/login",
  adminLoginLimiter,
  adminLogin
);

router.get(
  "/contacts",
  authMiddleware,
  getContacts
);

router.delete(
  "/contacts/:id",
  authMiddleware,
  deleteContact
);

router.patch(
  "/contacts/:id/status",
  authMiddleware,
  updateContactStatus
);

export default router;