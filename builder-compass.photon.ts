/**
 * Builder Compass
 * @description Discover your strongest AI-native builder profile, research how people like you make money, and get an evidence-backed next-step roadmap.
 * @icon 🧭
 * @stateful
 * @ui app ./ui/builder-compass.photon.html
 */

type ArchetypeTag =
  | "ai-augmented-solo-builder"
  | "agent-workflow-architect"
  | "developer-tools-builder"
  | "high-agency-integrator"
  | "implementation-consultant"
  | "product-technical-translator"
  | "prototype-driven-founder"
  | "systems-minded-operator";

type StrengthTag =
  | "ambiguity-tolerance"
  | "architecture"
  | "communication"
  | "curiosity"
  | "design-taste"
  | "distribution"
  | "execution"
  | "integration"
  | "judgment"
  | "product-intuition"
  | "rapid-prototyping"
  | "research"
  | "systems-thinking"
  | "workflow-design";

type WorkFitTag =
  | "ai-application-engineering"
  | "consulting"
  | "developer-tools"
  | "founder-path"
  | "hybrid-product-technical"
  | "implementation-work"
  | "indie-hacking"
  | "prototype-work"
  | "technical-education"
  | "workflow-automation";

type RiskTag =
  | "ai-overreliance"
  | "identity-diffusion"
  | "novelty-chasing"
  | "overextension"
  | "prestige-chasing"
  | "weak-finish-loops";

type MoneyModeTag =
  | "audience-plus-product"
  | "consulting-sprints"
  | "education-products"
  | "retainer-implementation"
  | "sell-tools"
  | "startup-wedge"
  | "template-productization";

interface LinkEvidence {
  label: string;
  url: string;
  reason: string;
}

interface ProfileInput {
  /** Builder's real name or stable public handle. Prefer what the MCP client already knows. Leave omitted if still unknown. */
  name?: string;
  /** One-line current positioning statement. Keep it factual, not aspirational. Leave omitted if unknown. */
  headline?: string;
  /** What the builder is optimizing for right now: income, startup wedge, specialization, etc. Leave omitted if unknown. */
  goalNow?: string;
  /** Recent projects, shipped work, or repeated patterns the builder actually returns to. Leave omitted if unknown. */
  recentWork?: string;
  /** What kinds of work generate energy rather than just status or obligation. Leave omitted if unknown. */
  energizingWork?: string;
  /** Constraints that materially shape strategy: runway, time, geography, job pressure, etc. Leave omitted if unknown. */
  constraints?: string;
  /** Public links the builder explicitly wants used as research anchors: GitHub, website, X, LinkedIn, product pages. Leave omitted if unknown. */
  links?: string[];
}

interface BuilderProfile extends ProfileInput {
  updatedAt: string;
}

interface StrengthMatrixRow {
  category: string;
  score: number;
  confidence: number;
  energyFit: number;
  strategicRelevance: number;
  riskLoad: number;
  rationale: string;
  basis: "natural aptitude" | "learned competence" | "aspirational identity";
}

interface IdentityAnalysis {
  status: "idle" | "heuristic" | "tinyfish";
  title: string;
  archetypeStatement: string;
  identitySummary: string;
  archetypeTags: ArchetypeTag[];
  strengthTags: StrengthTag[];
  workFitTags: WorkFitTag[];
  riskTags: RiskTag[];
  moneyModeTags: MoneyModeTag[];
  strengthMatrix: StrengthMatrixRow[];
  evidence: LinkEvidence[];
  confidence: number;
  lastUpdatedAt: string;
}

interface MoneyPath {
  title: string;
  category: "fastest-path" | "compounding-path" | "hybrid-path" | "safe-path";
  fitScore: number;
  speedToMoney: number;
  marketDemand: number;
  sustainability: number;
  executionDifficulty: number;
  whyItFits: string;
  examples: string[];
  channels: string[];
  firstSteps: string[];
  risks: string[];
}

interface MarketResearch {
  status: "idle" | "heuristic" | "tinyfish";
  researchSummary: string;
  topPaths: MoneyPath[];
  avoidPaths: string[];
  nextMoves: string[];
  evidence: LinkEvidence[];
  lastUpdatedAt: string;
}

interface CompassSnapshot {
  productName: string;
  profile: BuilderProfile;
  identity: IdentityAnalysis;
  market: MarketResearch;
  apiKeyConfigured: boolean;
  readyState: {
    hasProfile: boolean;
    hasIdentity: boolean;
    hasMarket: boolean;
  };
}

interface TinyFishRunResponse {
  run_id?: string | null;
  error?: { message?: string } | null;
}

interface TinyFishTask {
  url: string;
  goal: string;
  browserProfile?: "lite" | "stealth";
}

export default class BuilderCompass {
  profile: BuilderProfile;
  identity: IdentityAnalysis;
  market: MarketResearch;

  constructor(private tinyfishApiKey: string) {
    const now = new Date().toISOString();
    this.profile = {
      name: "",
      headline: "",
      goalNow: "",
      recentWork: "",
      energizingWork: "",
      constraints: "",
      links: [],
      updatedAt: now,
    };
    this.identity = this._blankIdentity(now);
    this.market = this._blankMarket(now);
  }

  /**
   * Open the Builder Compass dashboard
   * @ui app
   */
  async main(): Promise<CompassSnapshot> {
    return this._snapshot();
  }

