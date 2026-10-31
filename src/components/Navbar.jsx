import { useState } from "react";

/* ✏️ EDIT HERE: your name / logo text */
const BRAND = "Nitin";

/* ✏️ EDIT HERE: menu labels (the "href" must match a section id, don't change it) */
const LINKS = [
  { label: "Work", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="wrap nav-row">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          {BRAND}
        </a>

        <nav
          id="nav-links"
          className={`nav-links ${open ? "is-open" : ""}`}
          aria-label="Main"
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          {/* ✏️ EDIT HERE: button text in the menu */}
          <a href="#contact" className="btn btn-small" onClick={() => setOpen(false)}>
            Hire me
          </a>
        </nav>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
