/* Scroll karne par sections dheere se upar aate hain (fade + slide).
   Kisi component me kuch badalne ki zarurat nahi, bas main.jsx me import karo. */

const SELECTOR = [
  ".sec h2",
  ".sec .lead",
  ".sec-head",
  ".work",
  ".about-grid > *",
  ".contact-grid > *",
  ".mini-title",
  ".skills li",
  ".quick > *",
  "[class*='plan']",
  "[class*='service']",
  "[class*='card']",
].join(",");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

function scan() {
  document.querySelectorAll(SELECTOR).forEach((el) => {
    if (el.dataset.rv) return;
    el.dataset.rv = "1";
    el.classList.add("reveal");

    // ek row ke items thoda-thoda ruk ke aayen (stagger)
    const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
    const index = Math.max(siblings.indexOf(el), 0);
    el.style.setProperty("--d", `${Math.min(index, 6) * 90}ms`);

    observer.observe(el);
  });
}

// React elements baad me render hote hain, isliye DOM badalne par dobara scan
new MutationObserver(scan).observe(document.documentElement, {
  childList: true,
  subtree: true,
});

scan();
