/* =========================================================
   PRICING: plans aur unke daam
   ========================================================= */

/* ✏️ EDIT HERE: section title + intro */
const TITLE = "Simple pricing";
const INTRO = "Fixed prices for fixed scope. Bigger or unusual work gets a custom quote.";

/* ✏️ EDIT HERE: plans.
   - price: jo likhoge wahi dikhega (e.g. "₹2,999", "Let's talk")
   - note: price ke neeche chhota text (e.g. "per project")
   - featured: true = yeh plan highlighted dikhega (sirf ek plan par true rakho)
   - features: list of bullet points
   - cta: button ka text */
const PLANS = [
  {
  name: "Starter",
  price: "₹399",
  note: "per video · delivered in 2 days",
  description: "A clean, simple edit for a reel or short video.",
  features: [
    "Delivery in 2 days",
    "Reel or Short up to 30 seconds",
    "Cuts, trimming and background music",
    "Captions",
   
  ],
  cta: "Choose Starter",
  featured: false,
},
{
  name: "Standard",
  price: "₹699",
  note: "per video · delivered in 3 days",
  description: "A fully edited reel or YouTube shorts, from raw footage to final cut.",
  features: [
    "Delivery in 4 days",
    "Everything in Starter",
    "Color grading and sound design, captions",
    "Motion graphics and smooth transitions",
    
  ],
  cta: "Choose Standard",
  featured: true,
},
{
  name: "Custom",
  price: "Let's talk",
  note: "per videos · delivered in 1 week",
  description: "Bulk videos, ongoing content work or a full brand video package.",
  features: [
    "Delivery of the full batch in 1 week",
    "Monthly reel and video packages",
    "Scope built around your goal",
    "Priority replies",
  ],
  cta: "Ask for a quote",
  featured: false,
},
];

export default function Pricing() {
  return (
    <section id="pricing" className="sec">
      <div className="wrap">
        <div className="sec-head">
          <h2>{TITLE}</h2>
          <p className="lead">{INTRO}</p>
        </div>

        <div className="plans">
          {PLANS.map((p) => (
            <article key={p.name} className={`plan ${p.featured ? "is-featured" : ""}`}>
              {p.featured && <p className="badge">Most chosen</p>}
              <h3>{p.name}</h3>
              <p className="price">{p.price}</p>
              <p className="price-note">{p.note}</p>
              <p className="plan-desc">{p.description}</p>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a className={`btn ${p.featured ? "" : "btn-ghost"}`} href="#contact">
                {p.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
