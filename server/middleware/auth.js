
import UserModel from "../models/User.model.js";
import  jwt  from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import dotenv from "dotenv"
dotenv.config()

  export const  verifyUser = asyncHandler(async(req,res,next)=>{

let token
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserModel.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});





  
  
export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}

  export async function verifyAdmin(req, res, next) {
    const userId = req.user.userId;
  
    try {
      const user = await UserModel.findOne({ _id: userId });
  
      if (!user) {
        return res.status(401).send({ error: 'Unauthorized: User not found' });
      }
  
      if (user.role !== 'admin') {
        return res.status(403).send({ error: 'Forbidden: Access denied' });
      }
  
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: 'Internal server error' });
    }
  }
  
  