/**
 * The single source of truth for portfolio content, transcribed from the
 * owner's LinkedIn profile (experiences, education, skills, languages,
 * courses, licenses & certifications) and the real project portfolio.
 */

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export interface Experience {
  id: string;
  company: string;
  role: string;
  kind: "Internship" | "Part-time" | "Full-time" | "Residency" | "Specialist";
  period: string;
  location?: string;
  logo?: string;
  logoFallback: string; // initials shown when no logo asset exists
  accent: string; // gradient for the logo tile
  description: string;
  highlights: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    id: "huggingface",
    company: "Hugging Face",
    role: "Multi-Agent & Deep RL Specialist",
    kind: "Specialist",
    period: "Jan 2026 – Mar 2026 · 3 mos",
    logo: "./assets/hf-logo.png",
    logoFallback: "HF",
    accent: "from-[#ffd21e] to-[#ff9d00]",
    description:
      "Eleven independent intelligent agents were developed and improved with the goal of fully designing, educating, and deploying Reinforcement Learning systems. With a perfect score, I became proficient in competitive multi-agent systems, 3D computer vision, and high-precision robotics — solving complex problems in non-stationary environments, Markov Decision Processes, and the crucial transition from simulation to deployment-ready models.",
    highlights: [
      "SoccerTwos — decentralized 2v2 PPO agents with self-play; shaped intrinsic + balanced extrinsic rewards to counter reward hacking",
      "ViZDoom — high-throughput PPO pipelines with Sample Factory; optimized CNN architectures for real-time 3D reasoning from raw pixels",
      "PandaReach — Actor-Critic control of 6-DOF manipulation; entropy regularization delivered millimetric precision without oscillation",
      "Pyramids — curiosity-driven Random Network Distillation to solve the cold-start problem without external feedback",
      "SpaceInvaders — Deep Q-Networks with 4-frame stacking and experience replay for stable Q-value trajectories",
      "Algorithms: PPO, DQN, A2C, MARL, RND, REINFORCE",
    ],
  },
  {
    id: "harvard",
    company: "Harvard University",
    role: "Full-Stack Software Engineer (Capstone Residency)",
    kind: "Residency",
    period: "Jan 2026 – Mar 2026 · 3 mos",
    logo: "./assets/harvard-logo.png",
    logoFallback: "HU",
    accent: "from-[#a51c30] to-[#6e0f1e]",
    description:
      "Selected for a high-intensity engineering residency focused on low-level memory management and scalable full-stack architecture. The residency culminated in the design and deployment of HUM, a proprietary 3D spatial-data visualization engine.",
    highlights: [
      "Full-stack architecture: decoupled Python (Flask) REST API serving a high-performance Three.js frontend",
      "3D geospatial mapping: custom coordinate transformations mapping SQL data into a 3D WebGL vector space",
      "Security & persistence: session management, password hashing, and an optimized SQLite schema",
      "Performance: glassmorphism interface holding 60 FPS 3D transitions with camera interpolation",
    ],
  },
  {
    id: "nori",
    company: "NORI Agency",
    role: "Full Stack Developer",
    kind: "Part-time",
    period: "Nov 2025 – Feb 2026 · 4 mos",
    location: "Beirut, Lebanon · Hybrid",
    logo: "./assets/nori-logo.png",
    logoFallback: "N",
    accent: "from-[#7c3aed] to-[#4c1d95]",
    description:
      "Developed and maintained the agency's website and client projects, handling both frontend and backend tasks.",
    highlights: [
      "Built responsive interfaces, APIs, and optimized backend systems",
      "Worked with teams and clients to deliver functional, reliable web applications",
      "Assisted with deployment and ongoing maintenance of production systems",
    ],
  },
  {
    id: "dualcom",
    company: "DualCom Consulting",
    role: "Software Developer Intern",
    kind: "Internship",
    period: "Mar 2025 – May 2025 · 3 mos",
    logo: "./assets/dualcom-logo.png",
    logoFallback: "DC",
    accent: "from-[#0a66c2] to-[#004182]",
    description:
      "A Nokia company. Contributed to the development of innovative software solutions alongside experienced engineers, gaining hands-on experience in software design, development, and deployment.",
    highlights: [
      "Collaborated with cross-functional teams to design and implement software solutions",
      "Wrote clean, efficient, scalable code following best practices",
      "Debugged, tested, and optimized applications; produced proper documentation to company guidelines",
    ],
  },
  {
    id: "sefactory",
    company: "SE Factory",
    role: "Full Stack Developer",
    kind: "Internship",
    period: "Jan 2025 – Apr 2025 · 4 mos",
    logo: "./assets/sefactory-logo.jpg",
    logoFallback: "SE",
    accent: "from-[#e63946] to-[#9d0208]",
    description:
      "Part of SE Factory's Full-Stack Software Engineering Bootcamp, an intensive program designed to master modern web development. Gained hands-on training, built real-world projects, and enhanced skills in full-stack development. Through rigorous coursework and industry-relevant challenges, improved expertise in front-end and back-end technologies while preparing for a career in tech.",
    highlights: [
      "Intensive full-stack software engineering bootcamp",
      "Hands-on training with real-world projects",
      "Front-end and back-end expertise across the modern web stack",
    ],
  },
  {
    id: "ngdevelopment",
    company: "ngdevelopment",
    role: "Technical Solutions Engineer",
    kind: "Part-time",
    period: "Apr 2016 – Jun 2025 · 9 yrs 3 mos",
    logo: "./assets/ngdevelopment.jpg",
    logoFallback: "NG",
    accent: "from-[#334155] to-[#0f172a]",
    description:
      "Ran the technical side of a client solutions practice end to end — from account recovery to custom builds and security work.",
    highlights: [
      "Account recovery & growth: resolved issues for 80+ disabled accounts (bullying, scams) and restored user access",
      "Custom client solutions: dynamic websites, applications, and comprehensive penetration testing",
      "Technical issue resolution: troubleshooting and hardening client systems for smooth operation",
    ],
  },
  {
    id: "blf",
    company: "Banque Libano-Française",
    role: "IT Support Specialist",
    kind: "Part-time",
    period: "Sep 2023 – Mar 2024 · 7 mos",
    location: "Chiyah, Mount Lebanon Governorate, Lebanon · On-site",
    logo: "./assets/blf-logo.jpg",
    logoFallback: "BLF",
    accent: "from-[#046a38] to-[#024222]",
    description:
      "Supported the bank's physical and software infrastructure, keeping workstations, peripherals and applications running for daily banking operations.",
    highlights: [
      "Installation & Maintenance: installed, configured and maintained computers, printers, servers and networking devices",
      "Troubleshooting: diagnosed and resolved hardware malfunctions, failures and performance issues",
      "Upgrades: upgraded memory, storage devices and peripherals to improve performance and ensure compatibility",
      "Software Troubleshooting: resolved application crashes, performance problems and compatibility conflicts",
    ],
  },
  {
    id: "nola",
    company: "Nola Laundry Services",
    role: "Web Developer",
    kind: "Part-time",
    period: "Jun 2024 – Jul 2024 · 2 mos",
    location: "On-site",
    logo: "./assets/nola-laundry.jpg",
    logoFallback: "NLS",
    accent: "from-[#0891b2] to-[#155e75]",
    description:
      "Designed and developed the official website for Nola Laundry Services, creating a user-friendly and responsive platform to showcase their services.",
    highlights: [
      "Website Design & Development: built a user-friendly, responsive platform showcasing services",
      "UI/UX Optimization: intuitive navigation and visually appealing design elements",
      "Content Management: implemented features allowing easy updates and maintenance by the client",
      "SEO & Performance: SEO-friendly structure optimized for fast loading across devices",
    ],
  },
  {
    id: "beirut42",
    company: "42 Beirut",
    role: "Software Developer Trainee",
    kind: "Internship",
    period: "Apr 2024 – May 2024 · 2 mos",
    location: "Beirut, Beirut Governorate, Lebanon · On-site",
    logo: "./assets/42beirut-logo.jpg",
    logoFallback: "42",
    accent: "from-[#111827] to-[#374151]",
    description:
      "Engaged in 42's immersive, project-based coding program built on peer-to-peer learning and continuous evaluation.",
    highlights: [
      "Immersive Coding Experience: month-long intensive program mastering foundational programming concepts and languages",
      "Peer-Led Learning: collaborated in a peer-to-peer environment fostering teamwork and knowledge-sharing",
      "Algorithmic Challenges: tackled complex algorithmic problems, honing analytical thinking and problem-solving",
      "Resilience & Adaptability: developed resilience through continuous learning and rapid iteration under pressure",
    ],
  },
  {
    id: "bracket",
    company: "Bracket Technologies",
    role: "Software Developer",
    kind: "Internship",
    period: "Mar 2023 – May 2024 · 1 yr 3 mos",
    location: "Hazmieh, Mount Lebanon Governorate, Lebanon · On-site",
    logoFallback: "BT",
    accent: "from-[#7c2d12] to-[#431407]",
    description:
      "Hands-on experience with a full-stack web technology recognized and awarded in international invention competitions — real-time code and visual editing tools for web application creation.",
    highlights: [
      "Web Development: assisted in building and maintaining robust, scalable web applications on Bracket's full-stack technology",
      "Real-Time Coding: contributed to real-time code and visual editing tools for web application creation",
      "Data Management: developed and managed data and file creation processes within a single platform",
      "Award-Winning Tech: worked with technology recognized in international invention competitions",
    ],
  },
];

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

