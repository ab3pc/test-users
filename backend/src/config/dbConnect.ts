import { Sequelize } from "sequelize";
import { getEnv } from "../common/helpers/env";

const dbName = getEnv("DB_NAME");
const dbHost = getEnv("DB_HOST");
const dbUsername = getEnv("DB_USER");
const dbPassword = getEnv("DB_PASS");
const dbDialect = "postgres";

const dbConnection = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
});

export { dbConnection };
