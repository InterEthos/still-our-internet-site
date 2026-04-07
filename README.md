![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-F38020?style=flat&logo=cloudflare&logoColor=white) ![Alpine.js](https://img.shields.io/badge/Alpine.js-8BC0D0?style=flat&logo=alpinedotjs&logoColor=black) ![Astro](https://img.shields.io/badge/Astro-FF5D01?style=flat&logo=astro&logoColor=white) ![Bun](https://img.shields.io/badge/Bun-000000?style=flat&logo=bun&logoColor=white) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

# Still Our Internet Website

This is the repository for the _Still Our Internet_ static site, visible on [stillourinternet.org](https://stillourinternet.org). This site is optimized for performance, a11y, SEO, and a minimal Javascript footprint.

<img alt="InterEthos" src="./public/og-image-alt.png" width="500">

## Stack

- **Astro 6** — static output, client-side routing via `<ClientRouter />`
- **Alpine.js** — lightweight interactivity, no build step
- **Plain CSS** — vanilla css using new(ish) features as a loose framework
- **Bun** — package manager and script runner


## Quickstart

```bash
bun install    # requires node 22+
bun dev        # local development
bun build      # outputs to ./dist
bun preview    # preview the ./dist build locally
```

## Deployment

Assuming a static site host like Cloudflare Pages, Github Pages, Netlify, etc.

- Build command: `bun run build`
- Set output directory: `dist`
- Ensure Node version is set to **22** or higher in environment settings
- Add any environment variables (none by default, except maybe the node-version)


## Directory structure

```
/
├── public/
│   ├── _headers
│   ├── favicon/
│   ├── fonts/            # Self-hosted webfonts
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   ├── fonts/        # Source fonts (processed by Vite)
│   │   └── images/       # Images processed by Astro's <Image /> component
│   │
│   ├── components/
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Nav.astro
│   │   └── SEO.astro     # <title>, meta, canonical, OG, Twitter card
│   │
│   ├── config/
│   │   └── site.ts       # Site-wide constants
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── (other pages).astro
│   │   └── 404.astro
│   │
│   └── styles/
│       ├── reset.css
│       ├── variables.css
│       └── global.css
│
├── astro.config.mjs
├── tsconfig.json
└── package.json
```