export interface Education {
  id: string;
  school: string;
  program: string;
  period: string;
  grade?: string;
  activities?: string;
  logo?: string;
  logoFallback: string;
  accent: string;
  description?: string;
  highlights?: string[];
  media?: { src: string; title: string; caption: string }[];
}

export const EDUCATION: Education[] = [
  {
    id: "helsinki",
    school: "University of Helsinki",
    program: "Open University Studies, Computer Science",
    period: "2026",
    grade: "5/5",
    activities:
      "University of Helsinki Open University, Full Stack Open Community, Peer Code Review Group",
    logo: "./assets/hf-logo.png",
    logoFallback: "UH",
    accent: "from-[#0072b5] to-[#004a75]",
    description:
      "Completed intensive Computer Science modules at the University of Helsinki, achieving a final grade of 5/5. This program is recognized for its rigorous standards and engineering requirements.",
    highlights: [
      "Grade 5/5: achieved the highest grade across all university projects and examinations",
      "Software Engineering: focused on building scalable digital architectures and modern data management systems",
      "Formal Validation: all work was evaluated and verified by the University of Helsinki Department of Computer Science",
      "These 8 ECTS credits represent hundreds of hours of hands-on problem-solving and software development",
    ],
    media: [
      {
        src: "./assets/helsinki-portfolio.jpg",
        title: "Project Portfolio: Full Stack & GraphQL",
        caption:
          "Open-source implementation of full-stack architectures, featuring React, Node.js, and advanced GraphQL schemas. All projects verified with a Grade 5/5.",
      },
      {
        src: "./assets/helsinki-cert1.jpg",
        title: "University Certificate",
        caption: "Official 8 ECTS credits in Computer Science.",
      },
      {
        src: "./assets/helsinki-cert2.jpg",
        title: "University Certificate",
        caption: "Official 8 ECTS credits in Computer Science.",
      },
    ],
  },
  {
    id: "aou",
    school: "Arab Open University – LEBANON",
    program: "Computer Science",
    period: "2022 – 2025",
    logo: "./assets/aou-logo.jpg",
    logoFallback: "AOU",
    accent: "from-[#1e40af] to-[#172554]",
  },
  {
    id: "sscc",
    school: "Collège des Sœurs des Saints-Cœurs – Ain Najm",
    program: "Secondary Education",
    period: "",
    logo: "./assets/sc-logo.jpg",
    logoFallback: "SC",
    accent: "from-[#b91c1c] to-[#7f1d1d]",
  },
];

