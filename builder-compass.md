# Builder Compass

Builder Compass

> **9 tools** · API Photon · v1.16.0 · MIT

**Platform Features:** `custom-ui` `stateful` `dashboard`

## ⚙️ Configuration

No configuration required.



## 📋 Quick Reference

| Method | Description |
|--------|-------------|
| `main` | Open the Builder Compass dashboard |
| `saveProfile` | Save the builder profile and optional TinyFish API key |
| `analyzeIdentity` | Analyze the builder's identity, strengths, work fit, and risks |
| `researchMarket` | Research how people with this profile are making money right now |
| `runCompass` | Run the full builder compass flow end to end |
| `strengthMatrix` | Structured strengths matrix for agents and dashboards |
| `moneyPaths` | Ranked money paths for this builder profile |
| `fitOverview` | Quick visual fit panel for the dashboard |
| `report` | Full narrative guide for the user |


## 🔧 Tools


### `main`

Open the Builder Compass dashboard





---


### `saveProfile`

Save the builder profile and optional TinyFish API key





---


### `analyzeIdentity`

Analyze the builder's identity, strengths, work fit, and risks





---


### `researchMarket`

Research how people with this profile are making money right now





---


### `runCompass`

Run the full builder compass flow end to end





---


### `strengthMatrix`

Structured strengths matrix for agents and dashboards





---


### `moneyPaths`

Ranked money paths for this builder profile





---


### `fitOverview`

Quick visual fit panel for the dashboard





---


### `report`

Full narrative guide for the user





---





## 🏗️ Architecture

```mermaid
flowchart LR
    subgraph builder_compass["📦 Builder Compass"]
        direction TB
        PHOTON((🎯))
        T0[🔧 main]
        PHOTON --> T0
        T1[✏️ saveProfile]
        PHOTON --> T1
        T2[🔧 analyzeIdentity]
        PHOTON --> T2
        T3[🔧 researchMarket]
        PHOTON --> T3
        T4[▶️ runCompass]
        PHOTON --> T4
        T5[🔧 strengthMatrix]
        PHOTON --> T5
        T6[🔧 moneyPaths]
        PHOTON --> T6
        T7[🔧 fitOverview]
        PHOTON --> T7
        T8[🔧 report]
        PHOTON --> T8
    end
```


## 📥 Usage

```bash
# Install from marketplace
photon add builder-compass

# Get MCP config for your client
photon info builder-compass --mcp
```

## 📦 Dependencies

No external dependencies.

---

MIT · v1.16.0
