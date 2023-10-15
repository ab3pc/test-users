import { Router } from "express";
import { Services } from "../services";
import { initUserRoutes } from "./user";
import { ApiPath } from "../common/enums/enums";
import { initAuthRoutes } from "./auth";

export const initRoutes = (services: Services): Router[] => [
  initUserRoutes(services, ApiPath.USERS),
  initAuthRoutes(services, ApiPath),
];
