import Contact from "../models/Contact.model.js";
import {
  sendContactNotification,
} from "../services/email.service.js";
import { escapeHtml } from "../utils/escapeHtml.js";

export const createContact = async (req, res, next) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    const safeSubject = escapeHtml(
      subject || "New Portfolio Contact"
    );

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send notification email
    try {
      await sendContactNotification({
        name,
        email,
        subject: safeSubject,
        message,
      });
    } catch (emailError) {
      console.error(
        "⚠️ Contact email failed:",
        emailError.message
      );

      return next(emailError);
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        message: contact.message,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};