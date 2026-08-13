import rateLimit from "express-rate-limit";

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,

  message: {
    success: false,
    message:
      "Too many contact requests. Please try again later.",
  },

  standardHeaders: true,
  legacyHeaders: false,
});

export const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,

  message: {
    success: false,
    message:
      "Too many login attempts. Please try again later.",
  },

  standardHeaders: true,
  legacyHeaders: false,
});