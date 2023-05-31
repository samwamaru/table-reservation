import UserModel from "../models/User.model.js";
import dotenv from 'dotenv';
import otpGenerator from 'otp-generator';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

dotenv.config();






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

  export async function getUser(req, res) {
    try {
      const userId = req.user.userId;
  
      const user = await UserModel.findById(userId).select('-password');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.json({ user });
    } catch (error) {
      console.error('Error retrieving user:', error);
      return res.status(500).json({ error: 'Failed to retrieve user' });
    }
  }
  
  export const updateUser=  async(req, res)=> {
    try {
      const userId = req.user.userId;
      const { firstName, lastName, email, mobile } = req.body;
  
      // Find the user by ID
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update user's information
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.mobile = mobile;
  
      // Save the updated user
      await user.save();
  
      return res.json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Failed to update user' });
    }
  }
  
  // http://localhost:8080/api/generate-otp
 

  export const generateOTP = async (req, res) => {
    try {
      // Generate a six-character OTP
      req.app.locals.OTP =  await otpGenerator.generate(6,{ lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false});
  
      return res.json({code:  req.app.locals.OTP});
    } catch (error) {
      console.error('Error generating OTP:', error);
      return res.status(500).json({ error: 'Failed to generate OTP' });
    }
  };
  
  // http://localhost:8080/api/verify-otp
export async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}
  
  // http://localhost:8080/api/create-reset-session

  export const createResetSession = async (req,res)=>{
    if(req.app.locals.resetSession){
         return res.status(201).send({ flag : req.app.locals.resetSession})
    }
    return res.status(440).send({error : "Session expired!"})
 }
 export async function resetPassword(req, res) {
  try {
      if (!req.app.locals.resetSession) {
          return res.status(440).send({ error: "Session expired!" });
      }

      const { identifier, password } = req.body;

      try {
          UserModel.findOne({ $or: [{ mobile: identifier }, { email: identifier }] })
              .then(user => {
                  if (!user) {
                      return res.status(404).send({ error: "Identifier not found" });
                  }

                  bcrypt.hash(password, 10)
                      .then(hashedPassword => {
                          UserModel.updateOne({ _id: user._id },
                              { password: hashedPassword }
                          )
                              .then(() => {
                                  req.app.locals.resetSession = false; // reset session
                                  return res.status(201).send({ msg: "Record Updated...!" });
                              })
                              .catch(e => {
                                  return res.status(500).send({ error: "Unable to update password" });
                              });
                      })
                      .catch(e => {
                          return res.status(500).send({ error: "Unable to hash password" });
                      });
              })
              .catch(error => {
                  return res.status(500).send({ error });
              });
      } catch (error) {
          return res.status(500).send({ error });
      }
  } catch (error) {
      return res.status(401).send({ error });
  }
}
