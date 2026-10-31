import { useState } from "react";
import "./Hero.css";

/* =========================================================
   HERO: dark gradient, bold heading, floating badges,
   neeche 3 vertical reels
   ========================================================= */

/* ✏️ EDIT HERE: headline. <em> wala shabd gradient me chamkega */
const HEADLINE_LINES = [
  "Video editing",
  "that keeps people",
  "watching",
];
const HIGHLIGHT_LINE = 2; // kaunsi line gradient me chahiye (0 se shuru)

/* ✏️ EDIT HERE: 1-2 line description */
const SUBTEXT =
  "From reels to brand promos, I turn raw clips into polished videos with clean grading, motion graphics and smooth transitions.";

/* ✏️ EDIT HERE: the two buttons */
const PRIMARY_CTA = { label: "Start a project", href: "#contact" };
const SECONDARY_CTA = { label: "View pricing", href: "#pricing" };

/* ✏️ EDIT HERE: chhoti facts. Real numbers hi daalna (videos edited, views, etc.) */
const FACTS = [
  { value: "50+", label: "Videos edited" },
  { value: "10K+", label: "Views on my content" },
  { value: "3 days", label: "Typical first cut" },
];

/* ✏️ EDIT HERE: neeche wali 3 reels (public/videos/ me rakho) */
const REELS = ["/videos/reel-1.mp4", "/videos/reel-main.mp4.mp4", "/videos/reel-2.mp4.mp4"];

/* ✏️ EDIT HERE: apne logo ki images (public/images/ me rakho).
   Nahi milengi toh simple icon dikhega. */
const CAPCUT_LOGO = "/images/capcut.png";
const YOUTUBE_LOGO = "/images/youtube.png";

/* ---------- chhote icons ---------- */
const IconSparkle = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.2 6.3L20 10l-5.8 1.7L12 18l-2.2-6.3L4 10l5.8-1.7z" />
  </svg>
);
const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const IconCut = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12" />
  </svg>
);
const IconArrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 6l6 6-6 6M13 6l6 6-6 6" />
  </svg>
);

/* tumhari image mile toh wahi, warna fallback icon */
function Badge({ src, alt, className, children }) {
  const [failed, setFailed] = useState(false);
  const showImg = src && !failed;

  return (
    <span className={`hx-badge ${className}`}>
      {showImg ? <img src={src} alt={alt} onError={() => setFailed(true)} /> : children}
    </span>
  );
}

function ReelTile({ src, className }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`hx-tile ${className}`}>
      {failed ? (
        <div className="hx-tile-empty">
          <span>Add your reel at</span>
          <code>public{src}</code>
        </div>
      ) : (
        <video
          src={`${src}#t=0.1`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hx">
      <div className="hx-inner">
        <div className="hx-top">
          <div className="hx-copy">
            <h1 className="hx-title">
              {HEADLINE_LINES.map((line, i) => (
                <span key={line} className={i === HIGHLIGHT_LINE ? "hx-grad" : undefined}>
                  {line}
                </span>
              ))}
            </h1>

            <div className="hx-actions">
              <a className="hx-cta" href={PRIMARY_CTA.href}>
                <span>{PRIMARY_CTA.label}</span>
                <i>
                  <IconArrow />
                </i>
              </a>
              <a className="hx-link" href={SECONDARY_CTA.href}>
                {SECONDARY_CTA.label}
              </a>
            </div>
          </div>

          <div className="hx-side">
            <p className="hx-sub">{SUBTEXT}</p>
            <dl className="hx-facts">
              {FACTS.map((f) => (
                <div key={f.label}>
                  <dt>{f.value}</dt>
                  <dd>{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* floating badges (heading ke aas-paas) */}
          <Badge className="hx-b-spark" alt="">
            <IconSparkle />
          </Badge>
          <Badge className="hx-b-yt" src={YOUTUBE_LOGO} alt="YouTube">
            <IconPlay />
          </Badge>
        </div>

        <div className="hx-reels">
          <Badge className="hx-b-cap" src={CAPCUT_LOGO} alt="CapCut">
            <IconCut />
          </Badge>
          <ReelTile src={REELS[0]} className="hx-tile-side" />
          <ReelTile src={REELS[1]} className="hx-tile-mid" />
          <ReelTile src={REELS[2]} className="hx-tile-side" />
        </div>
      </div>
    </section>
  );
}