// ---------------------------------------------------------------------------
// Languages
// ---------------------------------------------------------------------------

export interface Language {
  name: string;
  proficiency: string;
  level: number; // 0..5, LinkedIn style
}

export const LANGUAGES: Language[] = [
  { name: "Arabic", proficiency: "Native or Bilingual Proficiency", level: 5 },
  { name: "English", proficiency: "Full Professional Proficiency", level: 5 },
  { name: "French", proficiency: "Limited Working Proficiency", level: 3 },
];

// ---------------------------------------------------------------------------
// Courses & events
// ---------------------------------------------------------------------------

export const COURSES: { name: string; org: string }[] = [
  { name: ".NET Lebanon Hub Meetup", org: "Beirut Digital District (BDD)" },
  { name: "Build with AI Hackathon", org: "GDG Coast Lebanon / LU Hadath" },
  { name: "DevFest Beirut", org: "GDG Coast Lebanon / LAU Beirut" },
  { name: "Google Cloud Workshop", org: "GDG Coast Lebanon / AUB" },
  { name: "Google I/O Extended Beirut", org: "GDG Coast Lebanon (Cloud & AI)" },
  { name: "Semicolon Coding Workshop", org: "Beirut" },
  { name: "Summer of Tech", org: "Beirut Digital District (BDD)" },
];

