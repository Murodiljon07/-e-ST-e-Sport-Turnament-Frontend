export interface HomeHero {
  eyebrow: { left: string; right: string };
  title: { line1: string; line2: string; line3: string; line4: string };
  description: string;
  ctas: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
}

export interface HomeStat {
  id: string;
  label: string;
  value: string;
}

export interface LiveMatch {
  id: string;
  tournament: string;
  teamA: { name: string; tag: string; score: number };
  teamB: { name: string; tag: string; score: number };
  map: string;
  round: string;
  viewers: string;
}

export interface HomeNews {
  id: string;
  category: string;
  title: string;
  time: string;
  href: string;
}

export interface FeaturedTeam {
  id: string;
  name: string;
  tag: string;
  game: string;
  rank: number;
  points: number;
  winRate: number;
}

export interface HomeData {
  system: {
    status: string;
    version: string;
    isLive: boolean;
  };
  hero: HomeHero;
  stats: HomeStat[];
  liveMatches: LiveMatch[];
  news: HomeNews[];
  featuredTeams: FeaturedTeam[];
  ticker: { id: string; text: string }[];
}

export interface AboutValue {
  id: string;
  icon: string; // "◆", "▲", "●"
  title: string;
  description: string;
}

export interface AboutMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface AboutStat {
  id: string;
  label: string;
  value: string;
}

export interface AboutTeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
}

export interface AboutContact {
  id: string;
  label: string;
  value: string;
  href: string;
}

export interface AboutData {
  hero: {
    eyebrow: { left: string; right: string };
    title: { line1: string; line2: string };
    description: string;
  };
  stats: AboutStat[];
  mission: {
    label: string;
    title: string;
    body: string;
    quote: string;
    author: string;
  };
  values: AboutValue[];
  milestones: AboutMilestone[];
  team: AboutTeamMember[];
  contact: AboutContact[];
}

export type CompetitionStatus = "live" | "upcoming" | "finished";
export type CompetitionType = "tournament" | "league" | "cup" | "qualifier";
export type Game = "CS2" | "DOTA2" | "VALORANT" | "LOL" | "PUBG";

export interface Competition {
  id: string;
  code: string; // "CMP-A1"
  title: string;
  type: CompetitionType;
  game: Game;
  status: CompetitionStatus;
  region: string;
  prize: string;
  teams: number;
  maxTeams: number;
  startDate: string; // ISO
  startLabel: string; // "12 IYN"
  endLabel: string; // "20 IYN"
  progress: number; // 0-100 (live uchun)
  format: string; // "Single Elim", "Round Robin"
  featured: boolean;
}

export interface CompetitionsData {
  hero: {
    eyebrow: { left: string; right: string };
    title: { line1: string; line2: string };
    description: string;
  };
  stats: {
    id: string;
    label: string;
    value: string;
  }[];
  filters: {
    id: string;
    label: string;
    count: number;
  }[];
  typeFilters: {
    id: string;
    label: string;
    count: number;
  }[];
  competitions: Competition[];
  featured: Competition;
  ticker: { id: string; text: string }[];
}
