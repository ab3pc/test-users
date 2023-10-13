import { Router } from "express";
import { ApiPath } from "../common/enums/api-path.enum";
import { registerValidation } from "../common/middleware/validation/user-validation";
import { isAuthenticated } from "../common/middleware/is-auth";
import {
  getUsers,
  login,
  logout,
  register,
  userDetail,
} from "../controllers/controllers";
import { updateUserValidation } from "../common/middleware/validation/update-user-validation";
import { deleteUser, updateUser } from "../controllers/user-controller";

const router = Router();

router.post(ApiPath.SIGN_UP, registerValidation, register);
router.post(ApiPath.SIGN_IN, login);
router.get(ApiPath.ME, isAuthenticated, userDetail);
router.get(ApiPath.LOG_OUT, isAuthenticated, logout);
router.get(ApiPath.USERS, isAuthenticated, getUsers);
router.patch(ApiPath.USERS, isAuthenticated, updateUserValidation, updateUser);
router.delete(ApiPath.USERS, isAuthenticated, deleteUser);

export default router;
