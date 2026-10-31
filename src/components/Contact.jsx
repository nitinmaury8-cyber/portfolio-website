import { useState } from "react";

/* =========================================================
   CONTACT: client tumse kaise baat karega
   ========================================================= */

/* ✏️ EDIT HERE: section title + intro */
const TITLE = "Tell me what you need";
const INTRO = "Share a few lines about your project. I reply within 24 hours.";

/* ✏️ EDIT HERE: your real contact details (placeholders replace karna mat bhoolna) */
const EMAIL = "nitinmaury8@gmail.com";
const SOCIALS = [
  { label: "Instagram (Main)", href: "https://www.instagram.com/_nitin_07m" },
  { label: "Instagram (Create4U)", href: "https://www.instagram.com/create4u_20" },
  { label: "YouTube", href: "https://youtube.com/@storynv40" },
];

/* ✏️ EDIT HERE: options in the "Service" dropdown */
const SERVICE_OPTIONS = [
  "Content creation",
  "Video editing",
  "Business growth through videos & posts",
  "Something else",
];

const EMPTY_FORM = { name: "", email: "", service: SERVICE_OPTIONS[0], message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [sent, setSent] = useState(false);

  // functional update: purane state par depend nahi karta, isliye stale value ka bug nahi aata
  const update = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (sent) setSent(false);
  };

  /* Abhi form tumhara email app (mail client) kholta hai, taaki setup ke bina kaam kare.
     Agar chahte ho ki message seedha inbox me aaye (bina email app khole):
     1) formspree.io par free account banao, form banao
     2) mailto ki jagah fetch("https://formspree.io/f/YOUR_ID", { method: "POST", ... }) use karo */
  const onSubmit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || !email || !message) return; // sirf spaces wale input block

    const subject = encodeURIComponent(`${form.service} enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nName: ${name}\nEmail: ${email}`);

    setSent(true);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setForm(EMPTY_FORM); // form reset after submit
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
            />
          </label>
          <button className="btn" type="submit">
            Send message
          </button>
          {sent && (
            <p className="form-note" role="status">
              Your email app should open with the message ready. If it didn't, write to {EMAIL}.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
