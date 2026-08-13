import { Resend } from "resend";
import { escapeHtml } from "../utils/escapeHtml.js";

export const sendContactNotification = async ({
  name,
  email,
  subject,
  message,
}) => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is missing from environment variables"
    );
  }

  const resend = new Resend(apiKey);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);

  const { data, error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: [process.env.CONTACT_EMAIL],
    subject: `New portfolio message from ${safeName}`,
    replyTo: email,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Portfolio Contact</h2>

        <p>
          <strong>Name:</strong> ${safeName}
        </p>

        <p>
          <strong>Email:</strong> ${safeEmail}
        </p>
        
        <p>
          <strong>Subject:</strong> ${safesubject}
        </p>

        <p>
          <strong>Message:</strong>
        </p>

        <p>
          ${safeMessage}
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};