// ---------------------------------------------------------------------------
// Skills — grouped like LinkedIn's filter tabs
// ---------------------------------------------------------------------------

export interface Skill {
  name: string;
  group: "Industry Knowledge" | "Tools & Technologies" | "Interpersonal Skills";
  source?: string; // endorsing program, e.g. "Full Stack Open: GraphQL"
}

export const SKILLS: Skill[] = [
  { name: "GraphQL", group: "Tools & Technologies", source: "Full Stack Open: GraphQL" },
  { name: "Apollo GraphQL", group: "Tools & Technologies", source: "Full Stack Open: GraphQL" },
  { name: "MongoDB", group: "Tools & Technologies", source: "Full Stack Open: GraphQL" },
  { name: "React.js", group: "Tools & Technologies", source: "Full Stack Open: Core" },
  { name: "Node.js", group: "Tools & Technologies", source: "Full Stack Open: Core" },
  { name: "Express.js", group: "Tools & Technologies", source: "Full Stack Open: Core" },
  { name: "Data Structures", group: "Tools & Technologies", source: "CS50: Computer Science" },
  { name: "Algorithms", group: "Tools & Technologies", source: "CS50: Computer Science" },
  { name: "SQL", group: "Tools & Technologies", source: "CS50: Computer Science" },
  { name: "Python (Programming Language)", group: "Tools & Technologies", source: "CS50: Computer Science" },
  { name: "Web Development", group: "Tools & Technologies", source: "CS50: Computer Science" },
  { name: "API Development", group: "Industry Knowledge" },
  { name: "Data Management", group: "Industry Knowledge" },
  { name: "Databases", group: "Industry Knowledge" },
  { name: "Data Science", group: "Industry Knowledge" },
  { name: "Automation", group: "Industry Knowledge" },
  { name: "Cloud Computing", group: "Industry Knowledge" },
  { name: "Internet of Things (IoT)", group: "Industry Knowledge" },
  { name: "Robotics", group: "Industry Knowledge" },
  { name: "Machine Learning", group: "Industry Knowledge" },
  { name: "Artificial Intelligence (AI)", group: "Industry Knowledge" },
  { name: "Networking", group: "Industry Knowledge" },
  { name: "Cybersecurity", group: "Industry Knowledge" },
  { name: "Software Development", group: "Industry Knowledge" },
  { name: "Mobile Applications", group: "Industry Knowledge" },
  { name: "User Experience Design (UED)", group: "Industry Knowledge" },
  { name: "Time Management", group: "Interpersonal Skills" },
  { name: "Teamwork", group: "Interpersonal Skills" },
  { name: "Attention to Detail", group: "Interpersonal Skills" },
  { name: "Critical Thinking", group: "Interpersonal Skills" },
  { name: "Problem Solving", group: "Interpersonal Skills" },
];

