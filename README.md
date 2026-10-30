# Nitin Portfolio (React + Vite)

## Run karne ka tarika

```bash
npm install
npm run dev        # http://localhost:5173 par khulega
npm run build      # production build -> dist/ folder
```

Node.js 18+ chahiye.

## Kahan kya edit karna hai

Har file ke upar `✏️ EDIT HERE` comments hain. Wahi text/data badlo, baaki code ko haath mat lagao.

| File | Kya likhna hai |
|---|---|
| `index.html` | Browser tab title, Google description |
| `src/components/Navbar.jsx` | Naam/logo, menu labels, "Hire me" button text |
| `src/components/Hero.jsx` | Headline, subtext, 2 buttons, 3 facts (numbers) |
| `src/components/Portfolio.jsx` | Section title, projects list (title, category, description, tools, image, link) |
| `src/components/Services.jsx` | Services list (name, description, "You get") |
| `src/components/Pricing.jsx` | Plans, prices, features, kaun sa plan highlighted ho |
| `src/components/About.jsx` | Photo, story paragraphs, skills, quick facts |
| `src/components/Contact.jsx` | Email, social links, dropdown options |
| `src/App.jsx` | Footer text |
| `src/index.css` | Colors aur fonts (sirf top ke `:root` me) |
| `public/images/` | Photos aur project screenshots (naam README.txt me likhe hain) |

## Naya project / service / plan kaise add karein

Related file me `PROJECTS`, `SERVICES` ya `PLANS` list me ek block copy-paste karo aur text badlo.

## Deploy (free)

`npm run build` ke baad `dist/` folder ko Netlify ya Vercel par drag-drop kar do.
