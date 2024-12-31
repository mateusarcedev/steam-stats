//src/env/index.ts

import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
})


const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error("variáveis de ambiente inválidas!", _env.error.format())

  throw new Error("variáveis de ambiente inválidas!")
}

export const env = _env.data
