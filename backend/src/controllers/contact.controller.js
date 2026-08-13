import Contact from "../models/Contact.model.js";
import {
  sendContactNotification,
} from "../services/email.service.js";

export const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create({
      name,
     email,
     subject,
     message,
    });

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
        subject,
        message,
      });
    } catch (emailError) {
      console.error(
        "⚠️ Contact email failed:",
        emailError.message
      );
    }

    res.status(201).json({
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