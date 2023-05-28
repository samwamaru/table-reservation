import UserModel from "../models/User.model.js";
import dotenv from 'dotenv';

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

dotenv.config();


export function verifyUser(req, res, next) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).send({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;
  
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Unauthorized: Invalid token' });
  }
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





// http://localhost:8080/api/register
export async function register(req, res) {
  try {
    const { mobile, password, profile, email ,firstName,lastName } = req.body;

    // Check existing phone number
    const existingPhone = await UserModel.findOne({ mobile });
    if (existingPhone) {
      return res.status(400).send({ error: "Please use a unique phone number" });
    }

    // Check existing email
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ error: "Please use a unique email" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      mobile,
      password: hashedPassword,
      profile: profile || "",
      email,
      firstName,
      lastName,
    });

    // Save user
    const result = await user.save();

    return res.status(201).send({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
}

  // http://localhost:8080/api/login



  export async function login(req, res) {
    try {
      const { identifier, password } = req.body;
      console.log('Request Body:', req.body);

  
      console.log('Identifier:', identifier);
  
      // Find user by phone number or email
      const user = await UserModel.findOne({
        $or: [{ mobile: identifier }, { email: identifier }],
      });
  
      console.log('User:', user);
  
      if (!user) {
        console.log('User not found');
        return res.status(401).send({ error: "Invalid phone number or email" });
      }
  
      // Compare password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.log('Invalid password');
        return res.status(401).send({ error: "Invalid phone number or email or password" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
  
      return res.status(200).send({
        token,
        message: "Logged in successfully",
        user:user.firstName
        
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  }
  
  // http://localhost:8080/api/user
  export const getUser = async (req, res) => {
    res.json("getUser route");
  };
  
  // http://localhost:8080/api/generate-otp
  export const generateOTP = async (req, res) => {
    res.json("generateOTP route");
  };
  
  // http://localhost:8080/api/verify-otp
  export const verifyOTP = async (req, res) => {
    res.json("verifyOTP route");
  };
  
  // http://localhost:8080/api/create-reset-session
  export const createResetSession = async (req, res) => {
    res.json("createResetSession route");
  };
  export const resetPassword = async (req, res) => {
    res.json("resetPassword route");
  };
  export const updateUser = async (req, res) => {
    res.json("updateUser route");
  };
  