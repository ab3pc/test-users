import { Request, Response, NextFunction } from "express";
import { extractToken, responseData } from "../helpers/helpers";
import { HttpCode } from "../enums/http-code.enum";
import { ErrorMessage } from "../enums/enums";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

    if (token === null) {
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
    const result = extractToken(token as string);
    if (!result) {
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

    res.locals.userEmail = result?.email;
    next();
  } catch (err: any) {
    return res
      .status(500)
      .send(responseData(HttpCode.INTERNAL_SERVER_ERROR, "", err, null));
  }
};

export { isAuthenticated };
