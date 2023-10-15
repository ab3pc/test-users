import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories";
import { getSortByValue, responseData } from "../common/helpers/helpers";
import { ErrorMessage, HttpCode, Messages } from "../common/enums/enums";

export class UserService {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const sortBy = req.query?.sort?.toString();
      const sortByValue = getSortByValue(sortBy);

      const users = await this._userRepository.getAll(
        sortByValue ?? null,
        "fullname"
      );

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
  }
  public async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id, fullname, email, phone } = req.body;

      const user = await this._userRepository.getById(id);

      if (!user) {
        return res
          .status(HttpCode.NOT_FOUND)
          .send(
            responseData(HttpCode.NOT_FOUND, ErrorMessage.NOT_FOUND, null, null)
          );
      }

      const result = await this._userRepository.updateUser(user, {
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
  }
  public async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body;

      const user = await this._userRepository.getById(id);

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
  }
  public async checkIsExistEmail(
    req: Request,
    res: Response,
    next: NextFunction,
    { userId, newEmail }: { userId: number; newEmail: string }
  ) {
    try {
      const currentUser = await this._userRepository.getById(userId);

      if (!currentUser) {
        return res
          .status(HttpCode.NOT_FOUND)
          .send(
            responseData(HttpCode.NOT_FOUND, ErrorMessage.NOT_FOUND, null, null)
          );
      }
      if (currentUser.email === newEmail) {
        next();
      } else {
        const existingUsers = await this._userRepository.getAllByEmail(
          newEmail
        );
        const isEmailAlreadyExist = Boolean(
          existingUsers?.filter((record) => record.id !== userId).length
        );
        if (isEmailAlreadyExist) {
          return res
            .status(HttpCode.BAD_REQUEST)
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
      }
    } catch (error) {
      return res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .send(responseData(HttpCode.INTERNAL_SERVER_ERROR, "", error, null));
    }
  }


}
