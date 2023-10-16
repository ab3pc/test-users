import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import { responseData } from "../../helpers/helpers";
import { HttpCode } from "../../enums/http-code.enum";
import { ErrorMessage } from "../../enums/enums";
import { UserService } from "../../../services";

const updateUserValidation =
  (userService: UserService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fullname, email, phone, id } = req.body;
      const data = {
        id,
        fullname,
        email,
        phone,
      };

      const rules: Validator.Rules = {
        fullname: "required|string|max:30",
        email: "required|email",
        id: "required|integer",
        phone: "string",
      };

      const validate = new Validator(data, rules);

      if (validate.fails()) {
        return res
          .status(HttpCode.BAD_REQUEST)
          .send(
            responseData(
              HttpCode.BAD_REQUEST,
              ErrorMessage.BAD_REQUEST,
              validate.errors,
              null
            )
          );
      }
      userService.checkIsExistEmail(req, res, next,{userId: id, newEmail: email})
      
    } catch (error: any) {
      return res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .send(responseData(HttpCode.INTERNAL_SERVER_ERROR, "", error, null));
    }
  };

export { updateUserValidation };
