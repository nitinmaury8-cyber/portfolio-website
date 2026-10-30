/* =========================================================
   SERVICES: tum kya kya kaam karte ho
   ========================================================= */

/* ✏️ EDIT HERE: section title + intro */
const TITLE = "What I can do for you";
const INTRO = "Pick one, or combine them. Every project starts with a short call to agree on scope.";

/* ✏️ EDIT HERE: your services. Naam simple rakho, jo client samajh sake.
   Naya service add karne ke liye ek block copy-paste karo. */
const SERVICES = [
 {
  name: "Reels and Shorts editing",
  text: "I turn your raw clips into fast, clean reels and Shorts with sharp cuts, captions and sound that keep people watching.",
  deliver: "Final edited reel, captions, export for Instagram and YouTube",
},
{
  name: "YouTube video editing",
  text: "I edit long-form videos with a strong hook, smooth pacing, color grading and sound design so viewers stay till the end.",
  deliver: "Final video, thumbnail suggestions, 2 rounds of changes",
},
{
  name: "Brand and business promo videos",
  text: "Ads, product videos and promos that show what your business does and push people to take action.",
  deliver: "Promo video, multiple formats, short brief on the edit",
},
{
  name: "Scripts, hooks and content planning",
  text: "Video scripts, opening hooks and a posting plan, so your content has a clear idea before the editing even starts.",
  deliver: "Scripts, captions, posting plan",
},
];

export default function Services() {
  return (
    <section id="services" className="sec sec-tint">
      <div className="wrap">
        <div className="sec-head">
          <h2>{TITLE}</h2>
          <p className="lead">{INTRO}</p>
        </div>

        <ul className="service-list">
          {SERVICES.map((s) => (
            <li key={s.name} className="service">
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <p className="deliver">
                <strong>You get:</strong> {s.deliver}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
