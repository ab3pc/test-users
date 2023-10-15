import { UserRepository } from "../../../repositories";
import { AuthService, UserService } from "../../../services";

export type RepositoriesInit = {
  userRepository: UserRepository;
};

export type ServicesInit = {
  userService: UserService;
  authService: AuthService;
};
