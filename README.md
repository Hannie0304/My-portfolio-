# Hannah Akoore — Portfolio Website

A premium, responsive portfolio site for Hannah Akoore, General Virtual Assistant.
Built with plain HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step.
Just open `index.html`, or upload the folder to any static host.

## File structure

```
hannah-portfolio/
├── index.html                 # All page content & structure
├── style.css                  # All styling, design tokens, responsive rules, dark mode
├── script.js                  # All interactivity (no dependencies)
├── README.md                  # This file
├── images/                    # Photos, illustrations, favicons, OG image
│   ├── favicon-32.png / favicon-192.png / apple-touch-icon.png
│   ├── og-image.png           # Social share preview image
│   ├── about-placeholder.png  # About-section visual (placeholder — swap for a real photo)
│   ├── hero-fallback.png      # Static fallback for the hero's animated card visual
│   ├── project-*.png          # 4 portfolio project thumbnails (custom illustrations)
│   └── avatar-*.png           # Testimonial avatar placeholders
├── icons/
│   └── sprite.svg             # One SVG file holding every icon used on the site (<use> references)
└── assets/
    └── Hannah-Akoore-Portfolio.pdf   # One-page downloadable summary (hero "Download Portfolio" button)
```

## Why placeholders instead of real photos

The source brief and deck didn't include usable image files (only text/description content
was available), so every photo-style visual on the site is an **original, on-brand
illustration** generated for this project — not a stock photo or someone else's screenshot.
This keeps the site fully yours to use with no licensing questions attached.

**To swap in real photos:**
1. Add your image to `/images` (e.g. `hannah-photo.jpg`).
2. In `index.html`, find the `<img>` tag you want to replace (search for `about-placeholder.png`
   for the About section) and update the `src` attribute.
3. Keep similar dimensions for the best fit, or adjust the surrounding CSS in `style.css`
   (search for `.about-media`).

The four portfolio project thumbnails (Workflow System, Operations Support, Email & Time
Tracking, Project Management) are intentionally abstract compositions rather than real
product screenshots, since screenshots of third-party tools (Calendly, Trello, Slack, etc.)
carry their own trademarks/UI copyright. If you'd like real screenshots of your own
work instead, just drop them into `/images` and update the matching `<img src>` in the
"Portfolio Projects" section.

## Updating content

Everything is in plain HTML — no CMS, no data files. Open `index.html` in any text editor
and search for the section you want to change:

| To change...                     | Look for this in `index.html`      |
|-----------------------------------|-------------------------------------|
| Hero headline / intro              | `<section class="hero"`            |
| About text & stats                 | `<section class="section" id="about"` |
| Services                           | `id="services"`                    |
| Skills bars                        | `id="skills"` (edit `data-level` + width to change the fill %) |
| Tools & platforms list              | `id="tools"`                       |
| Portfolio projects & modal content  | `id="portfolio"` (edit the `data-problem`, `data-solution`, `data-outcome`, `data-tools` attributes on each `<article class="project-card">`) |
| Process timeline                   | `id="process"`                     |
| Testimonials                       | `id="testimonials"`                |
| FAQ                                 | `id="faq"`                         |
| Contact details                    | `id="contact"`                     |
| Footer links                       | `<footer class="site-footer">`     |

## Design system (matches the brief)

- **Colors** — defined once as CSS variables at the top of `style.css` (`:root`):
  Deep Emerald `#1B5E20`, Accent `#2E7D32`, Soft Sage `#E8F5E9`, backgrounds `#FFFFFF` /
  `#F8FAF8`, text `#222222`, border `#E5E7EB`. Change a value once and it updates everywhere.
- **Typography** — Poppins (headings) + Manrope (body), loaded from Google Fonts.
- **Dark mode** — toggle in the header switches a `data-theme="dark"` attribute on
  `<html>`, which swaps a second set of CSS variables. It follows the visitor's system
  preference by default and resets on page reload (no cookies/local storage are used,
  by design, to keep the site fully static and privacy-friendly).

## The contact form

This is a static site with no backend, so the form doesn't post to a server. On submit,
after client-side validation, it opens the visitor's email app with a pre-filled message
to `Hannahakoore@gmail.com`. If you'd prefer a "real" server-side submission (so messages
land without opening an email client), connect the `<form id="contactForm">` in
`index.html` to a form backend such as Formspree, Getform, or a simple serverless function,
and remove the `mailto:` logic in `script.js` (search for "Contact form").

## Downloadable portfolio PDF

The hero's "Download Portfolio" button links to `assets/Hannah-Akoore-Portfolio.pdf`, a
one-page summary generated from this site's content. Replace that file with an updated
version any time — just keep the same filename, or update the `href` in `index.html`
(search for `downloadPortfolioBtn`).

## Performance & accessibility notes

- Semantic HTML5 landmarks (`header`, `main`, `section`, `footer`) and ARIA labels throughout.
- Full keyboard support: visible focus states, `Escape` closes menus/modals, the project
  modal returns focus to its trigger on close.
- Respects `prefers-reduced-motion` — all animation is disabled for visitors who request it.
- Images use `loading="lazy"` with a skeleton shimmer until they load.
- No external JS dependencies — the whole site is two files (`style.css`, `script.js`)
  plus markup, so it loads fast on any host.

## Hosting it

This is a static site — upload the whole `hannah-portfolio` folder to any static host
(Netlify, Vercel, GitHub Pages, Cloudflare Pages) or a standard web server, and it works
with zero configuration. There's nothing to build or compile.

## Before going live

- [ ] Swap placeholder images for real photos if you have them (optional — the current
      illustrations are fully usable as-is)
- [ ] Replace real testimonials with additional ones as new clients come in
- [ ] Update the `<link rel="canonical">` and Open Graph `og:url` in `index.html` once you
      have a live domain
- [ ] Consider connecting the contact form to a backend if you'd rather not rely on
      the visitor's email client
