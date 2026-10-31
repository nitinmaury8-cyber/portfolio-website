import { useState } from "react";

/* =========================================================
   ABOUT: About Nitin - Video Editor
   ========================================================= */

const TITLE = "About me";

/* Save your photo at public/images/profile.jpg */
const PHOTO = "/images/profile.PNG";
const NAME_INITIAL = "N";


/* Your story */
const PARAGRAPHS = [
  "I'm Nitin, a creative video editor passionate about transforming raw footage into engaging visual stories. I specialize in short-form content for Instagram Reels and YouTube Shorts, combining clean cuts, cinematic visuals, smooth transitions, sound design, and storytelling to capture attention.",

  "Alongside editing, I explore creative concepts, write and enhance video scripts, and create promotional content for brands and businesses.",

  "Whether you need engaging social media videos, premium brand promotions, or cinematic edits that bring your ideas to life, I'm here to turn your vision into compelling content."
];
/* Quick facts */
const QUICK_FACTS = [
  { label: "Studying", value: "B.Tech, Data Science" },
  { label: "Based in", value: "India" },
  { label: "Replies within", value: "24 hours" }
];
/* Editing skills */
const SKILLS = [
  { name: "Video Editing" },
  { name: "Color Grading" },
  { name: "Motion Graphics" },
  { name: "Sound Design" },
  { name: "Visual Storytelling" }
];
export default function About() {
  const [failed, setFailed] = useState(false);

  return (
    <section id="about" className="sec sec-tint">
      <div className="wrap about-grid">

        {/* Profile photo */}
        <div className="about-photo">
          {failed ? (
            <div
              className="photo photo-fallback"
              aria-hidden="true"
            >
              {NAME_INITIAL}
            </div>
          ) : (
            <img
              className="photo"
              src={PHOTO}
              alt="Portrait of Nitin"
              onError={() => setFailed(true)}
            />
          )}
        </div>

        {/* About content */}
        <div className="about-copy">
          <h2>{TITLE}</h2>

          {PARAGRAPHS.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {/* Skills */}
          <h3 className="mini-title">Tools I use</h3>

          <ul className="skills">
            {SKILLS.map((skill) => (
              <li key={skill.name}>{skill.name}</li>
            ))}
          </ul>

          {/* Quick facts */}
          <dl className="quick">
            {QUICK_FACTS.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

      </div>
    </section>
  );
}
