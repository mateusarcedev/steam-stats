import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { CS2Controller } from '../controllers/cs2.controller';

// Interface para definir os parâmetros esperados na rota
interface CS2RouteParams {
  Params: {
    steamid: string;
  }
}

async function gameRoutes(fastify: FastifyInstance): Promise<void> {
  const cs2Controller = new CS2Controller(process.env.STEAM_API_KEY!);

  fastify.get<CS2RouteParams>('/cs2/:steamid', (request, reply) =>
    cs2Controller.getPlayerStats(request, reply)
  );
}

export default gameRoutes;