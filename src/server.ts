import Fastify from 'fastify';
import { env } from './env'; // Importando o arquivo de variáveis de ambiente
import playerRoutes from './routes/playerRoutes';
import gameRoutes from './routes/gameRoutes';

// Cria o servidor Fastify
const fastify = Fastify({ logger: true });

// Registra as rotas
fastify.register(playerRoutes);
fastify.register(gameRoutes);

// Inicializa o servidor
const start = async () => {
  try {
    await fastify.listen({ port: env.PORT, host: '0.0.0.0' });
    fastify.log.info(`Servidor rodando em http://localhost:${env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
