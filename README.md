# Litchfield Perk

Website for Litchfield Perk Cafe — menu, hours, and local community hub.

## Overview

A full-featured cafe website for Litchfield Perk, built with a Vite frontend and Netlify serverless functions for any backend needs. Features static content delivery for fast load times with dynamic capabilities where needed.

## Tech Stack

- JavaScript
- Vite
- Tailwind CSS
- Netlify Functions (serverless)
- PostCSS

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

```
src/                  # Application source code
public/               # Static assets (images, fonts)
netlify/functions/    # Serverless backend functions
docs/                 # Documentation
scripts/              # Utility scripts
```

## Deployment

Auto-deploys to Netlify on push to `main`. Serverless functions in `netlify/functions/` are deployed alongside the static site. See `netlify.toml` for full configuration.

---

*Built by [nmswainston](https://github.com/nmswainston)*
