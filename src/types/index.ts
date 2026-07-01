export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
}

export interface ThemeSettings {
  name: "midnight" | "obsidian" | "neon";
  accent: string;
  secondary: string;
}

export interface VideoSettings {
  url: string;
  fallbackImage: string;
  brightness: number;
  playbackSpeed: number;
  blur: number;
  overlay: number;
  mobileEnabled: boolean;
}

export interface EffectSettings {
  particles: boolean;
  cursor: boolean;
  parallax: boolean;
  animationSpeed: number;
  blurStrength: number;
}

export interface SiteSettings {
  id?: string;
  name: string;
  subtitle: string;
  role: string;
  country: string;
  countryCode: string;
  avatarUrl: string;
  status: string;
  biography: string;
  socials: SocialLink[];
  theme: ThemeSettings;
  video: VideoSettings;
  effects: EffectSettings;
  musicUrl?: string;
}

export interface VisitorSession {
  session_id: string;
  last_active: string;
  first_visit: string;
  visits_count: number;
  device?: string;
  browser?: string;
  country?: string;
  timezone?: string;
}

export interface DailyStat {
  date: string;
  count: number;
}

export const defaultSettings: SiteSettings = {
  name: "PIYUSH EXE",
  subtitle: "Bot Developer",
  role: "Bot Developer",
  country: "India",
  countryCode: "IN",
  avatarUrl: "/images/avatar.jpg",
  status: "Online",
  biography:
    "Crafting intelligent Discord bots and automation tools with a cinematic touch. Driven by clean code, immersive UX, and late-night debugging sessions.",
  socials: [
    { id: "instagram", label: "Instagram", url: "https://instagram.com/piyushkumar.exee", icon: "Camera" },
    { id: "github", label: "GitHub", url: "https://github.com/piyushkumarexe", icon: "Code2" },
    { id: "discord", label: "Discord", url: "https://discord.com/users/piyushkumarexe", icon: "MessageCircle" },
    { id: "spotify", label: "Spotify", url: "#", icon: "Music" },
    { id: "steam", label: "Steam", url: "#", icon: "Gamepad2" },
    { id: "website", label: "Website", url: "https://piyushkumarexe.dev", icon: "Globe" },
    { id: "ethereum", label: "Ethereum", url: "#", icon: "Coins" },
    { id: "bitcoin", label: "Bitcoin", url: "#", icon: "Bitcoin" },
    { id: "monero", label: "Monero", url: "#", icon: "Banknote" },
  ],
  theme: { name: "midnight", accent: "#8b5cf6", secondary: "#3b82f6" },
  video: {
    url: "https://videos.pexels.com/video-files/33717344/14320592_3840_2160_30fps.mp4",
    fallbackImage: "/images/fallback-bg.jpg",
    brightness: 0.65,
    playbackSpeed: 1,
    blur: 0,
    overlay: 0.65,
    mobileEnabled: false,
  },
  effects: {
    particles: true,
    cursor: true,
    parallax: true,
    animationSpeed: 1,
    blurStrength: 20,
  },
};