  /**
   * Save the builder profile that Builder Compass should reason from.
   *
   * MCP clients should treat this as the canonical capture contract:
   * infer as much as possible from memory and recent conversation,
   * ask the user only for missing high-value fields,
   * and pass factual signals rather than flattering summaries.
   *
   * IMPORTANT:
   * - Do not ask the user to retype facts the client already knows.
   * - Pass known fields immediately.
   * - Omit fields that are still unknown.
   * - If truly important fields are still missing, elicit only those.
   * - Calling this method again should refine the saved profile, not start over.
   *
   * The goal is to capture the smallest truthful self-model that still supports:
   * builder archetype classification,
   * work-fit analysis,
   * and market-path research.
   */
  async saveProfile(params: ProfileInput): Promise<CompassSnapshot> {
    const now = new Date().toISOString();
    const nextProfile: BuilderProfile = {
      name: (params.name ?? this.profile.name).trim(),
      headline: (params.headline ?? this.profile.headline).trim(),
      goalNow: (params.goalNow ?? this.profile.goalNow).trim(),
      recentWork: (params.recentWork ?? this.profile.recentWork).trim(),
      energizingWork: (params.energizingWork ?? this.profile.energizingWork).trim(),
      constraints: (params.constraints ?? this.profile.constraints).trim(),
      links: (params.links ?? this.profile.links ?? [])
        .map((link) => link.trim())
        .filter(Boolean)
        .slice(0, 6),
      updatedAt: now,
    };
    const previousComparable = JSON.stringify({
      name: this.profile.name,
      headline: this.profile.headline,
      goalNow: this.profile.goalNow,
      recentWork: this.profile.recentWork,
      energizingWork: this.profile.energizingWork,
      constraints: this.profile.constraints,
      links: this.profile.links,
    });
    const nextComparable = JSON.stringify({
      name: nextProfile.name,
      headline: nextProfile.headline,
      goalNow: nextProfile.goalNow,
      recentWork: nextProfile.recentWork,
      energizingWork: nextProfile.energizingWork,
      constraints: nextProfile.constraints,
      links: nextProfile.links,
    });
    const profileChanged = previousComparable !== nextComparable;

    this.profile = nextProfile;

    if (profileChanged) {
      this.identity = {
        ...this._blankIdentity(now),
        identitySummary:
          "Profile updated. Re-run Builder Compass to refresh your archetype, strengths, and risks from the new input.",
      };
      this.market = {
        ...this._blankMarket(now),
        researchSummary:
          "Profile updated. Re-run market research to rebuild the money paths for the new builder profile.",
      };
    }

    return this._snapshot();
  }

  /**
   * Analyze the builder's identity, strengths, work fit, and risks
   */
  async analyzeIdentity(): Promise<IdentityAnalysis> {
    const now = new Date().toISOString();
    this._ensureProfile();

    let next = this._heuristicIdentity(now);
    if (this._canUseTinyFish()) {
      next = await this._tinyfishIdentity(now).catch(() => next);
    }

    this.identity = next;
    return this.identity;
  }

  /**
   * Research how people with this profile are making money right now
   */
  async researchMarket(): Promise<MarketResearch> {
    const now = new Date().toISOString();
    this._ensureProfile();
    if (this.identity.status === "idle") {
      await this.analyzeIdentity();
    }

    let next = this._heuristicMarket(now);
    if (this._canUseTinyFish()) {
      next = await this._tinyfishMarket(now).catch(() => next);
    }

    this.market = next;
    return this.market;
  }

  /**
   * Run the full builder compass flow end to end
   */
  async runCompass(): Promise<CompassSnapshot> {
    await this.analyzeIdentity();
    await this.researchMarket();
    return this._snapshot();
  }

  /**
   * Structured strengths matrix for agents and dashboards
   * @format table
   */
  async strengthMatrix(): Promise<Array<Record<string, string | number>>> {
    if (this.identity.status === "idle") {
      await this.analyzeIdentity();
    }

    return this.identity.strengthMatrix.map((row) => ({
      category: row.category,
      score: row.score,
      confidence: row.confidence,
      energy_fit: row.energyFit,
      strategic_relevance: row.strategicRelevance,
      risk_load: row.riskLoad,
      basis: row.basis,
      rationale: row.rationale,
    }));
  }

  /**
   * Ranked money paths for this builder profile
   * @format table
   */
  async moneyPaths(): Promise<Array<Record<string, string | number>>> {
    if (this.market.status === "idle") {
      await this.researchMarket();
    }

    return this.market.topPaths.map((path) => ({
      title: path.title,
      category: path.category,
      fit_score: path.fitScore,
      speed_to_money: path.speedToMoney,
      market_demand: path.marketDemand,
      sustainability: path.sustainability,
      execution_difficulty: path.executionDifficulty,
      why_it_fits: path.whyItFits,
    }));
  }

  /**
   * Quick visual fit panel for the dashboard
   * @format panels
   */
  async fitOverview(): Promise<
    Array<{ label: string; value: number; note: string }>
  > {
    if (this.identity.status === "idle") {
      await this.analyzeIdentity();
    }

    const getAverage = (keys: StrengthTag[]) => {
      const rows = this.identity.strengthMatrix.filter((row) =>
        keys.some(
          (key) => row.category.toLowerCase().replace(/ /g, "-") === key,
        ),
      );
      if (rows.length === 0) return 0.5;
      return Number(
        (rows.reduce((sum, row) => sum + row.score, 0) / rows.length).toFixed(
          2,
        ),
      );
    };

    return [
      {
        label: "AI-native leverage",
        value: getAverage([
          "rapid-prototyping",
          "workflow-design",
          "integration",
        ]),
        note: "How naturally you seem to use agents and automation as force multipliers.",
      },
      {
        label: "Founder energy",
        value: getAverage(["product-intuition", "judgment", "communication"]),
        note: "Your appetite for ownership, wedge selection, and shipping toward market outcomes.",
      },
      {
        label: "Execution reliability",
        value: getAverage(["execution", "architecture", "systems-thinking"]),
        note: "Whether your ideas are likely to hold together once translated into work.",
      },
      {
        label: "Risk load",
        value: Number(
          (
            this.identity.strengthMatrix.reduce(
              (sum, row) => sum + row.riskLoad,
              0,
            ) / this.identity.strengthMatrix.length
          ).toFixed(2),
        ),
        note: "Higher means more pressure from distraction, inconsistency, or overextension.",
      },
    ];
  }

