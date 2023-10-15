import { Request, Response } from "express";
import { UserRepository } from "../repositories";
import { generateRefreshToken, generateToken, getSortByValue, passwordCompare, passwordHashing, responseData } from "../common/helpers/helpers";
import { ErrorMessage, HttpCode, Messages } from "../common/enums/enums";

export class AuthService {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async userDetails(req: Request, res: Response): Promise<Response> {
    try {
      const email = res.locals.userEmail;
      const user = await  this._userRepository.getByEmail(email)
  
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
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;  
      const user = await this._userRepository.getByEmail(email);
 
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
  }
  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const { fullname, email, phone, password } = req.body;
      const hashed = await passwordHashing(password);
      const token = generateToken({ fullname, email, phone });
      const user = await this._userRepository.create({
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

}
}