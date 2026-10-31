import { useState } from "react";

/* =========================================================
   CONTACT: client tumse kaise baat karega
   ========================================================= */

/* ✏️ EDIT HERE: section title + intro */
const TITLE = "Tell me what you need";
const INTRO = "Share a few lines about your project. I reply within 24 hours.";

/* ✏️ EDIT HERE: your real contact details */
const EMAIL = "nestai2025@gmail.com";

const WHATSAPP_NUMBER = "919918413659"; // country code 91 + 10 digit number, bina + ya space ke
const WHATSAPP_MESSAGE = "Hi Nitin, I want to get a video edited.";

const SOCIALS = [
  { label: "Instagram (Main)", href: "https://www.instagram.com/_nitin_07m" },
  { label: "Instagram (Create4U)", href: "https://www.instagram.com/create4u_20" },
  { label: "YouTube", href: "https://youtube.com/@storynv40" },
  {
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  },
];

/* ✏️ EDIT HERE: options in the "Service" dropdown */
const SERVICE_OPTIONS = [
  "Reels and Shorts editing",
  "YouTube video editing",
  "Brand and business promo videos",
  "Something else",
];

/* Backend ka address. Local me server 5000 port par chalta hai.
   Deploy ke baad .env me VITE_API_URL=https://tumhara-backend-url daalna. */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const EMPTY_FORM = {
  name: "",
  email: "",
  service: SERVICE_OPTIONS[0],
  message: "",
  website: "", // honeypot: asli user ko dikhta nahi, bots bhar dete hain
};

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const update = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status !== "idle" && status !== "sending") setStatus("idle");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const payload = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };
    if (!payload.name || !payload.email || !payload.message) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("sent");
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof TypeError
          ? `Could not reach the server. You can also write to ${EMAIL}.`
          : err.message
      );
    }
  };

  return (
    <section id="contact" className="sec">
      <div className="wrap contact-grid">
        <div>
          <h2>{TITLE}</h2>
          <p className="lead">{INTRO}</p>

          <p className="contact-mail">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <ul className="socials">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <label>
            Your name
            <input
              name="name"
              value={form.name}
              onChange={update}
              required
              maxLength={100}
              autoComplete="name"
            />
          </label>
          <label>
            Your email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={update}
              required
              autoComplete="email"
            />
          </label>
          <label>
            Service
            <select name="service" value={form.service} onChange={update}>
              {SERVICE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
          <label>
            Project details
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={update}
              required
              maxLength={3000}
            />
          </label>

          {/* honeypot field: screen par nahi dikhta */}
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={update}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
          />

          <button className="btn" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send message"}
          </button>

          {status === "sent" && (
            <p className="form-note" role="status">
              Message sent. I will reply within 24 hours.
            </p>
          )}
          {status === "error" && (
            <p className="form-note" role="alert">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
