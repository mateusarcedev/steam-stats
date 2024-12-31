import { FastifyReply, FastifyRequest } from 'fastify';
import { CS2_CONFIG } from '../config/constants';
import { SteamService } from '../services/steam.service';
import { PlayerStats } from '../types/cs2.types';


export class CS2Controller {
  private readonly steamService: SteamService;

  constructor(apiKey: string) {
    this.steamService = new SteamService(apiKey);
  }

  async getPlayerStats(
    request: FastifyRequest<{ Params: { steamid: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { steamid } = request.params;
      const stats = await this.steamService.getPlayerStats(steamid, CS2_CONFIG.APPID);

      const filteredStats = stats.filter(stat =>
        CS2_CONFIG.DESIRED_STATS.includes(stat.name)
      );

      const playerStats: PlayerStats = {
        steamID: steamid,
        gameName: CS2_CONFIG.GAME_NAME,
        stats: filteredStats,
      };

      reply.send(playerStats);
    } catch (error) {
      reply.status(500).send({
        error: 'Erro ao buscar estatísticas do jogador no CS2. Certifique-se que seu perfil é público',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
}