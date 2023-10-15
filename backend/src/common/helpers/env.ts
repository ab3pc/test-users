import dotenv from "dotenv";
dotenv.config();

type ProcessEnvKey = "APP_PORT";

type AuthEnvKeys = "JWT_KEY";

type DBEnvKeys = "DB_HOST" | "DB_NAME" | "DB_USER" | "DB_PORT" | "DB_PASS";

type EnvKeys = ProcessEnvKey | AuthEnvKeys | DBEnvKeys;

export const getEnv = (key: EnvKeys): string => process?.env[key] || '';
