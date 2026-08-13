import express from "express";

import { createContact } from "../controllers/contact.controller.js";
import contactValidation from "../middleware/contact.validation.js";

const router = express.Router();

router.post(
  "/",
  contactValidation,
  createContact
);

export default router;