import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";



export async function verifyUser(req, res, next){
  try {
      
      const { username } = req.method == "GET" ? req.query : req.body;

      // check the user existance
      let exist = await UserModel.findOne({ username });
      if(!exist) return res.status(404).send({ error : "Can't find User!"});
      next();

  } catch (error) {
      return res.status(404).send({ error: "Authentication Error"});
  }
}


// http://localhost:8080/api/register
export async function register(req, res) {
    try {
      const { username, password, profile, email } = req.body;
  
      // Check existing username
      const existingUsername = await UserModel.findOne({ username });
      if (existingUsername) {
        return res.status(400).send({ error: "Please use a unique username" });
      }
  
      // Check existing email
      const existingEmail = await UserModel.findOne({ email });
      if (existingEmail) {
        return res.status(400).send({ error: "Please use a unique email" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new UserModel({
        username,
        password: hashedPassword,
        profile: profile || "",
        email,
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
    const { username, password } = req.body;

    // Find user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).send({ error: "Invalid username or password" });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "sjdhbhvbchbsabjabxjabxjb", {
      expiresIn: "1h",
    });

    return res.status(200).send({ token });
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
  