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
