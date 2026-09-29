export interface AppConfigExtra {
  /** Set on apps whose own keyboard handling must win over the desktop's
   *  global shortcuts (Escape to close, M to minimize). */
  ownsKeyboard?: boolean;
}

export const USER_NAME = "Naim Gerges";
export const USER_SHORT_NAME = "Naim";
export const USER_TITLE = "Full-Stack Software Engineer & Solutions Architect";
export const USER_HEADLINE =
  "Turning curiosity into impact from day 1 • Full-Stack Software Engineer & Solutions Architect";

export const USER_EMAIL = "naiimgerges@outlook.com";
export const USER_WHATSAPP_NUMBER = "+961 76 923 233";
export const USER_WHATSAPP_LINK = "https://wa.me/96176923233";

export const LINKEDIN_URL = "https://lb.linkedin.com/in/naim-gerges-892591271";
export const LINKEDIN_PROFILE_PATH = "/in/naim-gerges-892591271/";
export const LINKEDIN_API_ROUTE = "/api/linkedin-profile";
export const HUGGINGFACE_URL = "https://huggingface.co/naimgerges";

export const GITHUB_URL = "https://github.com/ngdevelopment-tech";
export const GITHUB_REPO_FULLSTACK_OPEN = "https://github.com/ngdevelopment-tech/fullstack-open";

// Bundled locally — no third-party CDN hotlinks anywhere in the app.
export const USER_AVATAR = "./assets/avatar.jpg";
export const USER_BANNER = "./assets/linkedin-banner.jpg";
export const WALLPAPER_URL = "./wallpapers/code.jpg";

export interface Wallpaper {
  id: string;
  name: string;
  url: string;
}

export const WALLPAPERS: Wallpaper[] = [
  { id: "code", name: "Code Screen", url: "./wallpapers/code.jpg" },
  { id: "flowers", name: "Dawn Bloom", url: "./wallpapers/flowers.jpg" },
  { id: "gerbera", name: "Gerbera Dew", url: "./wallpapers/gerbera.jpg" },
  { id: "ixora", name: "Ixora Garden", url: "./wallpapers/ixora.jpg" },
  { id: "sonoma", name: "Sonoma Ridge", url: "./wallpapers/sonoma.jpg" },
  { id: "ventura", name: "Ventura Dusk", url: "./wallpapers/ventura.jpg" },
  { id: "aurora", name: "Aurora", url: "./wallpapers/aurora.jpg" },
  { id: "graphite", name: "Graphite Flow", url: "./wallpapers/graphite.jpg" },
  { id: "coast", name: "Coastline", url: "./wallpapers/coast.jpg" },
  { id: "dune", name: "Deep Tide", url: "./wallpapers/dune.jpg" },
];

// ---------------------------------------------------------------------------
// Notes app content
// ---------------------------------------------------------------------------

export interface NoteSeed {
  id: number;
  title: string;
  date: string;
  content: string;
}

export const NOTES: NoteSeed[] = [
  {
    id: 1,
    title: "About Naim",
    date: "Today",
    content:
      "Naim Gerges\n" +
      "───────────────────────────────\n\n" +
      "I create solutions that solve real problems. What started as curiosity about how " +
      "software works became a career of building secure, scalable products across web, " +
      "mobile and the systems that connect them.\n\n" +
      "I work across the entire stack. On the web I design and build complete platforms " +
      "with modern frameworks. On mobile I take products from an idea to the App Store. " +
      "Behind both I build the APIs, databases and infrastructure that keep everything " +
      "fast and reliable.\n\n" +
      "My work ranges from enterprise platforms serving daily operations, to realtime " +
      "systems where every second matters, to applied artificial intelligence: training " +
      "reinforcement learning agents, building semantic search pipelines and deploying " +
      "models that people actually use.\n\n" +
      "I hold myself to one standard: technology should feel effortless to the person " +
      "using it, no matter how complex it is underneath. That standard is what turns " +
      "good code into products people trust.\n\n" +
      "This portfolio is that philosophy in practice. Everything you can click in this " +
      "desktop was built to be used, not just shown. Explore it the way you would " +
      "explore any new system: open things, press buttons, and see what happens.",
  },
  {
    id: 2,
    title: "Enjoy the experience",
    date: "This week",
    content:
      "Welcome, and thank you for visiting.\n\n" +
      "This desktop is more than a portfolio. It is a small working system, and every " +
      "app in it does something real. Try the typing game in Safari. Make a beat. Play " +
      "a round or two. Check the Trash, some things in there have history.\n\n" +
      "Everything you see was designed and built from scratch, down to the icons and " +
      "the sounds.\n\n" +
      "If you are a recruiter, the Experience and Projects apps will tell you the " +
      "professional story fastest. If you are just visiting, I hope this makes you " +
      "smile. Either way, enjoy the tour.",
  },
];

// ---------------------------------------------------------------------------
// Portfolio content lives in lib/portfolioData.ts (LinkedIn data).
// ---------------------------------------------------------------------------
