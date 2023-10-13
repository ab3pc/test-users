import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import { responseData } from "../../helpers/helpers";
import { User } from "../../../db/models/models";
import { HttpCode } from "../../enums/http-code.enum";
import { ErrorMessage } from "../../enums/enums";

const registerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullname, email, phone, password, confirmPassword } = req.body;

    const data = {
      fullname,
      email,
      phone,
      password,
      confirmPassword,
    };

    const rules: Validator.Rules = {
      fullname: "required|string|max:30",
      email: "required|email",
      phone: "string",
      password: "required|min:8",
      confirmPassword: "required|same:password",
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

    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (user) {
      return res
        .status(400)
        .send(
          responseData(
            HttpCode.BAD_REQUEST,
            ErrorMessage.EMAIL_ALREADY_EXISTS,
            null,
            null
          )
        );
    }
    next();
  } catch (error: any) {
    return res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(responseData(HttpCode.INTERNAL_SERVER_ERROR, "", error, null));
  }
};

export { registerValidation };
