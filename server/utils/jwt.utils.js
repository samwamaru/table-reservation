import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export function signJwt(object, options) {
  return jwt.sign(object, secretKey, options);
}
