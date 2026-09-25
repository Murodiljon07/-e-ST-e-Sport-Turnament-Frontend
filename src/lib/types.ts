export interface BreakingNews {
  id: string;
  text: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
}

export interface UpcomingMatch {
  teamA: string;
  teamB: string;
  time: string;
}

export interface TickerItem {
  id: string;
  text: string;
}

export interface HeroData {
  system: {
    status: string;
    version: string;
    isLive: boolean;
  };
  eyebrow: {
    left: string;
    right: string;
  };
  title: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
  };
  description: string;
  ctas: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  stats: Stat[];
  breakingNews: BreakingNews[];
  upcomingMatch: UpcomingMatch;
  ticker: TickerItem[];
}

// turnament types
export type TournamentStatus = "live" | "upcoming" | "finished";
export type TournamentGame = "CS2" | "DOTA2" | "VALORANT" | "LOL" | "PUBG";

export interface Tournament {
  id: string;
  code: string; // "TRN-A1"
  title: string;
  game: TournamentGame;
  status: TournamentStatus;
  region: string;
  prize: string; // "$500K"
  teams: number;
  maxTeams: number;
  startDate: string; // ISO
  startLabel: string; // "12 IYN"
  progress: number; // 0-100 (live uchun)
}

export interface TournamentsData {
  system: {
    status: string;
    version: string;
    isLive: boolean;
  };
  eyebrow: {
    left: string;
    right: string;
  };
  heading: {
    line1: string;
    line2: string;
  };
  description: string;
  filters: { id: string; label: string; count: number }[];
  tournaments: Tournament[];
  ticker: { id: string; text: string }[];
}