  /**
   * Full narrative guide for the user
   * @format markdown
   */
  async report(): Promise<string> {
    if (this.market.status === "idle") {
      await this.runCompass();
    }

    const top = this.market.topPaths[0];
    return [
      `# Builder Compass for ${this.profile.name || "this builder"}`,
      "",
      `## Identity snapshot`,
      "",
      `**Archetype:** ${this.identity.title}`,
      "",
      this.identity.identitySummary,
      "",
      `### Strongest profile tags`,
      "",
      ...this.identity.archetypeTags.map((tag) => `- ${this._labelize(tag)}`),
      "",
      `### Best immediate money path`,
      "",
      `**${top?.title || "No path scored yet"}**`,
      "",
      top ? top.whyItFits : "Run market research to score the best routes.",
      "",
      `### Recommended next moves`,
      "",
      ...this.market.nextMoves.map((step) => `- ${step}`),
      "",
      `### Paths to avoid`,
      "",
      ...this.market.avoidPaths.map((path) => `- ${path}`),
    ].join("\n");
  }

  private _snapshot(): CompassSnapshot {
    return {
      productName: "Builder Compass",
      profile: structuredClone(this.profile),
      identity: structuredClone(this.identity),
      market: structuredClone(this.market),
      apiKeyConfigured: this._canUseTinyFish(),
      readyState: {
        hasProfile: Boolean(
          this.profile.goalNow ||
          this.profile.recentWork ||
          this.profile.energizingWork,
        ),
        hasIdentity: this.identity.status !== "idle",
        hasMarket: this.market.status !== "idle",
      },
    };
  }

  private _blankIdentity(now: string): IdentityAnalysis {
    return {
      status: "idle",
      title: "Awaiting profile",
      archetypeStatement: "",
      identitySummary:
        "Add your profile so Builder Compass can classify your builder archetype.",
      archetypeTags: [],
      strengthTags: [],
      workFitTags: [],
      riskTags: [],
      moneyModeTags: [],
      strengthMatrix: [],
      evidence: [],
      confidence: 0,
      lastUpdatedAt: now,
    };
  }

  private _blankMarket(now: string): MarketResearch {
    return {
      status: "idle",
      researchSummary: "No market research has been run yet.",
      topPaths: [],
      avoidPaths: [],
      nextMoves: [],
      evidence: [],
      lastUpdatedAt: now,
    };
  }

  private _ensureProfile(): void {
    if (
      !this.profile.goalNow &&
      !this.profile.recentWork &&
      !this.profile.energizingWork
    ) {
      throw new Error("Save a profile first.");
    }
  }

  private _canUseTinyFish(): boolean {
    return Boolean(this.tinyfishApiKey);
  }

