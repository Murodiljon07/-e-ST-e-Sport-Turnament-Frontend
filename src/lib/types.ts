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
