import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID;
if (!RECAPTCHA_SECRET || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_USER_ID) {
  console.warn("Missing one or more required environment variables for email sending.");
}

app.post("/send-email", async (req, res) => {
  const { token, formData } = req.body;

  if (!token) {
    return res.status(400).json({ message: "No reCAPTCHA token provided." });
  }

  if (!RECAPTCHA_SECRET || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_USER_ID) {
    return res.status(500).json({ message: "Server email configuration is incomplete." });
  }

  try {
    const verificationResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET,
        response: token,
      }),
    });

    const verificationData = await verificationResponse.json();

    if (!verificationData.success || (typeof verificationData.score === "number" && verificationData.score < 0.5)) {
      return res.status(400).json({ message: "reCAPTCHA verification failed." });
    }
  } catch (err) {
    console.error("reCAPTCHA verification error:", err);
    return res.status(500).json({ message: "Error verifying reCAPTCHA." });
  }

  try {
    const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_USER_ID,
        template_params: formData,
      }),
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
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
