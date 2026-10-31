import { useEffect, useRef } from "react";

/* =========================================================
   PORTFOLIO: sirf videos, jo apne aap chalte rehte hain
   ========================================================= */

/* ✏️ EDIT HERE: section title + short intro */
const TITLE = "Selected work";
const INTRO = "Reels and promo videos I edited, with clean grading, motion graphics and smooth transitions.";

/* ✏️ EDIT HERE: videos ki list.
   File ko public/videos/ me daalo, phir yahan "/videos/naam.mp4" likho.
   Naya video add karne ke liye ek line add karo. */
const VIDEOS = [
  "/videos/reel-main.mp4",
  "/videos/brand-promo.mp4",
  "/videos/reel-main.mp4.mp4",
  "/videos/reel-2.mp4.mp4",
  "/videos/reel-3.mp4",
  "/videos/reel-4.mp4",
  "/videos/reel-5.mp4",
];

function AutoVideo({ src }) {
  const ref = useRef(null);

  // video tabhi chale jab screen par dikh raha ho, taaki page bhaari na ho
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="thumb"
      src={`${src}#t=0.1`}
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="sec">
      <div className="wrap">
        <div className="sec-head">
          <h2>{TITLE}</h2>
          <p className="lead">{INTRO}</p>
        </div>

        <div className="work-grid">
          {VIDEOS.map((src) => (
            <article key={src} className="work">
              <AutoVideo src={src} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
