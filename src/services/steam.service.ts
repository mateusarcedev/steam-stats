import axios from 'axios';
import { CS2Stat } from '../types/cs2.types';


export class SteamService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getPlayerStats(steamId: string, appId: number): Promise<CS2Stat[]> {
    const response = await axios.get(this.baseUrl, {
      params: {
        appid: appId,
        key: this.apiKey,
        steamid: steamId,
      },
    });

    return response.data.playerstats.stats;
  }
}