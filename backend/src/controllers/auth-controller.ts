import { Request, Response } from "express";
import {
  generateRefreshToken,
  generateToken,
  passwordCompare,
  passwordHashing,
  responseData,
} from "../common/helpers/helpers";
import { User } from "../db/models/models";
import { ErrorMessage, HttpCode, Messages } from "../common/enums/enums";

const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { fullname, email, phone, password } = req.body;
    const hashed = await passwordHashing(password);
    const token = generateToken({ fullname, email, phone });
    const user = await User.create({
      fullname,
      phone,
      email,
      password: hashed,
      accessToken: token,
    });
    const responseUser = {
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
      },
      token,
    };

    return res
      .status(HttpCode.CREATED)
      .send(
        responseData(HttpCode.CREATED, Messages.USER_CREATED, null, responseUser)
      );
  } catch (error: any) {
    return res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(
        responseData(
          HttpCode.INTERNAL_SERVER_ERROR,
          ErrorMessage.UNKNOWN_ERROR,
          error,
          null
        )
      );
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .send(
          responseData(
            HttpCode.UNAUTHORIZED,
            ErrorMessage.INCORRECT_DATA,
            null,
            null
          )
        );
    }

    const matched = await passwordCompare(password, user.password);
    if (!matched) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .send(
          responseData(
            HttpCode.UNAUTHORIZED,
            ErrorMessage.INCORRECT_DATA,
            null,
            null
          )
        );
    }

    const dataUser = {
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
    };
    const token = generateToken(dataUser);
    const refreshToken = generateRefreshToken(dataUser);

    user.accessToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const responseUser = {
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
      },
      token,
    };
    return res
      .status(HttpCode.OK)
      .send(responseData(HttpCode.OK, Messages.OK, null, responseUser));
  } catch (error) {
    return res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(responseData(HttpCode.INTERNAL_SERVER_ERROR, "", error, null));
  }
};

const logout = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res
        .status(HttpCode.OK)
        .send(responseData(HttpCode.OK, Messages.USER_LOGOUT, null, null));
    }
    const email = res.locals.userEmail;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.clearCookie("refreshToken");
      return res
        .status(HttpCode.OK)
        .send(responseData(HttpCode.OK, Messages.USER_LOGOUT, null, null));
    }

    await user.update({ accessToken: null }, { where: { email: email } });
    res.clearCookie("refreshToken");
    return res
      .status(HttpCode.OK)
      .send(responseData(HttpCode.OK, Messages.USER_LOGOUT, null, null));
  } catch (error) {
    return res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(responseData(HttpCode.INTERNAL_SERVER_ERROR, "", error, null));
  }
};

export { register, login, logout };
