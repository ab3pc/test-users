import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/routes";
import { getEnv } from "./common/helpers/helpers";
import { initRepositories } from "./repositories";
import { initServices } from "./services";
import { initRoutes } from "./routes";

const app = express();

const repositories = initRepositories();
const services = initServices(repositories);
const routes = initRoutes(services);
const port = getEnv("APP_PORT");

app
  .use(express.json())
  .use(cookieParser())
  .use(
    cors({
      credentials: true,
      origin: true,
    })
  )
  .use(routes)
  .listen(port, () => {
    console.log(`Running on port ${port}`);
  });