  private _heuristicIdentity(now: string): IdentityAnalysis {
    const corpus =
      `${this.profile.headline} ${this.profile.goalNow} ${this.profile.recentWork} ${this.profile.energizingWork} ${this.profile.constraints}`.toLowerCase();
    const strengthTags = new Set<StrengthTag>([
      "systems-thinking",
      "curiosity",
    ]);
    const workFitTags = new Set<WorkFitTag>([
      "workflow-automation",
      "prototype-work",
    ]);
    const riskTags = new Set<RiskTag>();
    const moneyModeTags = new Set<MoneyModeTag>(["consulting-sprints"]);
    const archetypeTags = new Set<ArchetypeTag>();
    const evidence: LinkEvidence[] = [];

    const addIf = <T>(condition: boolean, target: Set<T>, value: T) => {
      if (condition) target.add(value);
    };

    addIf(
      /agent|automation|mcp|workflow/.test(corpus),
      strengthTags,
      "workflow-design",
    );
    addIf(
      /agent|automation|mcp|workflow/.test(corpus),
      workFitTags,
      "workflow-automation",
    );
    addIf(
      /agent|automation|mcp|workflow/.test(corpus),
      archetypeTags,
      "agent-workflow-architect",
    );

    addIf(
      /product|user|wedge|market|pmf/.test(corpus),
      strengthTags,
      "product-intuition",
    );
    addIf(
      /product|user|wedge|market|pmf/.test(corpus),
      workFitTags,
      "hybrid-product-technical",
    );
    addIf(
      /product|user|wedge|market|pmf/.test(corpus),
      archetypeTags,
      "product-technical-translator",
    );

    addIf(
      /prototype|ship|hackathon|fast|quick/.test(corpus),
      strengthTags,
      "rapid-prototyping",
    );
    addIf(
      /prototype|ship|hackathon|fast|quick/.test(corpus),
      archetypeTags,
      "ai-augmented-solo-builder",
    );
    addIf(
      /prototype|ship|hackathon|fast|quick/.test(corpus),
      moneyModeTags,
      "template-productization",
    );

    addIf(
      /consult|client|implementation|service/.test(corpus),
      archetypeTags,
      "implementation-consultant",
    );
    addIf(
      /consult|client|implementation|service/.test(corpus),
      workFitTags,
      "consulting",
    );
    addIf(
      /consult|client|implementation|service/.test(corpus),
      moneyModeTags,
      "retainer-implementation",
    );

    addIf(
      /tool|developer|sdk|runtime|platform|photon/.test(corpus),
      archetypeTags,
      "developer-tools-builder",
    );
    addIf(
      /tool|developer|sdk|runtime|platform|photon/.test(corpus),
      workFitTags,
      "developer-tools",
    );
    addIf(
      /tool|developer|sdk|runtime|platform|photon/.test(corpus),
      moneyModeTags,
      "sell-tools",
    );

    addIf(
      /founder|startup|business|revenue|income/.test(corpus),
      archetypeTags,
      "prototype-driven-founder",
    );
    addIf(
      /founder|startup|business|revenue|income/.test(corpus),
      workFitTags,
      "founder-path",
    );
    addIf(
      /founder|startup|business|revenue|income/.test(corpus),
      moneyModeTags,
      "startup-wedge",
    );

    addIf(
      /teach|write|guide|community|explain/.test(corpus),
      strengthTags,
      "communication",
    );
    addIf(
      /teach|write|guide|community|explain/.test(corpus),
      workFitTags,
      "technical-education",
    );
    addIf(
      /teach|write|guide|community|explain/.test(corpus),
      moneyModeTags,
      "education-products",
    );

    addIf(/design|taste|ui|ux/.test(corpus), strengthTags, "design-taste");
    addIf(/research|deep|analyze/.test(corpus), strengthTags, "research");
    addIf(/integrate|connect|bridge/.test(corpus), strengthTags, "integration");
    addIf(/architect|system|infra/.test(corpus), strengthTags, "architecture");
    addIf(
      /market|distribution|audience/.test(corpus),
      strengthTags,
      "distribution",
    );
    addIf(/judgment|decide|strategy/.test(corpus), strengthTags, "judgment");
    addIf(/execute|finish|ship/.test(corpus), strengthTags, "execution");

    addIf(
      /too many|many ideas|scatter|different directions/.test(corpus),
      riskTags,
      "identity-diffusion",
    );
    addIf(
      /urgent|fast|many things|stretch/.test(corpus),
      riskTags,
      "overextension",
    );
    addIf(
      /new|explore|different ideas|possibilities/.test(corpus),
      riskTags,
      "novelty-chasing",
    );

    if (this.profile.links.some((link) => link.includes("github.com"))) {
      strengthTags.add("execution");
      evidence.push({
        label: "GitHub",
        url:
          this.profile.links.find((link) => link.includes("github.com")) || "",
        reason:
          "Public repositories suggest real shipping behavior, not only aspiration.",
      });
    }

    if (this.profile.links.some((link) => link.includes("linkedin.com"))) {
      evidence.push({
        label: "LinkedIn",
        url:
          this.profile.links.find((link) => link.includes("linkedin.com")) ||
          "",
        reason:
          "Professional profile helps ground role and credibility context.",
      });
    }

    const title = archetypeTags.has("prototype-driven-founder")
      ? "Prototype-driven founder with systems instincts"
      : archetypeTags.has("implementation-consultant")
        ? "High-agency implementation consultant in the making"
        : archetypeTags.has("developer-tools-builder")
          ? "Developer-tools builder with AI-native leverage"
          : "AI-augmented product-technical builder";

    const strengthMatrix = this._buildStrengthMatrix(
      Array.from(strengthTags),
      Array.from(riskTags),
      Array.from(workFitTags),
    );

    return {
      status: "heuristic",
      title,
      archetypeStatement: title,
      identitySummary:
        `Based on your profile, you look most aligned with ${Array.from(
          archetypeTags,
        )
          .map((tag) => this._labelize(tag).toLowerCase())
          .join(", ")} work. ` +
        `The strongest repeatable signals point toward ${Array.from(
          strengthTags,
        )
          .slice(0, 4)
          .map((tag) => this._labelize(tag).toLowerCase())
          .join(", ")}.`,
      archetypeTags: this._dedupe(
        Array.from(archetypeTags).length > 0
          ? Array.from(archetypeTags)
          : ["product-technical-translator", "ai-augmented-solo-builder"],
      ),
      strengthTags: this._dedupe(Array.from(strengthTags)),
      workFitTags: this._dedupe(Array.from(workFitTags)),
      riskTags: this._dedupe(
        Array.from(
          riskTags.size ? Array.from(riskTags) : ["weak-finish-loops"],
        ),
      ),
      moneyModeTags: this._dedupe(
        Array.from(moneyModeTags).length > 0
          ? Array.from(moneyModeTags)
          : ["consulting-sprints", "template-productization"],
      ),
      strengthMatrix,
      evidence,
      confidence: 0.71,
      lastUpdatedAt: now,
    };
  }

