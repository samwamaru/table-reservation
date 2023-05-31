import dotenv from "dotenv"
import UserModel from "../models/User.model.js";
import  jwt  from "jsonwebtoken";

dotenv.config()
export function verifyUser(req, res, next) {
    const token = req.headers.authorization
  
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized: No token provided' });
    }
  
    try {
      const decoded =  jwt.verify(token, process.env.JWT_SECRET);
  
      // Attach the decoded user information to the request object
      req.user = decoded;
    
      next();
    } catch (error) {
      return res.status(401).send({ error: 'Unauthorized: Invalid token' });
    }
  }
  
  
  
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
  
  