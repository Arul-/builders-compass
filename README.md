<p align="center">
  <img src="https://www.tinyfish.ai/TF-Logos/Horizontal%20Logo/SVG/TF_Horizontal.svg" alt="TinyFish" width="360" />
</p>

# Builder Compass

Builder Compass is a Photon-native strategy agent for AI-era builders, powered by TinyFish.

It takes a compact profile, uses TinyFish to research what people with that profile are actually doing on the open web, and turns that into a practical path to money, leverage, and focus.

## Why TinyFish Is The Center Of This

Builder Compass is not a generic self-reflection prompt.

TinyFish is what makes it real:

- it researches the builder's public footprint from the links they choose to share
- it maps that profile to real market activity on the live web
- it finds how similar people are positioning themselves and making money
- it gives Builder Compass evidence-backed paths instead of motivational fluff

TinyFish's official positioning is "enterprise infrastructure for AI web agents" and "1,000 operations. One API." Builder Compass uses that strength in a focused, personal way: not to scrape random websites for vanity data, but to help a builder understand which paths are realistic, fast, and aligned.

Source: [TinyFish official site](https://www.tinyfish.ai/)

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

- Photon gives you state, UI, MCP delivery, and reusable workflows
- TinyFish gives you live web research and evidence-backed market reality

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
