export type Steps = "one" | "two" | "three";

export interface MainGame {
  game: string;
  playerId: string;
}

export interface Game {
  name: string;
  playerId: string;
}

export interface FormData {
  avatar: string;
  fullName: string;
  nickname: string;
  email: string;
  password: string;
  age: number;
  country: string;
  mainGame: MainGame;
  games: Game[];
}

export interface Errors {
  [key: string]: string;
}

export interface TempGame {
  name: string;
  playerId: string;
}
