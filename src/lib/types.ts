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

export type AuthTab = "login" | "register";

export interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  game: string; // game id (cs2, dota2, ...)
  gameId: string; // in-game ID / Steam ID / Riot ID
  terms: boolean;
}

export interface AuthGame {
  id: string;
  name: string;
  shortName: string;
  icon: string;
}

export type GameId =
  | "cs2"
  | "dota2"
  | "valorant"
  | "lol"
  | "pubg"
  | "apex"
  | "r6"
  | "overwatch";
export type RankTier =
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Diamond"
  | "Master"
  | "Grandmaster"
  | "Elite";
export type MatchStatus = "live" | "upcoming" | "won" | "lost";

export interface PlayerProfile {
  id: string;
  nickname: string;
  realName: string;
  country: string;
  age: number;
  avatarInitials: string;
  joinedAt: string; // "2021"
  bio: string;
}

export interface PlayerTeam {
  id: string;
  name: string;
  tag: string;
  role: string; // "IGL", "AWP"
  joinedAt: string; // "2023"
  isCaptain: boolean;
}

export interface PlayerGameStat {
  gameId: GameId;
  gameName: string;
  gameShort: string;
  gameIcon: string;
  rank: RankTier;
  rankPoints: number;
  level: number;
  matches: number;
  wins: number;
  losses: number;
  winRate: number;
  kd: number;
  hoursPlayed: number;
  isPrimary: boolean;
  since: string; // "2021"
}

export interface PlayerLiveMatch {
  id: string;
  tournament: string;
  tournamentCode: string;
  game: GameId;
  gameShort: string;
  teamA: { name: string; tag: string; score: number };
  teamB: { name: string; tag: string; score: number };
  map: string;
  round: string;
  status: MatchStatus;
  viewers: string;
  startedAt: string; // "21:00"
}

export interface PlayerAchievement {
  id: string;
  title: string;
  tournament: string;
  placement: string; // "1st", "2nd"
  date: string;
  prize: string;
}

export interface PlayerActivityItem {
  id: string;
  type: "match" | "tournament" | "achievement";
  title: string;
  description: string;
  time: string;
}

export interface PlayerOverview {
  totalEarnings: string;
  totalMatches: number;
  totalWins: number;
  totalLosses: number;
  winRate: number;
  globalRank: number;
  totalHours: number;
  tournamentsPlayed: number;
}

export interface PlayData {
  system: {
    status: string;
    version: string;
    isLive: boolean;
  };
  profile: PlayerProfile;
  team: PlayerTeam;
  overview: PlayerOverview;
  games: PlayerGameStat[];
  liveMatch: PlayerLiveMatch | null;
  upcomingMatches: PlayerLiveMatch[];
  achievements: PlayerAchievement[];
  activity: PlayerActivityItem[];
  ticker: { id: string; text: string }[];
}

export type EventStatus = "live" | "upcoming" | "ended";
export type EventType =
  | "meetup"
  | "autograph"
  | "contest"
  | "show"
  | "workshop"
  | "tournament";
export type ActivityType = "quiz" | "prediction" | "vote" | "raffle";

export interface FanFestHero {
  eyebrow: { left: string; right: string };
  title: { line1: string; line2: string };
  description: string;
  dateLabel: string;
  location: string;
  attendees: string;
}

export interface FanFestStat {
  id: string;
  label: string;
  value: string;
}

export interface FanFestEvent {
  id: string;
  code: string;
  title: string;
  description: string;
  type: EventType;
  status: EventStatus;
  host: string;
  hostRole: string;
  time: string;
  duration: string;
  venue: string;
  capacity: number;
  registered: number;
  featured: boolean;
}

export interface FanFestActivity {
  id: string;
  title: string;
  description: string;
  type: ActivityType;
  reward: string;
  participants: string;
  endsAt: string;
  status: EventStatus;
}

export interface FanFestGuest {
  id: string;
  nickname: string;
  realName: string;
  role: string;
  team: string;
  country: string;
  initials: string;
  appearance: string;
}

export interface FanFestScheduleItem {
  id: string;
  time: string;
  title: string;
  stage: string;
  status: EventStatus;
}

export interface FanFestData {
  system: {
    status: string;
    version: string;
    isLive: boolean;
  };
  hero: FanFestHero;
  stats: FanFestStat[];
  filters: { id: string; label: string; count: number }[];
  events: FanFestEvent[];
  activities: FanFestActivity[];
  guests: FanFestGuest[];
  schedule: FanFestScheduleItem[];
  ticker: { id: string; text: string }[];
}

export type CreatorTier = "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";
export type Platform =
  | "twitch"
  | "youtube"
  | "tiktok"
  | "instagram"
  | "kick"
  | "twitter";
export type RequirementStatus = "met" | "partial" | "unmet";

export interface CreatorHero {
  eyebrow: { left: string; right: string };
  title: { line1: string; line2: string };
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface CreatorStat {
  id: string;
  label: string;
  value: string;
}

export interface CreatorBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface CreatorTierInfo {
  id: string;
  name: CreatorTier;
  color: string;
  followers: string;
  revenueShare: string;
  perks: string[];
  isFeatured: boolean;
}

export interface CreatorRequirement {
  id: string;
  label: string;
  description: string;
  status: RequirementStatus;
  current: string;
  target: string;
}

export interface CreatorStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface TopCreator {
  id: string;
  nickname: string;
  realName: string;
  initials: string;
  platform: Platform;
  followers: string;
  tier: CreatorTier;
  country: string;
  earnings: string;
}

export interface CreatorFaq {
  id: string;
  question: string;
  answer: string;
}

export interface CreatorProgramData {
  system: {
    status: string;
    version: string;
    isLive: boolean;
  };
  hero: CreatorHero;
  stats: CreatorStat[];
  benefits: CreatorBenefit[];
  tiers: CreatorTierInfo[];
  requirements: CreatorRequirement[];
  steps: CreatorStep[];
  topCreators: TopCreator[];
  faqs: CreatorFaq[];
  ticker: { id: string; text: string }[];
}