export const SKILL_GROUPS = [
  "All",
  "Industry Knowledge",
  "Tools & Technologies",
  "Interpersonal Skills",
] as const;

// ---------------------------------------------------------------------------
// Licenses & certifications
// ---------------------------------------------------------------------------

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  detail: string;
  logo?: string;
  logoFallback: string;
  accent: string;
  credentialUrl?: string;
  media?: string;
  issued?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "ibm-ai-agent",
    title: "Build an AI Agent",
    issuer: "IBM SkillsBuild",
    detail:
      "Completed IBM SkillsBuild's Build an AI Agent, covering AI agent development, agent types, workflow design, IBM watsonx.ai, MLflow-based performance evaluation, responsible AI, and real-world deployment considerations.",
    logo: "./assets/ibm-logo.jpg",
    logoFallback: "IBM",
    accent: "from-[#0f62fe] to-[#002d9c]",
    credentialUrl: "https://www.credly.com/badges/cf5f3d9d-9906-4814-b6b1-5e4183ca071a/print",
    media: "./assets/ibm-cert.jpg",
  },
  {
    id: "one-million-prompters",
    title: "One Million Prompters – AI Prompt Engineering Initiative",
    issuer: "Dubai Future Foundation",
    detail:
      "AI Prompt Engineering Certification from the Dubai Future Foundation's One Million Prompters initiative — structured prompting, model steering and applied generative-AI workflows.",
    logo: "./assets/dff-logo.jpg",
    logoFallback: "DFF",
    accent: "from-[#0ea5e9] to-[#0369a1]",
    credentialUrl: "https://omp.dub.ai/certificate/1GyyIM4R8Sv5",
    media: "./assets/dff-cert.jpg",
  },
  {
    id: "fso",
    title: "Full Stack Open",
    issuer: "University of Helsinki",
    detail:
      "Verified certification covering React, Node.js, GraphQL, TypeScript, testing and CI/CD. Graded 5/5.",
    logo: "./assets/hf-logo.png",
    logoFallback: "UH",
    accent: "from-[#0072b5] to-[#004a75]",
  },
  {
    id: "hf-ml",
    title: "Machine Learning — Deep RL",
    issuer: "Hugging Face",
    detail:
      "Transformers, tokenization, semantic search and accelerated inference; multi-agent deep reinforcement learning course with a perfect score.",
    logo: "./assets/hf-logo.png",
    logoFallback: "HF",
    accent: "from-[#ffd21e] to-[#ff9d00]",
  },
];

// ---------------------------------------------------------------------------
// Honors & awards
// ---------------------------------------------------------------------------

export interface Award {
  title: string;
  issuer: string;
  detail: string;
  period?: string;
}

export const AWARDS: Award[] = [
  {
    title: "1st Prize — Foire des Sciences USJ",
    issuer: "Université Saint-Joseph de Beyrouth (USJ)",
    detail:
      "First prize in the junior category for LibaTourism, an iOS tourism platform built with Swift, MapKit and offline-first maps.",
  },
  {
    title: "Perfect Score — Deep RL Specialization",
    issuer: "Hugging Face",
    detail:
      "Perfect score across eleven reinforcement-learning agents spanning multi-agent play, 3D vision and robotic control.",
  },
  {
    title: "TV Feature — MTV Lebanon",
    issuer: "MTV Lebanon · Interview with Rania Ziade Ashkar",
    detail: "National television interview covering the LibaTourism platform.",
  },
];

