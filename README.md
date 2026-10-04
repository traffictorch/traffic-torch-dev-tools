# Traffic Torch – SEO, AEO & UX Audit Tools for VS Code

**Instant SEO, AEO & UX audits directly inside VS Code.**

Right-click any HTML file or use the sidebar to send your code to Traffic Torch’s powerful analysis tools.  
**Small selections auto-fill and run instantly.** Large files are safely copied to clipboard with clear instructions.

Get 360° SEO + UX health scores, competitive gap analysis, AI-generated fixes, CMS-specific recommendations, and educational insights while coding.

## How It Works

### Sidebar (Activity Bar)
- Click the **Traffic Torch** icon in the left Activity Bar
- Browse the full list of tools
- Click any tool:
  - Small selection or file → automatically fills the input and runs the audit
  - Large file → copied to clipboard + pop-up with paste instructions
  - **NUSA Tool** (Home) is URL-only

### Right-Click Context Menu
- Right-click any `.html` or `.htm` file (in Explorer or inside the editor)
- Choose **"Audit with Traffic Torch"**
- Select the tool from the dropdown
- Same smart behaviour as the sidebar

### Smart Content Handling
- Selected text is always preferred (even inside large files)
- Small/medium content → opens with `?input=` (auto-fills + auto-runs)
- Large content (> 8000 characters) → copied to clipboard + modal instructions
- NUSA Tool opens the home page (URL-only)

## Current Tools (v1.2.0)

| Tool | Path | Notes |
|------|------|-------|
| 📈 NUSA Tool | `/` | Home page – URL only |
| 🗼 Lighthouse Plus | `/lighthouse-plus-tool/` | Core Web Vitals, Accessibility, SEO, PWA, Mobile UX, Agentic Browsing |
| 🚀 AEO Performance | `/aeo-performance-tool/` | AI crawler & answer-engine readiness |
| ⚖️ SEO + UX | `/seo-ux-tool/` | Combined SEO + UX health analysis |
| ⚜️ Topical Authority Audit | `/topical-authority-audit-tool/` | |
| 🧬 SEO Entity Extractor | `/seo-entity-extractor-tool/` | |
| 🎯 SEO Intent Tool | `/seo-intent-tool/` | |
| 📍 Local SEO Tool | `/local-seo-tool/` | |
| 🛒 Product SEO Tool | `/product-seo-tool/` | |
| 🔍 AI Search Optimization | `/ai-search-optimization-tool/` | |
| 🎙️ AI Voice Search Tool | `/ai-voice-search-tool/` | |
| 🤖 AI Content Audit | `/ai-audit-tool/` | |
| ⛔ Quit Risk UX Tool | `/quit-risk-tool/` | |
| 🔑 Keyword Research Tool | `/keyword-research-tool/` | |
| 🗝️ Keyword Placement Tool | `/keyword-tool/` | |
| 🆚 Keyword vs Tool | `/keyword-vs-tool/` | |
| ⚙️ Schema Generator | `/schema-generator/` | Now validates + accepts HTML input |

All tools now include **CMS-specific fixes** and **Ask AI** features.

## Features

- One-click access from sidebar and right-click context menu
- Smart selection detection
- Safe clipboard fallback for large files
- Clean modal instructions
- Fully respects VS Code light/dark mode
- No backend, no API keys – all intelligence stays on [traffictorch.net](https://traffictorch.net)

## Icons

- Activity Bar icon: `media/icon.svg` (24×24)
- Marketplace icon: `media/icon.png` (256×256)

## Installation

1. Download the latest `.vsix` from the [Releases](https://github.com/traffictorch/traffic-torch-dev-tools/releases) page  
   **or** install from the VS Code Marketplace (search “Traffic Torch”)
2. In VS Code → Extensions view → `...` → **Install from VSIX...**
3. Reload Window

## Usage Tips

- Highlight specific sections for fast, targeted audits
- Leave nothing selected for full-page analysis
- For large files: paste from clipboard into the textarea and click Analyze
- NUSA Tool works best when you paste a live URL directly into the tool

Built for **[traffictorch.net](https://traffictorch.net)** — Instant 360° SEO, AEO & UX health analysis platform.

---

Made with ❤️ for web developers who care about modern SEO and great user experience.