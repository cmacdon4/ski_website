// api/sendEmail.js
import { Resend } from "resend";

// IMPORTANT: Your API key must NOT be hardcoded.
// Add it in Vercel → Project Settings → Environment Variables
// Key: RESEND_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // Send the email
    await resend.emails.send({
      from: "ND Ski Website <onboarding@resend.dev>", 
      // You can use "onboarding@resend.dev" in sandbox mode
      to: "cmacdon4@nd.edu",  
      subject: `New Contact Form Submission: ${subject || "General"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Resend email error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
