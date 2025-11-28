import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Environment variables (set these in Render's dashboard)
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID;

app.post("/send-email", async (req, res) => {
  const { token, formData } = req.body;

  if (!token) {
    return res.status(400).json({ message: "No reCAPTCHA token provided." });
  }

  // Verify reCAPTCHA with Google
  try {
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${token}`;
    const verificationResponse = await fetch(verificationUrl, { method: "POST" });
    const verificationData = await verificationResponse.json();

    if (!verificationData.success || verificationData.score < 0.5) {
      return res.status(400).json({ message: "reCAPTCHA verification failed." });
    }
  } catch (err) {
    console.error("reCAPTCHA verification error:", err);
    return res.status(500).json({ message: "Error verifying reCAPTCHA." });
  }

  // Send email via EmailJS REST API
  try {
    const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_USER_ID,
        template_params: formData
      })
    });

    if (!emailResponse.ok) {
      throw new Error("EmailJS API request failed.");
    }

    res.json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("EmailJS error:", err);
    res.status(500).json({ message: "Error sending email." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
