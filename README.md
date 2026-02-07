# AI Visual Web Inspector

**Playwright MCP-Powered Web Analysis**

An AI-driven web page inspection toolkit that uses the Playwright Model Context Protocol (MCP) to visually analyze, deconstruct, and document live websites. Built to let AI agents see, understand, and report on web interfaces the way a senior frontend developer would.

---

## Why This Exists

Traditional web scraping captures raw HTML. Code review reads static files. Neither approach truly understands what a web page looks and feels like at runtime. This project uses Playwright MCP to give AI models actual visual context -- rendered screenshots, live DOM structure, animation behavior, and interaction patterns -- enabling deep analysis that goes beyond source code alone.

## Architecture

```
AI Agent (Claude / LLM)
        |
        v
Playwright MCP Server
        |
        v
Live Website (Chromium rendering)
        |
        v
Structured Analysis Output
  - Full-page screenshots and visual captures
  - Feature decomposition into standalone modules
  - Animation and interaction documentation
  - Reusable code extraction with tutorials
```

### How It Works

1. **Visual Capture** -- Playwright MCP navigates to target pages, captures full-page screenshots, and provides the AI with actual visual representations of the rendered site.
2. **DOM Inspection** -- The AI agent queries DOM elements, CSS properties, and JavaScript behavior through MCP tool calls, inspecting the page as a developer would in DevTools.
3. **Feature Decomposition** -- Complex web features (CSS animations, GSAP scroll effects, Three.js 3D renders) are identified, isolated, and documented as standalone, reproducible modules.
4. **Tutorial Generation** -- Each extracted feature is accompanied by implementation tutorials with core HTML/CSS/JS structure, technical explanations, and runnable examples.

### Case Study: Gamania Corporate Site Analysis

This project includes a complete analysis of the Gamania Group (gamania.com) corporate website, demonstrating the full inspection workflow:

**`gamania_site/`** -- Captured site assets: HTML pages, CSS stylesheets, JavaScript modules, and 44+ image assets from the live production site.

**`gamania_features/`** -- Extracted and documented individual UI features:

| Feature | Status | Description |
|---------|--------|-------------|
| Loading Animation | Complete | Full-screen loader with marquee text and pulsing logo |
| Timeline/Milestones | Complete | GSAP ScrollTrigger-driven year timeline (1995-2025) |
| 3D Globe | Documented | Three.js globe with 4K texture and Draco-compressed GLB |
| Awards Cards | Documented | Interactive award showcase gallery |

**`gamania_tutorial/`** -- Implementation tutorials covering six major techniques:
1. Loading animation (CSS keyframes + GSAP exit transitions)
2. SVG animation production
3. Scroll-driven mask-to-black transitions
4. Historical timeline with ScrollTrigger
5. Three.js 3D object loading and rendering
6. Interactive 3D territory map

Each tutorial includes core code, visual references, and runnable examples in the `examples/` directory.

## Tech Stack

- **AI Integration**: Playwright Model Context Protocol (MCP)
- **Browser Engine**: Playwright (Chromium)
- **Analysis Targets**: Nuxt.js, Vue SSR, GSAP, Three.js, TailwindCSS
- **Output Formats**: Markdown documentation, standalone HTML/CSS/JS modules, tutorial pages

## Project Structure

```
ai-visual-web-inspector/
  gamania_site/                # Captured production site assets
    www.gamania.com/           # Mirrored site structure (HTML, CSS, JS)
    images/                    # 44+ visual asset captures
  gamania_features/            # Decomposed feature modules
    01-loading/                # Loading animation (extracted + standalone)
    02-milestones/             # Timeline feature (extracted + standalone)
    README.md                  # Feature catalog with status
  gamania_tutorial/            # Implementation tutorials
    README.md                  # Tutorial index (6 techniques)
    examples/                  # Runnable example implementations
    index.html                 # Interactive tutorial browser
```

## Usage

This toolkit is designed to work with an AI agent that has access to Playwright MCP tools. The AI navigates to any target website, captures visual and structural data, and produces decomposed feature modules and documentation.

The Gamania analysis serves as the reference implementation. The same methodology applies to any website -- point the AI at a URL and request visual inspection, feature extraction, or implementation documentation.

---

Built by **Huang Akai (Kai)** -- Founder @ Universal FAW Labs | Creative Technologist | Ex-Ogilvy
