import { ServicesInit } from "../common/types";
import { Repositories } from "../repositories";
import { AuthService } from "./auth";
import { UserService } from "./user";

export const initServices = (repositories: Repositories): ServicesInit => {
  return {
    userService: new UserService(repositories.userRepository),
    authService: new AuthService(repositories.userRepository),
  };
};

export type Services = ReturnType<typeof initServices>;

export { type UserService, type AuthService };
