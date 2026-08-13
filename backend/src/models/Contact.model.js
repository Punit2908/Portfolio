import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    subject: {
     type: String,
     maxlength: [100, "Subject cannot exceed 100 characters"],
     trim: true,
    },
    
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: [2000, "Message cannot exceed 2000 characters"],
      trim: true,
    },

    status: {
      type: String,
      enum: {
        values: ["new", "read", "replied", "archived"],
        message: "Invalid contact status",
      },
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model(
  "Contact",
  contactSchema
);

export default Contact;