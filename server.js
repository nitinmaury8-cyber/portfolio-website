import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

const {
  PORT = 5000,
  CLIENT_ORIGIN = "http://localhost:5173",
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_TO,
} = process.env;

if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
  console.error("❌ .env me EMAIL_USER, EMAIL_PASS aur EMAIL_TO daalna zaroori hai.");
  process.exit(1);
}

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(cors({ origin: CLIENT_ORIGIN }));

// spam rokne ke liye: ek IP se 15 minute me max 5 messages
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many messages. Please try again in a few minutes." },
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", contactLimiter, async (req, res) => {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim();
  const service = String(req.body?.service || "").trim();
  const message = String(req.body?.message || "").trim();
  const website = String(req.body?.website || ""); // honeypot: bots isse bhar dete hain

  // bot pakda gaya: chupchap success dikha do, mail mat bhejo
  if (website) return res.json({ ok: true });

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Name, email and message are required." });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email." });
  }
  if (name.length > 100 || service.length > 100 || message.length > 3000) {
    return res.status(400).json({ ok: false, error: "Message is too long." });
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Website" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`, // reply dabate hi client ko jayega
      subject: `${service || "New"} enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`,
      html: `
        <h2>New enquiry</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Service:</b> ${escapeHtml(service)}</p>
        <p><b>Message:</b><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error("Mail error:", err.message);
    res.status(500).json({ ok: false, error: "Could not send message. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
