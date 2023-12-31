import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface UserData {
  fullname: string | null;
  email: string | null;
  phone: string | null;
}

const generateToken = (data: any): string => {
  const token = jwt.sign(data, process.env.JWT_KEY as string, {
    expiresIn: "1d",
  });

  return token;
};

const generateRefreshToken = (data: any): string => {
  const token = jwt.sign(data, process.env.JWT_KEY as string, {
    expiresIn: "1d",
  });

  return token;
};

const extractToken = (token: string): UserData | null => {
  const secretKey: string = process.env.JWT_KEY as string;

  let resData: any;

  const res = jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      resData = null;
    } else {
      resData = decoded;
    }
  });

  if (resData) {
    const result: UserData = <UserData>resData;
    return result;
  }
  return null;
};

const extractRefreshToken = (token: string): UserData | null => {
  const secretKey: string = process.env.JWT_KEY as string;

  let resData: any;

  const res = jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      resData = null;
    } else {
      resData = decoded;
    }
  });

  if (resData) {
    const result: UserData = <UserData>resData;
    return result;
  }
  return null;
};

export {
  generateToken,
  generateRefreshToken,
  extractToken,
  extractRefreshToken,
};
