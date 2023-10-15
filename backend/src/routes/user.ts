import { Router } from "express";
import { ApiPath } from "../common/enums/enums";
import { Services } from "../services";
import { isAuthenticated } from "../common/middleware/is-auth";
import { updateUserValidation } from "../common/middleware/validation/update-user-validation";

export function initUserRoutes(
  { userService }: Services,
  path: ApiPath
): Router {
  const router = Router();

  router.get(path, isAuthenticated, userService.getUsers.bind(userService));

  router.delete(
    path,
    isAuthenticated,
    userService.deleteUser.bind(userService)
  );

  router.patch(
    path,
    isAuthenticated,
    updateUserValidation(userService),
    userService.updateUser.bind(userService)
  );

  return router;
}
