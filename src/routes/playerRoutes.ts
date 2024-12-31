import { FastifyInstance } from "fastify";
import axios from "axios";

async function playerRoutes(fastify: FastifyInstance) {

  fastify.get('/player/:steamid', async (request, reply) => {
    const { steamid }: any = request.params;
    const apiKey = process.env.STEAM_API_KEY;

    try {
      const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/`, {
        params: {
          key: apiKey,
          steamids: steamid,
        }
      });
      reply.send(response.data)
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar dados do jogador.' });
    }
  })
}

export default playerRoutes;