  private _heuristicMarket(now: string): MarketResearch {
    const workFit = new Set(this.identity.workFitTags);
    const moneyModes = new Set(this.identity.moneyModeTags);
    const paths: MoneyPath[] = [];

    const pushPath = (path: MoneyPath) => paths.push(path);

    if (
      workFit.has("consulting") ||
      moneyModes.has("retainer-implementation")
    ) {
      pushPath({
        title: "Agent workflow implementation sprints",
        category: "fastest-path",
        fitScore: 0.89,
        speedToMoney: 0.92,
        marketDemand: 0.78,
        sustainability: 0.71,
        executionDifficulty: 0.46,
        whyItFits:
          "This turns builder skill and systems taste into fast, scoped revenue without waiting for product traction.",
        examples: [
          "MCP integrations",
          "internal workflow copilots",
          "automation audits",
        ],
        channels: [
          "X / LinkedIn build-in-public",
          "warm intros",
          "founder communities",
        ],
        firstSteps: [
          "Package 2-3 fixed offers",
          "Publish one sharp case study",
          "Offer a 1-week sprint",
        ],
        risks: ["Custom work can sprawl", "Need tight scope control"],
      });
    }

    if (workFit.has("developer-tools") || moneyModes.has("sell-tools")) {
      pushPath({
        title: "Niche developer tool with audience-led distribution",
        category: "compounding-path",
        fitScore: 0.83,
        speedToMoney: 0.49,
        marketDemand: 0.75,
        sustainability: 0.88,
        executionDifficulty: 0.67,
        whyItFits:
          "A focused tool aligns with technical credibility and compounds into durable reputation if the wedge is sharp.",
        examples: [
          "Photon add-ons",
          "agent debugging tools",
          "workflow visibility tooling",
        ],
        channels: ["GitHub", "dev communities", "technical writing"],
        firstSteps: [
          "Pick one painful wedge",
          "Ship a public MVP",
          "Collect 5 users before broadening",
        ],
        risks: [
          "Slow monetization if positioning is vague",
          "Can become hobbyware",
        ],
      });
    }

    if (
      workFit.has("technical-education") ||
      moneyModes.has("education-products")
    ) {
      pushPath({
        title: "Teach through implementation assets",
        category: "hybrid-path",
        fitScore: 0.74,
        speedToMoney: 0.63,
        marketDemand: 0.66,
        sustainability: 0.72,
        executionDifficulty: 0.44,
        whyItFits:
          "If your edge includes explanation and synthesis, templates, teardown guides, or workshops can monetize quickly.",
        examples: [
          "Agent workflow teardown packs",
          "builder strategy playbooks",
          "implementation workshops",
        ],
        channels: ["Newsletter", "creator platforms", "cohort communities"],
        firstSteps: [
          "Package one repeatable lesson",
          "Turn a real project into a case study",
          "Sell a small paid asset first",
        ],
        risks: [
          "Can drift into content without moat",
          "Needs specificity to convert",
        ],
      });
    }

    pushPath({
      title: "Hybrid builder-consultant path",
      category: "safe-path",
      fitScore: 0.81,
      speedToMoney: 0.78,
      marketDemand: 0.74,
      sustainability: 0.79,
      executionDifficulty: 0.51,
      whyItFits:
        "Combining small consulting revenue with one compounding product lets you de-risk experimentation without losing upside.",
      examples: [
        "Paid implementation plus internal tooling",
        "Consulting funded product wedge",
      ],
      channels: ["Warm network", "public prototypes", "operator communities"],
      firstSteps: [
        "Choose one service and one product wedge",
        "Set weekly split",
        "Avoid building three products at once",
      ],
      risks: ["Context switching", "Product never gets enough depth"],
    });

    const topPaths = paths.sort((a, b) => b.fitScore - a.fitScore);

    return {
      status: "heuristic",
      researchSummary:
        "Builder Compass combined your inferred archetype with common monetization patterns for AI-native builders. The highest-probability routes favor speed-to-proof, then compounding assets.",
      topPaths,
      avoidPaths: [
        "Generic “AI agency” positioning with no niche",
        "Long product build with no user validation",
        "Prestige roles that remove autonomy and product ownership",
      ],
      nextMoves: [
        "Choose one money path to test for the next 30 days.",
        "Turn one real project into a public proof asset.",
        "Use outreach or content to validate demand before broadening the offer.",
      ],
      evidence: [
        {
          label: "Profile-model synthesis",
          url: this.profile.links[0] || "local://profile",
          reason:
            "Your current profile suggests hybrid builder + strategy value rather than pure commodity implementation.",
        },
      ],
      lastUpdatedAt: now,
    };
  }

