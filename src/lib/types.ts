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

export type TeamStatus = "active" | "recruiting" | "inactive";
export type TeamGame = "CS2" | "DOTA2" | "VALORANT" | "LOL" | "PUBG";

export interface TeamMember {
  id: string;
  nickname: string;
  role: string; // "IGL", "AWP", "Support" ...
  country: string; // "UZ", "KR", "SE" ...
}

export interface Team {
  id: string;
  code: string; // "TM-001"
  name: string;
  tag: string; // "PHM"
  game: TeamGame;
  status: TeamStatus;
  region: string;
  country: string; // "UZ"
  rank: number; // global rank
  points: number; // ranking points
  winRate: number; // 0-100
  wins: number;
  losses: number;
  members: TeamMember[];
  captain: string; // nickname
  founded: string; // "2023"
}

export interface TeamsData {
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
  teams: Team[];
  ticker: { id: string; text: string }[];
}

export type PlayerStatus = "free-agent" | "signed" | "retired";
export type PlayerRole =
  | "IGL"
  | "AWP"
  | "Entry"
  | "Support"
  | "Lurk"
  | "Duelist"
  | "Controller"
  | "Sentinel"
  | "Initiator"
  | "Flex"
  | "Carry"
  | "Mid"
  | "Offlane"
  | "Hard Support";

export interface Player {
  id: string;
  code: string; // "PL-0001"
  nickname: string;
  realName: string;
  country: string; // "UZ"
  age: number;
  role: PlayerRole;
  game: TeamGame; // CS2, DOTA2, ...
  status: PlayerStatus;
  teamId: string | null;
  teamName: string | null; // null = free agent
  teamTag: string | null;
  rank: number; // global rank
  rating: number; // 0-100 (HLTV-like)
  kd: number; // K/D ratio
  winRate: number; // 0-100
  matches: number;
  earnings: string; // "$45K"
  joinedAt: string; // "2023"
  streak: number; // +N / -N (win/loss streak)
}

export interface PlayersData {
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
  players: Player[];
  ticker: { id: string; text: string }[];
}
