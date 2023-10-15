import { Request, Response } from "express";
import { User } from "../db/models/models";

import { ErrorMessage, HttpCode, Messages } from "../common/enums/enums";
import {
  extractRefreshToken,
  generateToken,
  getSortByValue,
  responseData,
} from "../common/helpers/helpers";
import { dbConnection } from "../config/dbConnect";

const refreshToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .send(
          responseData(
            HttpCode.UNAUTHORIZED,
            ErrorMessage.UNAUTHORIZED_USER,
            null,
            null
          )
        );
    }

    const decodedUser = extractRefreshToken(refreshToken);
    if (!decodedUser) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .send(
          responseData(
            HttpCode.UNAUTHORIZED,
            ErrorMessage.UNAUTHORIZED_USER,
            null,
            null
          )
        );
    }

    const token = generateToken({
      fullname: decodedUser.fullname,
      email: decodedUser.email,
      phone: decodedUser.phone,
    });

    const resultUser = {
      fullname: decodedUser.fullname,
      email: decodedUser.email,
      phone: decodedUser.phone,
      token,
    };

    return res
      .status(HttpCode.OK)
      .send(responseData(HttpCode.OK, Messages.OK, null, resultUser));
  } catch (error) {
    return res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(responseData(HttpCode.INTERNAL_SERVER_ERROR, "", error, null));
  }
};

const userDetails = async (req: Request, res: Response): Promise<Response> => {
  try {
    const email = res.locals.userEmail;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(
          responseData(HttpCode.NOT_FOUND, ErrorMessage.NOT_FOUND, null, null)
        );
    }

    const {
      dataValues: { password, accessToken, ...values },
    } = user;

    return res
      .status(HttpCode.OK)
      .send(responseData(HttpCode.OK, Messages.OK, null, values));
  } catch (error) {
    return res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(responseData(HttpCode.INTERNAL_SERVER_ERROR, "", error, null));
  }
};

const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const sortBy = req.query?.sort?.toString();
    const sortByValue = getSortByValue(sortBy);
    const users = await User.findAll({
      attributes: ["id", "fullname", "email", "phone"],
      where: {
        isActive: true,
      },
     ...(sortByValue && {order: [[dbConnection.col("fullname"), sortByValue]]}),
    });

    if (!users) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(
          responseData(HttpCode.NOT_FOUND, ErrorMessage.NOT_FOUND, null, null)
        );
    }

    return res
      .status(HttpCode.OK)
      .send(responseData(HttpCode.OK, Messages.OK, null, users));
  } catch (error) {
    return res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(responseData(HttpCode.INTERNAL_SERVER_ERROR, "", error, null));
  }
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id, fullname, email, phone } = req.body;

    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(
          responseData(HttpCode.NOT_FOUND, ErrorMessage.NOT_FOUND, null, null)
        );
    }
    const result = await user.update({
      fullname,
      email,
      phone,
    });

    const {
      dataValues: { password, accessToken, ...values },
    } = result;

    return res
      .status(HttpCode.OK)
      .send(responseData(HttpCode.OK, Messages.OK, null, values));
  } catch (error) {
    return res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(responseData(HttpCode.INTERNAL_SERVER_ERROR, "", error, null));
  }
};
const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.body;

    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(
          responseData(HttpCode.NOT_FOUND, ErrorMessage.NOT_FOUND, null, null)
        );
    }
    const result = await user.update({
      isActive: false,
    });

    const {
      dataValues: { password, accessToken, ...values },
    } = result;

    return res
      .status(HttpCode.OK)
      .send(responseData(HttpCode.OK, Messages.OK, null, values));
  } catch (error) {
    return res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(responseData(HttpCode.INTERNAL_SERVER_ERROR, "", error, null));
  }
};

export { getUsers, refreshToken, userDetails, updateUser, deleteUser };
