export interface CS2Stat {
  name: string;
  value: number;
}

export interface PlayerStats {
  steamID: string;
  gameName: string;
  stats: CS2Stat[];
}