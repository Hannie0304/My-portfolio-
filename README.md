# Hannah Akoore — Premium Virtual Assistant Portfolio Website

A modern, elegant, mobile-first portfolio website for Hannah Akoore, a General Virtual Assistant based in Lagos, Nigeria. Built to position her as a premium, trustworthy partner for busy founders, executives, and growing businesses.

**Live Demo / Preview**: Open `index.html` in any modern browser.

---

## ✨ Design Highlights

- **Premium & Professional**: Clean, spacious, Notion/Linear/Apple-inspired aesthetic
- **Color Palette**: Deep Emerald Green (#1B5E20) primary with soft sage accents on pure white
- **Typography**: Poppins (headings) + Inter (body) via Google Fonts
- **Mobile-First**: Fully responsive from small phones to large desktop screens
- **Performance**: Vanilla HTML/CSS/JS — fast, accessible, no heavy frameworks
- **Accessibility**: ARIA labels, keyboard navigation, focus states, semantic HTML, high contrast

---

## 📁 Project Structure

```
hannah-akoore-portfolio/
├── index.html              # Main website (all sections + modals)
├── style.css               # Complete design system + responsive styles
├── script.js               # All interactivity (carousel, modals, forms, animations, etc.)
├── assets/
│   └── Hannah_Akoore_Portfolio.pdf   # Downloadable original portfolio
├── images/
│   ├── hannah-portrait-hero.jpg      # Professional hero/about portrait (AI-generated)
│   ├── workspace-organized.jpg       # Project & hero visual
│   ├── desk-laptop-plants.jpg        # Project visual
│   └── minimalist-desk.jpg           # Project visual
├── icons/                  # (Reserved for custom SVGs if needed)
└── README.md
```

---

## 🚀 Key Features Implemented

### Core Sections (as per brief)
- Sticky premium navigation with mobile hamburger
- Large hero with professional portrait + dual CTAs
- About + animated statistics counters (IntersectionObserver)
- 6 beautiful service cards with hover micro-interactions
- Animated skill progress bars
- Tools & platforms grid (14 tools with Lucide icons)
- 4 project cards with filtering + rich detail modals
- 5-step visual workflow/timeline
- "Why Work With Me" attribute cards
- Testimonial carousel (auto + manual, keyboard accessible)
- FAQ accordion
- Final CTA + professional contact form with validation
- Contact info card with copy-to-clipboard

### UX & Interactions
- Scroll progress bar
- Active nav highlighting (ScrollSpy)
- Smooth scroll with offset for sticky nav
- Project filtering (All / Workflow / Organization / Communication)
- Clickable project cards → beautiful detail modals
- Testimonial auto-carousel with pause on hover + dots + arrows
- Form validation + simulated submission + success toast
- Dark mode toggle (persisted in localStorage)
- Floating "Book a Call" button
- Scroll-to-top button
- Professional loading screen
- Ripple effects on buttons
- Scroll-reveal style animations via IntersectionObserver

### Accessibility & Performance
- Semantic HTML5 + proper heading hierarchy
- ARIA attributes on interactive elements
- Keyboard navigation support
- Focus-visible styles
- Mobile menu with body scroll lock
- Optimized images + lazy-friendly structure
- No external dependencies except Lucide icons (lightweight CDN)

---

## 🛠 Customization Guide

### 1. Update Personal Info
- **Contact details**: Edit phone, email, Linktree in `index.html` (Contact section + Footer)
- **Stats numbers**: Change `data-target` values in the stats cards
- **Testimonials**: Replace or add new `.testimonial-slide` blocks
- **Projects**: Edit the `projectsData` object inside `script.js` (easy to extend)

### 2. Add / Replace Images
- Hero portrait: `images/hannah-portrait-hero.jpg`
- Project visuals: Replace files in `/images/` or update `src` attributes
- Recommended sizes: Hero ~420×560px, Project cards ~800×500px

### 3. Form Submission (Production)
Currently the form shows a success toast after simulated delay.  
To make it functional:
- Connect to **Formspree**, **Web3Forms**, or **Supabase Edge Function**
- Or use a simple `fetch()` to your backend endpoint in the form submit handler in `script.js`

### 4. Dark Mode
Toggle is already fully functional. The CSS variables automatically adapt colors.

### 5. SEO & Social
Update meta tags in `<head>` of `index.html`:
- `og:image` and `twitter:image` (add a nice preview image)
- Structured data JSON-LD already included (ProfessionalService + Person)

### 6. Downloadable Portfolio
The original PDF is already linked in `assets/`.  
To update it, simply replace the file in `/assets/`.

---

## 📱 Responsive Breakpoints

- Mobile: < 640px (single column everything)
- Tablet: 640px – 1023px
- Desktop: ≥ 1024px (full multi-column layouts)

All components gracefully adapt.

---

## 🧪 Browser Support

Tested & optimized for:
- Chrome, Safari, Firefox, Edge (latest)
- iOS Safari & Chrome on Android

---

## 📦 Deployment

This is a static site. Deploy anywhere:

```bash
# Simple local preview
npx serve .

# Or drag the folder into:
# - Vercel (zero config)
# - Netlify (drag & drop)
# - GitHub Pages
# - Cloudflare Pages
```

---

## 🎨 Design System Notes

All styling uses CSS custom properties defined in `:root` inside `style.css`.  
You can easily tweak:
- `--color-primary` (main emerald)
- `--radius-*` values
- `--space-*` spacing scale
- Font stacks

---

## 🙏 Credits & Assets

- Portrait generated with Grok Imagine (custom prompt matching the original PDF look)
- Workspace images sourced via royalty-free stock (Unsplash / similar aesthetic)
- Icons: [Lucide](https://lucide.dev) (beautiful, consistent, lightweight)
- Original content & structure inspired by Hannah’s provided PDF portfolio

---

## 📌 Next-Level Enhancements (Optional)

- Integrate real Calendly embed in the "Book a Call" flow
- Add a simple CMS (TinaCMS or Decap) if Hannah wants to edit content herself
- Add blog / insights section later
- Connect form to actual email service + auto-reply
- Add WhatsApp floating button (very effective for Nigerian market)

---

**Built with care as a senior developer project** — clean code, thoughtful UX, and premium presentation that matches the high-value positioning of Hannah Akoore’s services.

For any questions or further customizations, feel free to reach out.

— Generated for Hannah Akoore | July 2026