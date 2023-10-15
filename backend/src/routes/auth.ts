import { Router } from "express";
import { ApiPath } from "../common/enums/enums";
import { Services } from "../services";
import { isAuthenticated } from "../common/middleware/is-auth";
import { registerValidation } from "../common/middleware/validation/user-validation";

export function initAuthRoutes(
  { authService }: Services,
  path: typeof ApiPath
): Router {
  const router = Router();
  
  router.post(path.SIGN_IN, authService.login.bind(authService));
  router.post(
    path.SIGN_UP,
    registerValidation,
    authService.register.bind(authService)
  );
  router.get(
    path.ME,
    isAuthenticated,
    authService.userDetails.bind(authService)
  );

  return router;
}