// ---------------------------------------------------------------------------
// Projects — the real portfolio, transcribed from LinkedIn
// ---------------------------------------------------------------------------

export interface PortfolioProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  highlights?: { heading?: string; bullets: string[] };
  stack: string[];
  accent: string;
  glyph: string; // short glyph shown in the tile badge
  repo?: string;
  link?: { label: string; url: string };
}

export const PROJECTS: PortfolioProject[] = [
  {
    id: "deals-on-wheels",
    title: "Deals On Wheels",
    tagline: "Fleet Management Platform",
    description:
      "Deals On Wheels features a cutting-edge Fleet Management System giving administrators full control over luxury vehicle operations — complete inventory management, mileage tracking, maintenance scheduling, and repair history logging. Real-time monitoring, analytics and reporting provide actionable insights, while integrated notifications and activity logs ensure secure, transparent management.",
    highlights: {
      heading: "Key Achievements",
      bullets: [
        "Developed a full-stack web platform with customer portal and admin dashboard",
        "Implemented real-time fleet tracking with automated maintenance scheduling",
        "Created an integrated booking system with seamless payment processing",
        "Delivered advanced analytics for operational insights and revenue optimization",
      ],
    },
    stack: ["Full-Stack Web", "Real-Time Tracking", "Payments", "Analytics", "RBAC", "Cloud"],
    accent: "from-[#5e5ce6] to-[#3634a3]",
    glyph: "DW",
  },
  {
    id: "hum",
    title: "HUM — The Frequency of Humanity",
    tagline: "3D WebGL Globe · Spatial Social Ecosystem",
    description:
      "HUM was architected as a spatial social ecosystem to visualize the “emotional pulse” of the world. It replaces static 2D interfaces with a high-fidelity, interactive 3D WebGL globe, allowing users to “Echo” their thoughts across a shared planetary space.",
    highlights: {
      heading: "Technical Architecture",
      bullets: [
        "The Orbit: Three.js (WebGL) engine on SphereGeometry with custom fragment shaders; geodetic GPS → Cartesian 3D coordinate transformation layer",
        "The Mood Engine: real-time state management translating emotional inputs into RGB values that procedurally alter the planet's lighting and textures",
        "The Gate & The Echo: RESTful Python/Flask API with asynchronous data flow and an indexed relational SQL schema for minimal latency",
        "Security & Navigation: Werkzeug salted/hashed passwords; Tween.js eased camera fly-to mechanics",
      ],
    },
    stack: [
      "Three.js (WebGL)",
      "Python",
      "Flask",
      "SQL",
      "JavaScript ES6+",
      "Vector Math",
      "API Design",
      "CSS3",
    ],
    accent: "from-[#0ea5e9] to-[#1e1b4b]",
    glyph: "HUM",
  },
  {
    id: "libatourism",
    title: "LibaTourism",
    tagline: "The tour guide that makes you feel Lebanon again",
    description:
      "A full tourism companion for Lebanon: attractions, activities, food & drinks, media, transportation, live weather forecasts, info & facts, embassies, daily quotes, emergency numbers and hospitals — public and private with location and contact details. Won 1st prize at the Foire des Sciences USJ.",
    highlights: {
      bullets: [
        "Attractions, activities and food guides for the whole country",
        "Live weather forecast and real-time updates",
        "Embassies, emergency calls and hospitals directories",
        "Built with Swift, MapKit and CoreLocation — 1st Prize winner",
      ],
    },
    stack: ["Swift", "MapKit", "CoreLocation", "SQLite", "iOS", "Web"],
    accent: "from-[#34aadc] to-[#0a66d0]",
    glyph: "LB",
  },
  {
    id: "patisserie-sidawi",
    title: "Patisserie Sidawi",
    tagline: "Billing, barcode & inventory system",
    description:
      "A comprehensive billing system built to streamline operations and improve customer experience at a high-volume patisserie.",
    highlights: {
      heading: "Key Features",
      bullets: [
        "Barcode scanning system for quick and accurate item entry",
        "User-friendly interface for staff to manage orders and calculate totals efficiently",
        "Real-time inventory management tracking stock levels and reducing waste",
        "Automated invoice generation enhancing billing speed and accuracy",
        "Training and ongoing support for smooth staff adoption",
      ],
    },
    stack: ["POS", "Barcode", "ESC/POS", "Real-Time Sync", "ERP"],
    accent: "from-[#f59e0b] to-[#b45309]",
    glyph: "PS",
  },
  {
    id: "memo-rift",
    title: "MemoRift",
    tagline: "Mobile memory puzzle game",
    description:
      "A mobile memory puzzle game centered on cognitive pattern retention, featuring a linear progression system across 18 levels that challenges players to memorize color and grid placements under time constraints.",
    highlights: {
      heading: "Key Features",
      bullets: [
        "Dynamic Difficulty Scaling: grid complexity scales from 4×4 up to 8×8+, increasing pattern variance and color count (RGB/CMYK logic) as the player progresses",
        "Game Loop: a strict “Observation vs. Recall” state machine with instant feedback mechanisms",
        "Optimization: rendering optimized for large tile grids (64+ interactive elements) for smooth mobile performance",
      ],
    },
    stack: ["Mobile", "Game Loop", "State Machines", "Render Optimization"],
    accent: "from-[#ec4899] to-[#9d174d]",
    glyph: "MR",
  },
  {
    id: "eco-collect",
    title: "EcoCollect",
    tagline: "E-waste recycling, rewarded",
    description:
      "EcoCollect provides users with recycling information, facilitates the proper disposal of electronic waste, and rewards users for their efforts. It sends data to electronic trash and reverse vending points, notifying users when the task is completed. At 100 points users receive an award, and the municipality arranges collection.",
    highlights: {
      bullets: [
        "Recycling information and proper e-waste disposal guidance",
        "Integration with electronic trash and reverse vending points",
        "Task-completion notifications and a points reward system",
        "Municipality-coordinated collection at reward milestones",
      ],
    },
    stack: ["Mobile", "IoT Integration", "Notifications", "Gamification"],
    accent: "from-[#22c55e] to-[#15803d]",
    glyph: "EC",
  },
  {
    id: "auto-rent",
    title: "AutoRent",
    tagline: "Car rental, reimagined",
    description:
      "AutoRent facilitates the procedure for car rental companies including extra security and updated systems which open and lock your vehicle via mobile phone or the password given — promoting Lebanon abroad.",
    highlights: {
      bullets: [
        "Mobile-controlled vehicle locking/unlocking with secure passwords",
        "Extra security layers across the rental workflow",
        "Rental company operations streamlined end to end",
      ],
    },
    stack: ["Mobile", "Security", "IoT", "Booking"],
    accent: "from-[#64748b] to-[#334155]",
    glyph: "AR",
  },
  {
    id: "alpha",
    title: "ALPHA — Adopt, Don't Shop",
    tagline: "Animal welfare platform",
    description:
      "ALPHA fights animal abuse and abandonment: collecting and housing abandoned animals that are lost or mistreated and finding them a home, educating the public — especially young people — about animal protection and volunteering, empowering animal owners, and facilitating dog adoption with quality services at the medical, social and economic levels.",
    highlights: {
      bullets: [
        "Shelter management for abandoned and mistreated animals",
        "Adoption flow connecting dogs with new homes",
        "Public education and volunteering programs for young people",
        "Medical, social and economic services for animal owners",
      ],
    },
    stack: ["Web", "Community", "Content Platform"],
    accent: "from-[#f97316] to-[#c2410c]",
    glyph: "AL",
  },
  {
    id: "nola-laundry",
    title: "Nola Laundry Services",
    tagline: "Official website + admin system",
    description:
      "The platform presents NLS UAE's service offerings through structured pages and workflow highlights, providing visitors with an intuitive, content-rich experience. A separate admin system handles service listings, operational tracking, and performance monitoring — full control over daily operations.",
    highlights: {
      bullets: [
        "Responsive, SEO-friendly public website optimized for fast loading",
        "Content management features for easy client updates",
        "Admin system for service listings and operational tracking",
        "Performance monitoring across daily operations",
      ],
    },
    stack: ["Web", "UI/UX", "CMS", "SEO", "Performance"],
    accent: "from-[#0891b2] to-[#155e75]",
    glyph: "NLS",
  },
  {
    id: "nori-agency",
    title: "Nori Agency",
    tagline: "Agency website & client platforms",
    description:
      "Designed and developed the agency's official website along with client-facing projects, handling both frontend and backend development.",
    highlights: {
      bullets: [
        "Responsive interfaces, custom APIs, and optimized backend systems for performance and security",
        "User-friendly UI/UX and content management features for easy updates and maintenance",
        "Deployment and ongoing maintenance of multiple production systems, ensuring reliability and scalability",
      ],
    },
    stack: ["React", "Node.js", "APIs", "Deployment"],
    accent: "from-[#7c3aed] to-[#4c1d95]",
    glyph: "N",
  },
  {
    id: "vdcom",
    title: "V.D.COM.",
    tagline: "Advanced communications technology",
    description:
      "V.D.COM. provides the highest and most innovative and advanced communications technology, serving customers with highly intuitive and cost-effective voice and data networking solutions and services.",
    highlights: {
      heading: "Partnerships",
      bullets: [
        "Casino du Liban",
        "Banque du Liban",
        "Banque Libano-Française",
      ],
    },
    stack: ["VoIP", "Networking", "Enterprise", "Voice & Data"],
    accent: "from-[#0369a1] to-[#0c4a6e]",
    glyph: "VD",
  },
  {
    id: "cs50-repo",
    title: "CS50 — Repository",
    tagline: "Harvard's CS50 coursework, in the open",
    description:
      "A public repository of Harvard's CS50 Computer Science coursework: data structures, algorithms, SQL, Python and web development problem sets, each engineered to the course's strict correctness and memory-safety standards.",
    highlights: {
      bullets: [
        "Data structures and algorithms problem sets",
        "SQL and Python tracks with hands-on projects",
        "Strict correctness, style and memory-safety checks",
      ],
    },
    stack: ["C", "Python", "SQL", "Algorithms"],
    accent: "from-[#dc2626] to-[#7f1d1d]",
    glyph: "CS",
  },
  {
    id: "fullstack-open",
    title: "Project Portfolio: Full Stack & GraphQL",
    tagline: "University of Helsinki · Grade 5/5",
    description:
      "Open-source implementation of full-stack architectures, featuring React, Node.js, and advanced GraphQL schemas. All projects verified with a Grade 5/5 by the University of Helsinki.",
    highlights: {
      bullets: [
        "Structured by course parts 0–9 with per-part exercise apps",
        "REST and GraphQL services with MongoDB and PostgreSQL backends",
        "Test suites with Jest and end-to-end flows with Cypress",
        "Dockerized builds with CI/CD pipelines",
      ],
    },
    stack: ["React", "TypeScript", "Node.js", "GraphQL", "Jest", "Cypress", "Docker", "CI/CD"],
    accent: "from-[#0072b5] to-[#004a75]",
    glyph: "FSO",
    repo: "https://github.com/ngdevelopment-tech/fullstack-open",
  },
];
