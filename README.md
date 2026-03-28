<p align="center">
  <img src="https://www.tinyfish.ai/TF-Logos/Horizontal%20Logo/SVG/TF_Horizontal.svg" alt="TinyFish" width="300" />
</p>

<h1 align="center">Builder's Compass</h1>

<p align="center">
  <strong>Discover your builder profile. Research how people like you make money. Get a next-step plan.</strong>
</p>

<p align="center">
  Built with <a href="https://github.com/portel-dev/photon">Photon</a> &middot; Powered by <a href="https://www.tinyfish.ai/">TinyFish</a> &middot; Developed with <a href="https://github.com/openai/codex">OpenAI Codex</a>
</p>

---

<p align="center">
  <a href="https://www.youtube.com/watch?v=gs6wVcyCaKI">
    <img src="https://img.youtube.com/vi/gs6wVcyCaKI/maxresdefault.jpg" alt="Builder's Compass Demo" width="600" />
  </a>
  <br />
  <a href="https://www.youtube.com/watch?v=gs6wVcyCaKI">Watch the demo</a>
</p>

---

## The Problem

Most builders don't fail because they lack tools. They fail because they can't answer:

- What should I build?
- What should I sell?
- Am I better suited to consulting, products, content, or a startup wedge?
- What are people like me actually doing successfully right now?

Builder's Compass exists to answer that with evidence instead of flattery.

## How It Works

**Two intelligence passes turn what your MCP client already knows into a strategic plan.**

### Pass 1: Client-side builder intel

Your MCP client already knows things about you — goals, projects, constraints, preferences. Instead of forcing you into a questionnaire, Builder's Compass accepts what the client can infer and only asks for what's missing.

### Pass 2: TinyFish market intelligence

[TinyFish](https://github.com/tinyfish-io) researches the open web to find how builders with your profile are positioning themselves, getting clients, and making money. The final recommendation is grounded in evidence, not introspection alone.

## What You Get

| Output | Description |
|--------|-------------|
| **Builder profile** | Saved, stateful, reusable across sessions |
| **Archetype classification** | e.g. "prototype-driven founder", "agent-workflow architect" |
| **Strength matrix** | Scored across systems thinking, product intuition, execution, judgment, etc. |
| **Risk patterns** | Identity diffusion, novelty chasing, weak finish loops |
| **Money paths** | Ranked by fit, speed-to-money, market demand, sustainability |
| **Strategic guide** | Narrative report with next moves and paths to avoid |
| **Dashboard UI** | Tabbed Beam interface or any MCP client |

## Quick Start

### Install

```bash
npx @portel/photon add Arul-/builders-compass/builder-compass
```

### Get MCP Config

```bash
npx @portel/photon info builder-compass --mcp
```

Output:
```json
{
  "mcpServers": {
    "builder-compass": {
      "command": "node",
      "args": ["/path/to/photon/dist/cli.js", "mcp", "builder-compass"],
      "env": {
        "BUILDER_COMPASS_TINYFISH_API_KEY": "<your-key>"
      }
    }
  }
}
```

### Run in Beam

```bash
npx @portel/photon beam
```

Open Builder's Compass in the sidebar.

### CLI

```bash
BUILDER_COMPASS_TINYFISH_API_KEY=YOUR_KEY npx @portel/photon cli builder-compass report
```

## TinyFish Setup

Builder's Compass needs a TinyFish API key for live web research. Without it, heuristic analysis still works but market paths won't have external evidence.

**Option A** — Pass via MCP env config (recommended):
```json
{
  "env": {
    "BUILDER_COMPASS_TINYFISH_API_KEY": "<your-key>"
  }
}
```

**Option B** — Save locally:
```bash
npx @portel/photon set builder-compass tinyfishApiKey=YOUR_KEY
```

## Architecture

Builder's Compass is a single stateful [Photon](https://github.com/portel-dev/photon) — one TypeScript file that becomes an MCP server, CLI tool, and web dashboard simultaneously.

- **Stateful** — profile persists across sessions, no re-entry
- **Two-pass analysis** — heuristic classification + TinyFish web research
- **Progressive** — works without TinyFish (heuristic only), better with it
- **MCP-native** — designed for AI clients that already know the user

## Hackathon Stack

| Layer | Tool | Role |
|-------|------|------|
| Web research | [TinyFish](https://github.com/tinyfish-io) | Live market intelligence from the open web |
| Development | [OpenAI Codex](https://github.com/openai/codex) | Coding agent for rapid iteration |
| Runtime | [Photon](https://github.com/portel-dev/photon) | MCP server, state, UI, install — all from one file |

## Repo Contents

| File | Purpose |
|------|---------|
| [`builder-compass.photon.ts`](./builder-compass.photon.ts) | Stateful photon (the entire product) |
| [`ui/builder-compass.photon.html`](./ui/builder-compass.photon.html) | Tabbed dashboard UI for Beam |
| [`builder-compass.md`](./builder-compass.md) | Generated photon documentation |
| [`HACKATHON_SCOPE.md`](./HACKATHON_SCOPE.md) | What was built during the hackathon |

## License

MIT

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
| [**Builder Compass**](builder-compass.md) | Builder Compass | 11 | 🎨🎨 |


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
