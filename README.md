<p align="center">
  <img src="https://www.tinyfish.ai/TF-Logos/Horizontal%20Logo/SVG/TF_Horizontal.svg" alt="TinyFish" width="360" />
</p>

# Builder Compass

Builder Compass is a Photon-native strategy agent for AI-era builders, powered by [TinyFish](https://github.com/tinyfish-io), built with [OpenAI Codex](https://github.com/openai/codex), and delivered through [Photon](https://github.com/portel-dev/photon).

It takes a compact profile, uses TinyFish to research what people with that profile are actually doing on the open web, and turns that into a practical path to money, leverage, and focus.

## Why TinyFish Is The Center Of This

Builder Compass is not a generic self-reflection prompt.

TinyFish is what makes it real:

- it researches the builder's public footprint from the links they choose to share
- it maps that profile to real market activity on the live web
- it finds how similar people are positioning themselves and making money
- it gives Builder Compass evidence-backed paths instead of motivational fluff

TinyFish's official positioning is "enterprise infrastructure for AI web agents" and "1,000 operations. One API." Builder Compass uses that strength in a focused, personal way: not to scrape random websites for vanity data, but to help a builder understand which paths are realistic, fast, and aligned.

Source: [TinyFish official site](https://www.tinyfish.ai/) and [TinyFish GitHub](https://github.com/tinyfish-io)

## Hackathon Stack

This project is intentionally built around the exact stack the hackathon cares about:

- [TinyFish](https://github.com/tinyfish-io): the open-web research layer that turns a compact builder profile into live market intelligence
- [OpenAI Codex](https://github.com/openai/codex): the coding agent used to build, iterate, test, and tighten the product quickly
- [Photon](https://github.com/portel-dev/photon): the runtime that made it practical to ship a stateful MCP, rich UI, and reusable workflow in one product

Builder Compass exists because these three pieces fit together unusually well:

- TinyFish answers "what is true on the web right now?"
- Codex accelerates "how do we build and refine this product fast?"
- Photon simplifies "how do we turn it into a usable MCP with state and UI?"

## What Builder Compass Gives You

Builder Compass produces a reusable strategic profile, not a one-off answer.

- a saved builder profile per stateful instance
- a classified builder archetype
- strengths, work-fit, and risk tags
- ranked money paths
- a practical next-step roadmap
- a UI-first dashboard that can be driven from Beam or any MCP client

Once a profile is saved, the result stays available. You do not need to burn TinyFish calls every time you open it again.

When you change meaningfully over time, rebuild the profile and rerun the research.

## The Experience

Builder Compass is designed around Photon UI, not just terminal output.

The custom dashboard brings together:

- profile summary
- archetype snapshot
- strengths matrix
- fit gauges
- money-path table
- narrative guide

The goal is to feel like a personal operating manual:

> Based on your profile, this is what we found.  
> This is where people like you are winning.  
> This is what you should do next.

## Why This Is Useful

Most people already have signals about themselves scattered across:

- chat history and AI memory
- GitHub
- personal sites
- LinkedIn
- X
- project pages

Builder Compass turns those fragments into action.

Instead of asking a person to answer a giant questionnaire, the MCP client can infer a lot, ask for only missing high-value fields, and pass a compact factual profile into the photon.

Then TinyFish does the hard part:

1. understand what kind of builder this person is
2. research how similar people are making money on the internet
3. return the best-fit paths with evidence

## Install

Install directly from GitHub:

```bash
npx @portel/photon add Arul-/builders-compass/builder-compass
```

Or trigger an auto-install by calling it directly:

```bash
npx @portel/photon Arul-/builders-compass/builder-compass report
```

Then get the MCP config:

```bash
npx @portel/photon info builder-compass --mcp
```

## Ways To Use Builder Compass

### MCP-first

This is the main experience and the path used for the demo.

- install the photon
- add the generated MCP config to your client
- pass `BUILDER_COMPASS_TINYFISH_API_KEY` through the MCP env config
- let the client capture a compact profile and drive the workflow

### Beam UI

Builder Compass also has a rich Photon UI for a visual dashboard experience.

```bash
npx @portel/photon beam
```

Then open Builder Compass inside Beam.

### CLI

CLI support exists for local use and inspection, even though the demo focuses on MCP.

```bash
BUILDER_COMPASS_TINYFISH_API_KEY=YOUR_KEY npx @portel/photon mcp builder-compass
```

You can also inspect MCP config with:

```bash
npx @portel/photon info builder-compass --mcp
```

## TinyFish Setup

Builder Compass expects the TinyFish API key as a constructor config so it can be passed through MCP environment configuration cleanly.

The generated MCP config uses:

```json
{
  "mcpServers": {
    "builder-compass": {
      "command": "node",
      "args": ["/path/to/photon/dist/cli.js", "mcp", "builder-compass"],
      "env": {
        "BUILDER_COMPASS_TINYFISH_API_KEY": "<your-tinyfishApiKey>"
      }
    }
  }
}
```

You can also save the config locally:

```bash
npx @portel/photon set builder-compass tinyfishApiKey=YOUR_KEY
```

For MCP clients, the most reliable path is still setting the env directly in the client config.

## How It Works

### 1. Save a compact builder profile

The profile is intentionally small and factual:

- name
- headline
- current goal
- recent work
- energizing work
- constraints
- public links

### 2. Analyze identity

Builder Compass classifies:

- archetype
- strengths
- work fit
- risk load
- monetization modes

### 3. Research the market with TinyFish

TinyFish looks outward:

- what people like this are selling
- where they position themselves
- which paths look crowded
- which routes look fast to money
- which paths look better for long-term compounding

### 4. Save and reuse results

Because the photon is `@stateful`, each instance can keep its own profile and analysis.

That means you can keep separate tracks such as:

- `default`
- `consulting-path`
- `founder-path`
- `career-reset`

## What Makes This Different

Builder Compass is not trying to replace judgment.

It is a strategy layer between:

- what you have actually done
- what the web says is working
- what seems aligned for you right now

That is why the combination matters:

- [Photon](https://github.com/portel-dev/photon) gives you state, UI, MCP delivery, and reusable workflows
- [TinyFish](https://github.com/tinyfish-io) gives you live web research and evidence-backed market reality
- [OpenAI Codex](https://github.com/openai/codex) compresses the build loop so the product can be shaped, shipped, and improved quickly

## How Codex Was Used

Builder Compass was built with [OpenAI Codex](https://github.com/openai/codex) as an active coding partner, not just as a writing assistant.

Codex was used to:

- shape the photon architecture and method design
- iterate on the stateful profile and caching flow
- refine the MCP-facing capture contract
- improve the UI structure and dashboard composition
- test installation and MCP configuration flows
- tighten docs and packaging under hackathon time pressure

In practice, Codex helped compress the time from idea to runnable MCP product while Photon handled the runtime model and TinyFish supplied the live-web intelligence.

## How Photon Simplified This

[Photon](https://github.com/portel-dev/photon) is the reason this could stay compact.

Instead of building separate layers for:

- MCP server plumbing
- local state management
- UI rendering
- install/distribution
- configuration handling

Builder Compass could stay as one stateful photon with custom UI and a clean install story.

## Built For

- AI-native developers
- technical builders
- indie hackers
- prototype-driven founders
- product-technical generalists
- implementation consultants

## Repo Contents

- [`builder-compass.photon.ts`](./builder-compass.photon.ts): the stateful photon
- [`builder-compass.md`](./builder-compass.md): generated photon docs
- [`ui/builder-compass.photon.html`](./ui/builder-compass.photon.html): low-manual Photon-first UI
- [`ui/builder-compass.html`](./ui/builder-compass.html): richer custom UI variant
- [`HACKATHON_SCOPE.md`](./HACKATHON_SCOPE.md): what was built during the hackathon

## Demo Positioning

Builder Compass is best shown as:

1. a user provides a compact profile
2. TinyFish researches what that profile means on the live web
3. Builder Compass renders the strategic guide
4. the user leaves with a clearer path to money and focus

## Credit

Built with [Photon](https://github.com/portel-dev/photon) and powered by [TinyFish](https://www.tinyfish.ai/).

<!-- PHOTON_MARKETPLACE_START -->
# builders-compass

> **Singular focus. Precise target.**

**Photons** are single-file TypeScript MCP servers that supercharge AI assistants with focused capabilities. Each photon delivers ONE thing exceptionally well - from filesystem operations to cloud integrations.

Built on the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction), photons are:
- 📦 **One-command install** via [Photon CLI](https://github.com/portel-dev/photon)
- 🎯 **Laser-focused** on singular capabilities
- ⚡ **Zero-config** with auto-dependency management
- 🔌 **Universal** - works with Claude Desktop, Claude Code, and any MCP client

## 📦 Available Photons

| Photon | Focus | Tools | Features |
|--------|-------|-------|----------|
| [**Builder Compass**](builder-compass.md) | Builder Compass | 9 | 🎨🎨 |


**Total:** 1 photons ready to use

---

## 🚀 Quick Start

### 1. Install Photon

```bash
bun add -g @portel/photon
```

### 2. Add Any Photon

```bash
photon add filesystem
photon add git
photon add aws-s3
```

### 3. Use It

```bash
# Run as MCP server
photon mcp filesystem

# Get config for your MCP client
photon get filesystem --mcp
```

Output (paste directly into your MCP client config):
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "photon",
      "args": ["mcp", "filesystem"]
    }
  }
}
```

Add the output to your MCP client's configuration. **Consult your client's documentation** for setup instructions.

**That's it!** Your AI assistant now has 1 focused tools at its fingertips.

---

## 🎨 Claude Code Integration

This marketplace is also available as a **Claude Code plugin**, enabling seamless installation of individual photons directly from Claude Code's plugin manager.

### Install as Claude Code Plugin

```bash
# In Claude Code, run:
/plugin marketplace add portel-dev/photons
```

Once added, you can install individual photons:

```bash
# Install specific photons you need
/plugin install filesystem@photons-marketplace
/plugin install git@photons-marketplace
/plugin install knowledge-graph@photons-marketplace
```

### Benefits of Claude Code Plugin

- **🎯 Granular Installation**: Install only the photons you need
- **🔄 Auto-Updates**: Plugin stays synced with marketplace
- **⚡ Zero Config**: Photon CLI auto-installs on first use
- **🛡️ Secure**: No credentials shared with AI (interactive setup available)
- **📦 Individual MCPs**: Each photon is a separate installable plugin

### How This Plugin Is Built

This marketplace doubles as a Claude Code plugin through automatic generation:

```bash
# Generate marketplace AND Claude Code plugin files
photon maker sync --claude-code
```

This single command:
1. Scans all `.photon.ts` files
2. Generates `.marketplace/photons.json` manifest
3. Creates `.claude-plugin/marketplace.json` for Claude Code
4. Generates documentation for each photon
5. Creates auto-install hooks for seamless setup

**Result**: One source of truth, two distribution channels (Photon CLI + Claude Code).

---

## ⚛️ What Are Photons?

**Photons** are laser-focused modules - each does ONE thing exceptionally well:
- 📁 **Filesystem** - File operations
- 🐙 **Git** - Repository management
- ☁️ **AWS S3** - Cloud storage
- 📅 **Google Calendar** - Calendar integration
- 🕐 **Time** - Timezone operations
- ... and more

Each photon delivers **singular focus** to a **precise target**.

**Key Features:**
- 🎯 Each photon does one thing perfectly
- 📦 1 production-ready photons available
- ⚡ Auto-installs dependencies
- 🔧 Works out of the box
- 📄 Single-file design (easy to fork and customize)

## 🎯 The Value Proposition

### Before Photon

For each MCP server:
1. Find and clone the repository
2. Install dependencies manually
3. Configure environment variables
4. Write MCP client config JSON by hand
5. Repeat for every server

### With Photon

```bash
# Install from marketplace
photon add filesystem

# Get MCP config
photon get filesystem --mcp
```

Output (paste directly into your MCP client config):
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "photon",
      "args": ["mcp", "filesystem"]
    }
  }
}
```

**That's it.** No dependencies, no environment setup, no configuration files.

**Difference:**
- ✅ One CLI, one command
- ✅ Zero configuration
- ✅ Instant installation
- ✅ Auto-dependencies
- ✅ Consistent experience

## 💡 Use Cases

**For Claude Users:**
```bash
photon add filesystem git github-issues
photon get --mcp  # Get config for all three
```
Add to Claude Desktop → Now Claude can read files, manage repos, create issues

**For Teams:**
```bash
photon add postgres mongodb redis
photon get --mcp
```
Give Claude access to your data infrastructure

**For Developers:**
```bash
photon add docker git slack
photon get --mcp
```
Automate your workflow through AI

## 🔍 Browse & Search

```bash
# List all photons
photon get

# Search by keyword
photon search calendar

# View details
photon get google-calendar

# Upgrade all
photon upgrade
```

## 🏢 For Enterprises

Create your own marketplace:

```bash
# 1. Organize photons
mkdir company-photons && cd company-photons

# 2. Generate marketplace
photon maker sync

# 3. Share with team
git push origin main

# Team members use:
photon marketplace add company/photons
photon add your-internal-tool
```

---

**Built with singular focus. Deployed with precise targeting.**

Made with ⚛️ by [Portel](https://github.com/portel-dev)

<!-- PHOTON_MARKETPLACE_END -->
