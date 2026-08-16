import type { Project } from "./types";

/**
 * Selected work.
 *
 * Rules applied throughout this file:
 *  • No result, metric, finding or client outcome is stated unless it was
 *    supplied. Where a write-up exists offline but was not provided, the
 *    section is marked `pending` and renders as an honest note.
 *  • `thesis` and `summary` describe the *question the work asks*, which is
 *    derivable from the brief. They never assert an answer.
 *  • `weight` drives layout, not importance ranking alone:
 *      flagship → full-width editorial treatment + its own Research section
 *      featured → wide two-column card
 *      standard → grid card
 */

export const projects: Project[] = [
  {
    slug: "quiet-compound",
    title: "Quiet Compound",
    category: "Personal Finance · Shipped Product",
    kind: "product",
    status: "Live product",
    weight: "flagship",
    year: "2026",
    summary:
      "A local-first trading journal and personal finance tracker. Your data stays on your device and syncs privately only if you choose to sign in.",
    thesis:
      "A trading journal only works if you are honest in it, and people are not honest in tools they do not trust. So the architecture became the product decision: entries are written to your own device by default and sync to a private account only if you sign in. The interface is a paper folio rather than a dashboard — ruled lines, handwriting, a folio number, a 'reviewed' stamp — because the habit worth building is reflection, not more screen-watching.",
    methods: [
      "Product design",
      "Local-first architecture",
      "Trading journal",
      "Personal finance",
      "AI-assisted development",
      "Vercel",
    ],
    image: "/work/quiet-compound.png",
    imageAlt:
      "Quiet Compound's entry screen: a ruled paper folio with a handwritten trade entry on the left, and a sign-in panel showing live NSE market status on the right.",
    imageMobile: "/work/quiet-compound-mobile.png",
    externalUrl: "https://quiet-compound.vercel.app",
    externalLabel: "Open the live app",
    caseStudy: [
      {
        heading: "What it does",
        body: [
          "Trades and money in one journal: log an entry, record the thesis behind it, and come back to review what actually happened. Live NSE market status sits alongside the sign-in, so the app knows whether the market is open before you do.",
          "It is local-first by default. Data is written to your device, and only reaches a private account if you sign in — a deliberate stance for a tool whose entire value depends on being told the truth.",
        ],
      },
      {
        heading: "Why it looks like a notebook",
        body: [
          "Almost every trading tool is a dashboard, and dashboards reward watching. A journal rewards reviewing. The folio treatment — ruled paper, a handwritten entry, a folio number, a 'reviewed' stamp, a line reading \"no FOMO · no revenge\" — is there to set the behaviour the product is actually trying to encourage.",
        ],
      },
      {
        heading: "Build, stack and the hard parts",
        pending: true,
        body: [
          "[ADD BUILD DETAIL — stack, how local-first sync was implemented, what proved hardest, further screenshots]",
        ],
      },
      {
        heading: "What I'd change",
        pending: true,
        body: ["[ADD RETROSPECTIVE — what you would do differently next time]"],
      },
    ],
  },

  {
    slug: "reminderpro",
    title: "ReminderPro",
    category: "Productivity · Shipped Product",
    kind: "product",
    status: "Personal product",
    weight: "featured",
    year: "2026",
    summary:
      "A reminders app for daily tasks, designed so that adding and managing a reminder stays fast.",
    thesis:
      "A reminder app only earns its place if capturing a reminder is faster than the thought that prompted it. The interface was kept deliberately plain for exactly that reason — nearly all of the value sits in how little friction there is between opening the app and being finished with it.",
    methods: ["Product design", "Productivity", "AI-assisted development"],
    caseStudy: [
      {
        heading: "The design constraint",
        body: [
          "Keep it simple enough that adding and managing a reminder is quick. Every feature considered had to justify itself against the cost of another step between intention and done.",
        ],
      },
      {
        heading: "Build detail and current state",
        pending: true,
        body: [
          "[ADD BUILD DETAIL — stack, current state, whether it is deployed anywhere, screenshots]",
        ],
      },
    ],
  },

  {
    slug: "agentic-ai-global-logistics",
    title: "Agentic AI in Global Logistics",
    category: "Agentic AI · Shipping",
    kind: "research",
    status: "Flagship research",
    weight: "featured",
    diagram: "agentic-framework",
    year: "[ADD YEAR]",
    summary:
      "Analysing the role of agentic AI in global logistics, with special reference to the shipping sector.",
    thesis:
      "Logistics has spent a decade getting better at seeing itself — sensors, tracking, dashboards. Agentic AI proposes something different: systems that hold a goal, plan against it and act, rather than reporting a status and waiting for a human. This study asks what that shift means for the shipping sector specifically, where decisions are slow, capital-heavy, jurisdictionally tangled and unusually exposed to disruption.",
    methods: [
      "Agentic AI",
      "Global supply chain",
      "Maritime & shipping",
      "Decision automation",
      "Secondary research",
    ],
    caseStudy: [
      {
        heading: "Why the shipping sector",
        body: [
          "Roughly four-fifths of world merchandise trade by volume moves by sea (UNCTAD, Review of Maritime Transport). That makes shipping the clearest test case for autonomous decision-making in logistics: the volumes are enormous, the coordination problem spans dozens of independent actors — carriers, ports, customs authorities, freight forwarders, insurers — and no single party holds the whole picture.",
          "It is also a sector where the cost of a wrong decision is legible. A misrouted vessel, a missed berth window or a mispriced charter shows up directly in fuel, demurrage and schedule reliability. That legibility is what makes it a useful place to ask whether an autonomous system can be trusted with a decision at all.",
        ],
      },
      {
        heading: "The questions the study is built around",
        points: [
          "Where does agentic AI differ meaningfully from the predictive and optimisation models logistics already uses?",
          "Which decisions in the shipping workflow are genuinely delegable, and which are structurally not?",
          "What has to be true — data, integration, governance, liability — before an agent can act rather than recommend?",
          "How does accountability work when an autonomous system commits a firm to a commercial position?",
          "What does adoption look like realistically, given the sector's fragmentation and its installed base?",
        ],
      },
      {
        heading: "Approach",
        body: [
          "The work is structured as secondary research: building a picture of the current state of AI in maritime logistics from published literature, industry reporting and vendor documentation, then testing the concept of agency against that picture rather than against a general narrative about AI.",
        ],
      },
      {
        heading: "The published record as of August 2026",
        body: [
          "This is the sourced landscape the study reads against. Nothing in this section is a finding of the study — every statement below is attributed to its publisher, and the study's own analysis is still unwritten and marked as such further down this page.",
        ],
        points: [
          "The IMO adopted the first global Code for autonomous ships on 22 May 2026 (MSC 111, resolution MSC.595(111)), effective 1 July 2026 as a non-mandatory instrument. It defines four degrees of autonomy, from decision support to full autonomy, and holds that the master retains overall responsibility for the ship at all times — even when not on board. Passenger ships were deliberately excluded as too complex on safety and liability grounds. A mandatory version is targeted for 1 July 2030.",
          "In 2024, seaborne trade grew 2.2% by volume but 5.9% in ton-miles — nearly three times faster — because of vessel rerouting around the Suez Canal and the Red Sea (UNCTAD). The amount of routing work decoupled from the amount of cargo.",
          "On 4 June 2026, five electronic bill of lading platforms — CargoX, edoxOnline, TradeGo, WaveBL and eTEU — implemented DCSA's Standard Annex for eBL Platform Interoperability v.2, each approved by the International Group of P&I Clubs. It is the first multilateral framework, replacing bilateral platform-to-platform connections.",
          "Shipping's overall digital maturity measures 2.1 out of 4, and data standardisation 2.45 out of 4, on Lloyd's Register's Digital Maturity Index. LR and OneOcean warn that without consistent governance and verification, automated systems risk amplifying inaccuracies rather than delivering operational insight (18 March 2026).",
          "Maritime AI activity nearly doubled in a year: 420 organisations active in maritime AI development, up from 276, with the market at USD 4.13bn in 2024 against USD 1.47bn the year before (Thetius for Lloyd's Register).",
          "Gartner predicts more than 40% of agentic AI projects will be cancelled by the end of 2027, citing escalating costs, unclear business value and inadequate risk controls. This is a cross-sector forecast, not a maritime one (25 June 2025).",
        ],
        sources: [
          {
            label: "IMO — MSC 111 adopts the MASS Code, 22 May 2026",
            href: "https://www.imo.org/en/mediacentre/pressbriefings/pages/imo-adopts-mass-code.aspx",
          },
          {
            label: "UNCTAD — Review of Maritime Transport 2025, 24 September 2025",
            href: "https://unctad.org/news/maritime-trade-under-pressure-growth-set-stall-2025",
          },
          {
            label: "DCSA — Five eBL platforms adopt the interoperability annex, 4 June 2026",
            href: "https://dcsa.org/newsroom/five-ebl-platforms-adopt-dcsa-interoperability-annex",
          },
          {
            label: "Lloyd's Register / OneOcean — Mastering maritime data, 18 March 2026",
            href: "https://smartmaritimenetwork.com/2026/03/18/report-warns-shipping-must-master-data-to-remain-competitive/",
          },
          { label: "Thetius for Lloyd's Register — Beyond the Horizon" },
          {
            label: "Gartner — Over 40% of agentic AI projects will be cancelled by end of 2027, 25 June 2025",
            href: "https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027",
          },
        ],
      },
      {
        heading: "Where the line between advisory and agentic currently falls",
        body: [
          "The clearest published instance of an agent that acts rather than advises in maritime is ZeroNorth's Propel, launched 4 August 2026. It generates a voyage plan, communicates directly with the vessel's master, incorporates the master's feedback and updates the plan as conditions change, within operator-defined boundaries. It is in early access with Cargill, Ultrabulk and CMB.TECH.",
          "Landside logistics is further along. project44's Movement platform describes agents that book shipments and perform reroutes, and in April 2026 it acquired LunaPath.ai for its 50-plus agents covering carrier check calls, proof-of-delivery retrieval and claims initiation. Flexport's 2026 Winter Release is the useful counter-example: its customs-audit and container-consolidation agents are described on Flexport's own release page as producing recommendations for approval and execution — human-approved, not autonomous — while third-party coverage described them as more autonomous than that wording supports.",
          "The distance between the label and the described capability is why the framing diagram above separates what the system can see from where agency is claimed. Reading a vendor's own release page against its press coverage is part of the method, not an aside.",
        ],
        sources: [
          {
            label: "The Maritime Executive — ZeroNorth introduces Propel, 4 August 2026",
            href: "https://maritime-executive.com/corporate/zeronorth-introduces-propel-a-new-agentic-ai-partner-for-maritime-operations",
          },
          {
            label: "FreightWaves — project44 acquires LunaPath.ai, 8 April 2026",
            href: "https://www.freightwaves.com/news/project44-acquires-lunapath-ai-to-accelerate-ai-agent-orchestration-across-global-supply-chains",
          },
          {
            label: "Flexport — 2026 Winter Release",
            href: "https://www.flexport.com/technology/product-release/winter-2026/",
          },
        ],
      },
      {
        heading: "The open questions, as the industry states them",
        body: [
          "These are questions currently unresolved in the published record. The study's contribution is to work through them for the shipping sector specifically; none of them is answered here.",
        ],
        points: [
          "When an agent acts, who is liable? The MASS Code holds the master responsible at all times, even when not on board, but does not resolve attribution between human error and system failure. The International Group of P&I Clubs has confirmed liabilities from autonomous vessels can fall within its shared pooling arrangements — but liabilities arising inside a shore-based Remote Operations Centre are not marine P&I risks at all.",
          "Can general-purpose language models work in shipping, or does the sector need domain-specific models? Veson Nautical's CCO argues shipping's jargon, contracts and processes are largely absent from general training corpora (Lloyd's List, 17 June 2026).",
          "Will agents amplify bad data rather than fix it? Lloyd's Register and OneOcean state this risk directly, with data standardisation measured at 2.45 out of 4.",
          "Will interoperability arrive fast enough to be agent-actionable? The DCSA multilateral eBL framework and the IMO Digitalization Strategy are both 2026 events — the plumbing an agent would need is only now being laid.",
          "What is the workforce and certification pathway? The MASS Code defers training and certification for Remote Operations Centre personnel to its experience-building phase.",
        ],
        sources: [
          {
            label: "gCaptain — IMO adopts MASS Code, 1 June 2026",
            href: "https://gcaptain.com/imo-adopts-mass-code-the-autonomous-ship-moves-from-drawing-board-to-regulated-reality/",
          },
          {
            label: "Lloyd's List — Shipping needs its own maritime-specific AI revolution, 17 June 2026",
            href: "https://www.lloydslist.com/LL1157499/Shipping-needs-its-own-maritime-specific-AI-revolution",
          },
          {
            label: "IMO — FAL 50 session summary, March 2026",
            href: "https://www.imo.org/en/mediacentre/meetingsummaries/pages/fal-50th-session.aspx",
          },
        ],
      },
      {
        heading: "Methodology",
        pending: true,
        body: [
          "[ADD METHODOLOGY — research design, sources, sampling, analysis technique, period covered]",
        ],
      },
      {
        heading: "Findings",
        pending: true,
        body: [
          "[ADD FINDINGS — no findings are stated here until the analysis is written up]",
        ],
      },
      {
        heading: "Implications and further work",
        pending: true,
        body: ["[ADD IMPLICATIONS AND FURTHER WORK]"],
      },
    ],
  },

  {
    slug: "hr-digital-transformation-iffco",
    title: "Impact of Digital Transformation on HR Processes",
    category: "HR Technology · Organisational Analysis",
    kind: "analysis",
    status: "Academic research",
    weight: "standard",
    year: "[ADD YEAR]",
    summary:
      "An organisational study of how digitising HR processes at IFFCO changed the work of the HR function — centred on the iGROW performance development system.",
    thesis:
      "Digital transformation in HR is usually described in terms of the software. The more interesting question is what happens to the function around it: which judgements move from a conversation into a form field, what becomes visible that previously was not, and where the human work relocates rather than disappears.",
    methods: [
      "HR process analysis",
      "iGROW Performance Development System",
      "Digital transformation",
      "Organisational study",
    ],
    caseStudy: [
      {
        heading: "Context",
        body: [
          "IFFCO is one of India's largest fertiliser cooperatives, and — like most organisations of that scale and age — has been moving long-established HR processes onto digital systems rather than designing them digitally from the start. That makes it a useful subject: the before and after are both still visible inside the organisation.",
          "The study centres on iGROW, the performance development system, because performance management is the HR process where digitisation is most consequential. It is where the function's judgements are most subjective, most contested and most exposed once they are recorded in a structured system.",
        ],
      },
      {
        heading: "What the study looks at",
        points: [
          "Which HR processes were digitised, and what the pre-digital version of each looked like",
          "How the iGROW performance development cycle is structured and where it sits in the annual rhythm of the function",
          "What changes for the HR team's day-to-day work — the tasks removed, the tasks created",
          "Where digitisation improves consistency, and where it risks flattening a judgement that needed nuance",
          "What the same shift implies for HR functions currently considering it",
        ],
      },
      {
        heading: "My role",
        body: [
          "Conducted as an individual academic study alongside an HR internship at the organisation, which provided direct exposure to the processes being analysed rather than a purely external view of them.",
        ],
      },
      {
        heading: "Findings and conclusions",
        pending: true,
        body: [
          "[ADD FINDINGS — data collected, analysis performed, conclusions drawn]",
        ],
      },
    ],
  },

  {
    slug: "financial-statement-analysis",
    title: "Financial Statement Analysis — Hanumate Enterprises",
    category: "Finance · Business Analysis",
    kind: "analysis",
    status: "Academic analysis",
    weight: "standard",
    year: "[ADD YEAR]",
    summary:
      "Reading a Godrej dealership business through its financial statements — what the numbers say about how the operation is actually run.",
    thesis:
      "A single-location retail dealership is a good place to learn financial analysis honestly, because there is nowhere for the numbers to hide. Working capital, inventory turns and margin structure are not abstractions at that scale — they map directly onto decisions someone made about stock, credit and pricing.",
    methods: [
      "Financial statement analysis",
      "Ratio analysis",
      "Working capital",
      "Business performance review",
    ],
    caseStudy: [
      {
        heading: "The brief",
        body: [
          "Analyse the financial statements of Hanumate Enterprises, a Godrej showroom, and form a view of the business's financial position and operating performance from the statements alone.",
        ],
      },
      {
        heading: "How I approached it",
        points: [
          "Establish what the business actually does before reading a single number — a dealership's economics are set by inventory and credit terms, not by revenue alone",
          "Work through the statements structurally: position, performance, then the movement between periods",
          "Use ratio analysis as a question generator rather than a conclusion — each ratio points at an operating decision worth examining",
          "Separate what the statements can support from what would need management context to interpret",
        ],
      },
      {
        heading: "Analysis and conclusions",
        pending: true,
        body: [
          "[ADD ANALYSIS — ratios computed, period covered, and the conclusions drawn. No figures are stated here until they can be taken from the actual report.]",
        ],
      },
      {
        heading: "What it taught me",
        body: [
          "Financial statements are a compressed record of operating decisions. The analysis is only useful at the point where a ratio stops being a number and turns back into a question about how the business is run — which is the same discipline I now apply to equity research.",
        ],
      },
    ],
  },

  {
    slug: "aquasweep-ocean-waste-drone",
    title: "AquaSweep — Ocean Waste Collection Drone",
    category: "Sustainability · Product Concept",
    kind: "concept",
    status: "Concept",
    weight: "standard",
    year: "[ADD YEAR]",
    summary:
      "A product concept for autonomous surface collection of marine waste, worked through as a business proposition rather than a gadget.",
    thesis:
      "Marine plastic is not primarily a collection-technology problem — it is an economics and coverage problem. The concept was an exercise in taking a sustainability idea and pressing it against the questions that decide whether it could exist: who operates it, who pays for it, and at what scale it stops being symbolic.",
    methods: [
      "Product concept",
      "Sustainability",
      "Feasibility thinking",
      "Business modelling",
    ],
    caseStudy: [
      {
        heading: "The concept",
        body: [
          "An autonomous surface vessel designed to collect floating waste in coastal and harbour waters, where debris concentrates and where operating conditions are more tractable than open ocean.",
        ],
      },
      {
        heading: "The questions that shaped it",
        points: [
          "Where does floating waste actually concentrate, and does that favour fixed installations or mobile collection?",
          "Who is the operator — a port authority, a municipality, an NGO, a private contractor — and what does each of them need the unit to be?",
          "What is the cost per tonne recovered, and how does that compare with the alternatives?",
          "How is bycatch and ecological disturbance avoided at the point of collection?",
        ],
      },
      {
        heading: "Concept detail and design work",
        pending: true,
        body: ["[ADD CONCEPT DETAIL — design work, specification, presentation materials]"],
      },
    ],
  },

  {
    slug: "smart-mat",
    title: "Smart Mat for Yoga and Exercise",
    category: "Product Concept · Health Tech",
    kind: "concept",
    status: "Concept",
    weight: "standard",
    year: "[ADD YEAR]",
    summary:
      "A connected exercise mat concept, designed around the moment a user actually needs feedback rather than around the sensors available.",
    thesis:
      "Most connected fitness products fail on the same point: they measure what is easy to measure and report it after the fact. The design question here was narrower and harder — what feedback is useful while a person is mid-posture, and what would they simply ignore?",
    methods: ["Product concept", "User-centred design", "Health technology"],
    caseStudy: [
      {
        heading: "The concept",
        body: [
          "An exercise mat with embedded pressure sensing, intended to give a practitioner feedback on posture, balance and weight distribution — the things a teacher corrects and a mirror cannot show.",
        ],
      },
      {
        heading: "The design questions",
        points: [
          "What can pressure distribution alone genuinely tell you about a posture?",
          "When is real-time feedback helpful and when does it break concentration?",
          "How does this stay a mat — foldable, washable, unpowered when you want it to be — rather than becoming a device?",
          "Who is it for: a beginner without a teacher, or a practitioner refining form?",
        ],
      },
      {
        heading: "Concept detail",
        pending: true,
        body: ["[ADD CONCEPT DETAIL — specification, interaction design, presentation materials]"],
      },
    ],
  },

  {
    slug: "patagonia-sustainability-report",
    title: "Patagonia — Eco-Friendly Product & Industry Report",
    category: "Sustainability · Industry Analysis",
    kind: "report",
    status: "Industry report",
    weight: "standard",
    year: "[ADD YEAR]",
    summary:
      "An industry and product report on Patagonia, examining sustainability as a business strategy rather than as a communications exercise.",
    thesis:
      "Patagonia is the standard reference for environmental positioning in consumer goods, which makes it the most useful and the most difficult case to study. The report's interest was in the parts that are structural — supply chain, materials, ownership, repair — rather than the parts that are brand.",
    methods: [
      "Industry analysis",
      "Sustainability strategy",
      "Product research",
      "Competitive positioning",
    ],
    caseStudy: [
      {
        heading: "Focus",
        points: [
          "How environmental commitments show up in materials sourcing and manufacturing decisions",
          "Where sustainability creates genuine competitive advantage rather than cost",
          "What the repair and resale programmes do to the unit economics of an apparel business",
          "Whether the model is replicable by firms without the same ownership structure and price position",
        ],
      },
      {
        heading: "Report detail and conclusions",
        pending: true,
        body: ["[ADD REPORT DETAIL AND CONCLUSIONS]"],
      },
    ],
  },
];

/** The lead project — currently the shipped product, not the research. */
export const leadProject = projects.find((p) => p.weight === "flagship")!;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
