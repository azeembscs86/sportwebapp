import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
  MYSQL_HOST: z.string().default("localhost"),
  MYSQL_PORT: z.coerce.number().default(3306),
  MYSQL_USER: z.string().default("app_user"),
  MYSQL_PASSWORD: z.string().default("app_password"),
  MYSQL_DATABASE: z.string().default("sportwebapp"),
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().optional().default("")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const formatted = parsed.error.flatten().fieldErrors;
  throw new Error(`Invalid environment configuration: ${JSON.stringify(formatted)}`);
}

export const env = parsed.data;
