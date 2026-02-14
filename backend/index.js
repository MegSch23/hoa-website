import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID;
const RECAPTCHA_EXPECTED_ACTION = process.env.RECAPTCHA_EXPECTED_ACTION || "contact_us";

if (!RECAPTCHA_SECRET || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_USER_ID) {
  console.warn("Missing one or more required environment variables for email sending.");
}

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

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
    const recaptchaErrors = Array.isArray(verificationData["error-codes"])
      ? verificationData["error-codes"]
      : [];
    const score = typeof verificationData.score === "number" ? verificationData.score : null;
    const action = typeof verificationData.action === "string" ? verificationData.action : null;

    if (!verificationData.success) {
      console.error("reCAPTCHA failed:", { recaptchaErrors, action, score, hostname: verificationData.hostname });
      return res.status(400).json({
        message: "reCAPTCHA verification failed.",
        reason: "verification_unsuccessful",
        recaptchaErrors,
      });
    }

    if (action && action !== RECAPTCHA_EXPECTED_ACTION) {
      console.error("reCAPTCHA action mismatch:", {
        expected: RECAPTCHA_EXPECTED_ACTION,
        received: action,
        hostname: verificationData.hostname,
      });
      return res.status(400).json({
        message: "reCAPTCHA action mismatch.",
        reason: "action_mismatch",
        expectedAction: RECAPTCHA_EXPECTED_ACTION,
        receivedAction: action,
      });
    }

    if (score !== null && score < 0.5) {
      console.error("reCAPTCHA score too low:", { score, action, hostname: verificationData.hostname });
      return res.status(400).json({
        message: "reCAPTCHA score too low.",
        reason: "low_score",
        score,
      });
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
      const body = await emailResponse.text();
      console.error("EmailJS API failure:", emailResponse.status, body);
      throw new Error("EmailJS API request failed.");
    }

    return res.json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("EmailJS error:", err);
    return res.status(500).json({ message: "Error sending email." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