  private async _tinyfishIdentity(now: string): Promise<IdentityAnalysis> {
    const heuristic = this._heuristicIdentity(now);
    const researchContext = [
      `You are classifying an AI-native builder.`,
      `Use only evidence visible from the current page and the provided builder context.`,
      `Return STRICT JSON with keys: title, identitySummary, archetypeTags, strengthTags, workFitTags, riskTags, moneyModeTags, evidence.`,
      `Allowed archetype tags: ${this._allTags<ArchetypeTag>([
        "ai-augmented-solo-builder",
        "agent-workflow-architect",
        "developer-tools-builder",
        "high-agency-integrator",
        "implementation-consultant",
        "product-technical-translator",
        "prototype-driven-founder",
        "systems-minded-operator",
      ])}.`,
      `Allowed strength tags: ${this._allTags<StrengthTag>([
        "ambiguity-tolerance",
        "architecture",
        "communication",
        "curiosity",
        "design-taste",
        "distribution",
        "execution",
        "integration",
        "judgment",
        "product-intuition",
        "rapid-prototyping",
        "research",
        "systems-thinking",
        "workflow-design",
      ])}.`,
      `Allowed work fit tags: ${this._allTags<WorkFitTag>([
        "ai-application-engineering",
        "consulting",
        "developer-tools",
        "founder-path",
        "hybrid-product-technical",
        "implementation-work",
        "indie-hacking",
        "prototype-work",
        "technical-education",
        "workflow-automation",
      ])}.`,
      `Allowed risk tags: ${this._allTags<RiskTag>([
        "ai-overreliance",
        "identity-diffusion",
        "novelty-chasing",
        "overextension",
        "prestige-chasing",
        "weak-finish-loops",
      ])}.`,
      `Allowed money mode tags: ${this._allTags<MoneyModeTag>([
        "audience-plus-product",
        "consulting-sprints",
        "education-products",
        "retainer-implementation",
        "sell-tools",
        "startup-wedge",
        "template-productization",
      ])}.`,
      `Builder name: ${this.profile.name}`,
      `Headline: ${this.profile.headline}`,
      `Goal now: ${this.profile.goalNow}`,
      `Recent work: ${this.profile.recentWork}`,
      `Energizing work: ${this.profile.energizingWork}`,
      `Constraints: ${this.profile.constraints}`,
    ].join("\n");
    const identityTasks: TinyFishTask[] = [
      ...this.profile.links.slice(0, 2).map((link) => ({
        url: link,
        goal: `${researchContext}\nExtract builder evidence from this link and map it to the allowed tags.`,
        browserProfile: this._browserProfileForUrl(link),
      })),
      {
        url: `https://duckduckgo.com/?q=${encodeURIComponent(
          `${this.profile.name} ${this.profile.headline} ${this.profile.recentWork}`.trim(),
        )}`,
        goal: `${researchContext}\nUse search results to find external evidence that supports or corrects the builder profile.`,
        browserProfile: "lite",
      },
    ];

    const parsed = this._mergeIdentityFindings(
      await this._runTinyFishTasks(identityTasks),
      heuristic,
    );
    return {
      ...heuristic,
      status: "tinyfish",
      title: String(parsed.title || "TinyFish builder profile"),
      identitySummary: String(
        parsed.identitySummary ||
          "TinyFish returned a builder profile summary.",
      ),
      archetypeTags: this._filterAllowed<ArchetypeTag>(parsed.archetypeTags, [
        "ai-augmented-solo-builder",
        "agent-workflow-architect",
        "developer-tools-builder",
        "high-agency-integrator",
        "implementation-consultant",
        "product-technical-translator",
        "prototype-driven-founder",
        "systems-minded-operator",
      ]),
      strengthTags: this._filterAllowed<StrengthTag>(parsed.strengthTags, [
        "ambiguity-tolerance",
        "architecture",
        "communication",
        "curiosity",
        "design-taste",
        "distribution",
        "execution",
        "integration",
        "judgment",
        "product-intuition",
        "rapid-prototyping",
        "research",
        "systems-thinking",
        "workflow-design",
      ]),
      workFitTags: this._filterAllowed<WorkFitTag>(parsed.workFitTags, [
        "ai-application-engineering",
        "consulting",
        "developer-tools",
        "founder-path",
        "hybrid-product-technical",
        "implementation-work",
        "indie-hacking",
        "prototype-work",
        "technical-education",
        "workflow-automation",
      ]),
      riskTags: this._filterAllowed<RiskTag>(parsed.riskTags, [
        "ai-overreliance",
        "identity-diffusion",
        "novelty-chasing",
        "overextension",
        "prestige-chasing",
        "weak-finish-loops",
      ]),
      moneyModeTags: this._filterAllowed<MoneyModeTag>(parsed.moneyModeTags, [
        "audience-plus-product",
        "consulting-sprints",
        "education-products",
        "retainer-implementation",
        "sell-tools",
        "startup-wedge",
        "template-productization",
      ]),
      evidence: this._normalizeEvidence(parsed.evidence),
      strengthMatrix: this._buildStrengthMatrix(
        this._filterAllowed<StrengthTag>(parsed.strengthTags, [
          "ambiguity-tolerance",
          "architecture",
          "communication",
          "curiosity",
          "design-taste",
          "distribution",
          "execution",
          "integration",
          "judgment",
          "product-intuition",
          "rapid-prototyping",
          "research",
          "systems-thinking",
          "workflow-design",
        ]),
        this._filterAllowed<RiskTag>(parsed.riskTags, [
          "ai-overreliance",
          "identity-diffusion",
          "novelty-chasing",
          "overextension",
          "prestige-chasing",
          "weak-finish-loops",
        ]),
        this._filterAllowed<WorkFitTag>(parsed.workFitTags, [
          "ai-application-engineering",
          "consulting",
          "developer-tools",
          "founder-path",
          "hybrid-product-technical",
          "implementation-work",
          "indie-hacking",
          "prototype-work",
          "technical-education",
          "workflow-automation",
        ]),
      ),
      confidence: 0.82,
      lastUpdatedAt: now,
    };
  }

  private async _tinyfishMarket(now: string): Promise<MarketResearch> {
    const heuristic = this._heuristicMarket(now);
    const marketPrompt = [
      `Research how people with this builder profile are making money right now on the open web.`,
      `Return STRICT JSON with keys: researchSummary, topPaths, avoidPaths, nextMoves, evidence.`,
      `Each topPaths item must include: title, category, fitScore, speedToMoney, marketDemand, sustainability, executionDifficulty, whyItFits, examples, channels, firstSteps, risks.`,
      `Allowed categories: fastest-path, compounding-path, hybrid-path, safe-path.`,
      `Builder archetype tags: ${this.identity.archetypeTags.join(", ")}`,
      `Strength tags: ${this.identity.strengthTags.join(", ")}`,
      `Work fit tags: ${this.identity.workFitTags.join(", ")}`,
      `Money mode tags: ${this.identity.moneyModeTags.join(", ")}`,
      `Goal now: ${this.profile.goalNow}`,
      `Recent work: ${this.profile.recentWork}`,
      `Constraints: ${this.profile.constraints}`,
      `Links: ${this.profile.links.join(", ") || "none"}`,
      `Prioritize current, internet-visible routes with evidence.`,
    ].join("\n");
    const marketTasks: TinyFishTask[] = [
      {
        url: `https://duckduckgo.com/?q=${encodeURIComponent(
          `${this.identity.archetypeTags.join(" ")} how to make money consulting productized service`,
        )}`,
        goal: `${marketPrompt}\nFind service-based monetization paths and return only grounded paths.`,
        browserProfile: "lite",
      },
      {
        url: `https://duckduckgo.com/?q=${encodeURIComponent(
          `${this.identity.archetypeTags.join(" ")} indie hacker product revenue examples`,
        )}`,
        goal: `${marketPrompt}\nFind product and audience-led monetization paths with visible examples.`,
        browserProfile: "lite",
      },
    ];

    const parsed = this._mergeMarketFindings(
      await this._runTinyFishTasks(marketTasks),
      heuristic,
    );

    return {
      status: "tinyfish",
      researchSummary: String(
        parsed.researchSummary || heuristic.researchSummary,
      ),
      topPaths:
        Array.isArray(parsed.topPaths) && parsed.topPaths.length > 0
          ? parsed.topPaths.slice(0, 5).map((item: any) => ({
              title: String(item.title || "Untitled path"),
              category: this._allowedPathCategory(
                String(item.category || "hybrid-path"),
              ),
              fitScore: this._toUnit(item.fitScore, 0.7),
              speedToMoney: this._toUnit(item.speedToMoney, 0.6),
              marketDemand: this._toUnit(item.marketDemand, 0.6),
              sustainability: this._toUnit(item.sustainability, 0.65),
              executionDifficulty: this._toUnit(item.executionDifficulty, 0.5),
              whyItFits: String(item.whyItFits || ""),
              examples: this._stringArray(item.examples),
              channels: this._stringArray(item.channels),
              firstSteps: this._stringArray(item.firstSteps),
              risks: this._stringArray(item.risks),
            }))
          : heuristic.topPaths,
      avoidPaths: this._stringArray(parsed.avoidPaths).slice(0, 5),
      nextMoves: this._stringArray(parsed.nextMoves).slice(0, 6),
      evidence: this._normalizeEvidence(parsed.evidence),
      lastUpdatedAt: now,
    };
  }

