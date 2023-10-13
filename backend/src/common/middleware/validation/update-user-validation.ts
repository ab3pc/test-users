import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import { responseData } from "../../helpers/helpers";
import { User } from "../../../db/models/models";
import { HttpCode } from "../../enums/http-code.enum";
import { ErrorMessage } from "../../enums/enums";

const updateUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    const currentUser = await User.findOne({
      where: {
        id: data.id,
      },
    });

    if (!currentUser) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(
          responseData(HttpCode.NOT_FOUND, ErrorMessage.NOT_FOUND, null, null)
        );
    }
    if (currentUser.email === email) {
      next();
    } else {
      const existingUsers = await User.findAll({
        where: {
          email: data.email,
        },
      });
      const isEmailAlreadyExist = Boolean(
        existingUsers.filter((record) => record.id !== id).length
      );
      if (isEmailAlreadyExist) {
        return res
          .status(HttpCode.BAD_REQUEST)
          .send(responseData(HttpCode.BAD_REQUEST, ErrorMessage.EMAIL_ALREADY_EXISTS, null, null));
      }

      next();
    }

    // const emailAlreadyTaken = existUsers.filter(user => user.email === email)
    // if (user) {
    //   const errorData = {
    //     errors: {
    //       email: [ErrorMessage.EMAIL_ALREADY_EXISTS],
    //     },
    //   };
    //   return res
    //     .status(HttpCode.BAD_REQUEST)
    //     .send(
    //       responseData(
    //         HttpCode.BAD_REQUEST,
    //         ErrorMessage.BAD_REQUEST,
    //         errorData,
    //         null
    //       )
    //     );
    // }
  } catch (error: any) {
    return res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(responseData(HttpCode.INTERNAL_SERVER_ERROR, "", error, null));
  }
};

export { updateUserValidation };