  private _browserProfileForUrl(url: string): "lite" | "stealth" {
    return /linkedin\.com|x\.com|twitter\.com/i.test(url) ? "stealth" : "lite";
  }

  private async _runTinyFishTasks(tasks: TinyFishTask[]): Promise<any[]> {
    const runIds = (
      await Promise.all(
        tasks.map(async (task) => {
          const response = await fetch(
            "https://agent.tinyfish.ai/v1/automation/run-async",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-API-Key": this.tinyfishApiKey,
              },
              body: JSON.stringify({
                url: task.url,
                goal: `${task.goal}\nRespond in strict JSON only.`,
                browser_profile: task.browserProfile || "lite",
                api_integration: "builder-compass",
              }),
            },
          );

          if (!response.ok) {
            throw new Error(`TinyFish run failed with ${response.status}`);
          }

          const started = (await response.json()) as TinyFishRunResponse;
          if (!started.run_id) {
            throw new Error(
              started.error?.message || "TinyFish did not return a run ID",
            );
          }
          return started.run_id;
        }),
      )
    ).filter(Boolean) as string[];

    return this._pollTinyFishRuns(runIds);
  }

  private async _pollTinyFishRuns(runIds: string[]): Promise<any[]> {
    for (let attempt = 0; attempt < 12; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await fetch(
        "https://agent.tinyfish.ai/v1/runs/batch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": this.tinyfishApiKey,
          },
          body: JSON.stringify({ run_ids: runIds }),
        },
      );

      if (!response.ok) {
        continue;
      }

      const payload = (await response.json()) as Record<string, any>;
      const runs = Array.isArray(payload.data) ? payload.data : [];
      if (runs.length === 0) continue;
      const finished = runs.filter(
        (run) => run.status === "COMPLETED",
      );
      const failed = runs.filter(
        (run) => run.status === "FAILED" || run.status === "CANCELLED",
      );
      if (failed.length > 0 && finished.length === 0) {
        throw new Error(
          failed[0]?.error?.message || `TinyFish run ${failed[0]?.status}`,
        );
      }
      if (finished.length === runIds.length || attempt === 11) {
        return finished.map((run) =>
          this._extractJson(run.result || run.resultJson || run),
        );
      }
    }

    throw new Error("TinyFish runs timed out");
  }

  private _extractJson(value: any): any {
    if (typeof value === "object" && value !== null) {
      return value;
    }

    const text = String(value || "").trim();
    try {
      return JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) {
        throw new Error("TinyFish result did not contain JSON");
      }
      return JSON.parse(match[0]);
    }
  }

  private _buildStrengthMatrix(
    strengths: StrengthTag[],
    risks: RiskTag[],
    workFits: WorkFitTag[],
  ): StrengthMatrixRow[] {
    const has = (value: StrengthTag) => strengths.includes(value);
    const riskBias = risks.length * 0.03;
    const founderBias = workFits.includes("founder-path") ? 0.08 : 0;

    const rows: StrengthMatrixRow[] = [
      this._row(
        "Systems thinking",
        has("systems-thinking") ? 0.87 : 0.68,
        0.78,
        has("systems-thinking") ? 0.82 : 0.61,
        0.92,
        0.28 + riskBias,
        "You appear to naturally reason in systems, flows, and interdependencies.",
        has("systems-thinking") ? "natural aptitude" : "learned competence",
      ),
      this._row(
        "Product intuition",
        has("product-intuition") ? 0.84 : 0.58,
        0.74,
        has("product-intuition") ? 0.86 : 0.57,
        0.93,
        0.24 + founderBias,
        "You seem to notice wedge, user friction, and leverage rather than only implementation detail.",
        has("product-intuition") ? "natural aptitude" : "learned competence",
      ),
      this._row(
        "Rapid prototyping",
        has("rapid-prototyping") ? 0.91 : 0.63,
        0.8,
        has("rapid-prototyping") ? 0.9 : 0.66,
        0.88,
        0.42 + riskBias,
        "You likely generate momentum by making things tangible quickly.",
        has("rapid-prototyping") ? "natural aptitude" : "learned competence",
      ),
      this._row(
        "Execution consistency",
        has("execution") ? 0.71 : 0.49,
        0.58,
        has("execution") ? 0.68 : 0.45,
        0.9,
        risks.includes("weak-finish-loops") ? 0.72 : 0.44,
        "Sustained finishing loops are often the difference between leverage and drift.",
        has("execution") ? "learned competence" : "aspirational identity",
      ),
      this._row(
        "Communication",
        has("communication") ? 0.82 : 0.59,
        0.72,
        has("communication") ? 0.78 : 0.54,
        0.82,
        0.22 + founderBias,
        "Clear articulation increases distribution, trust, and founder/consulting leverage.",
        has("communication") ? "learned competence" : "aspirational identity",
      ),
      this._row(
        "Judgment",
        has("judgment") ? 0.76 : 0.55,
        0.63,
        has("judgment") ? 0.73 : 0.52,
        0.92,
        0.39 + riskBias,
        "Judgment is what keeps speed and AI leverage from turning into incoherence.",
        has("judgment") ? "natural aptitude" : "learned competence",
      ),
    ];

    return rows;
  }

  private _row(
    category: string,
    score: number,
    confidence: number,
    energyFit: number,
    strategicRelevance: number,
    riskLoad: number,
    rationale: string,
    basis: StrengthMatrixRow["basis"],
  ): StrengthMatrixRow {
    return {
      category,
      score: Number(score.toFixed(2)),
      confidence: Number(confidence.toFixed(2)),
      energyFit: Number(energyFit.toFixed(2)),
      strategicRelevance: Number(strategicRelevance.toFixed(2)),
      riskLoad: Number(Math.min(1, riskLoad).toFixed(2)),
      rationale,
      basis,
    };
  }

  private _normalizeEvidence(items: any): LinkEvidence[] {
    if (!Array.isArray(items)) return [];
    return items
      .map((item) => ({
        label: String(item.label || "Source"),
        url: String(item.url || ""),
        reason: String(item.reason || item.note || ""),
      }))
      .filter((item) => item.url)
      .slice(0, 6);
  }

  private _filterAllowed<T extends string>(values: any, allowed: T[]): T[] {
    if (!Array.isArray(values)) return [];
    return this._dedupe(
      values
        .map(String)
        .filter((value): value is T => allowed.includes(value as T)),
    );
  }

  private _stringArray(value: any): string[] {
    if (!Array.isArray(value)) return [];
    return this._dedupe(
      value.map((item) => String(item).trim()).filter(Boolean),
    );
  }

  private _toUnit(value: any, fallback: number): number {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) {
      if (numeric > 1) return Number(Math.min(1, numeric / 100).toFixed(2));
      return Number(Math.max(0, Math.min(1, numeric)).toFixed(2));
    }
    return fallback;
  }

  private _allowedPathCategory(value: string): MoneyPath["category"] {
    if (
      value === "fastest-path" ||
      value === "compounding-path" ||
      value === "hybrid-path" ||
      value === "safe-path"
    ) {
      return value;
    }
    return "hybrid-path";
  }

  private _labelize(value: string): string {
    return value
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  private _dedupe<T>(items: T[]): T[] {
    return Array.from(new Set(items));
  }

  private _allTags<T extends string>(items: T[]): string {
    return items.join(", ");
  }

  private _mergeIdentityFindings(
    findings: any[],
    fallback: IdentityAnalysis,
  ): any {
    const merged = {
      title: "",
      identitySummary: "",
      archetypeTags: [] as string[],
      strengthTags: [] as string[],
      workFitTags: [] as string[],
      riskTags: [] as string[],
      moneyModeTags: [] as string[],
      evidence: [] as any[],
    };
    for (const finding of findings) {
      if (!finding || typeof finding !== "object") continue;
      if (!merged.title && finding.title) merged.title = String(finding.title);
      if (!merged.identitySummary && finding.identitySummary) {
        merged.identitySummary = String(finding.identitySummary);
      }
      merged.archetypeTags.push(...this._stringArray(finding.archetypeTags));
      merged.strengthTags.push(...this._stringArray(finding.strengthTags));
      merged.workFitTags.push(...this._stringArray(finding.workFitTags));
      merged.riskTags.push(...this._stringArray(finding.riskTags));
      merged.moneyModeTags.push(...this._stringArray(finding.moneyModeTags));
      if (Array.isArray(finding.evidence)) merged.evidence.push(...finding.evidence);
    }

    return {
      title: merged.title || fallback.title,
      identitySummary: merged.identitySummary || fallback.identitySummary,
      archetypeTags: merged.archetypeTags,
      strengthTags: merged.strengthTags,
      workFitTags: merged.workFitTags,
      riskTags: merged.riskTags,
      moneyModeTags: merged.moneyModeTags,
      evidence: merged.evidence,
    };
  }

  private _mergeMarketFindings(
    findings: any[],
    fallback: MarketResearch,
  ): any {
    const topPaths: any[] = [];
    const avoidPaths: string[] = [];
    const nextMoves: string[] = [];
    const evidence: any[] = [];
    let researchSummary = "";

    for (const finding of findings) {
      if (!finding || typeof finding !== "object") continue;
      if (!researchSummary && finding.researchSummary) {
        researchSummary = String(finding.researchSummary);
      }
      if (Array.isArray(finding.topPaths)) topPaths.push(...finding.topPaths);
      avoidPaths.push(...this._stringArray(finding.avoidPaths));
      nextMoves.push(...this._stringArray(finding.nextMoves));
      if (Array.isArray(finding.evidence)) evidence.push(...finding.evidence);
    }

    const dedupedPaths = topPaths
      .map((path) => ({
        ...path,
        title: String(path.title || "Untitled path"),
      }))
      .filter((path, index, arr) =>
        arr.findIndex((item) => item.title === path.title) === index,
      );

    return {
      researchSummary: researchSummary || fallback.researchSummary,
      topPaths: dedupedPaths,
      avoidPaths,
      nextMoves,
      evidence,
    };
  }
}
