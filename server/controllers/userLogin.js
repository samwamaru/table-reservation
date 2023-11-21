import Patient from '../models/Patient.model.js'; 
import Doctor from '../models/Doctor.model.js';
import dotenv from 'dotenv';
import otpGenerator from 'otp-generator';
import bcrypt from "bcrypt"
import asyncHandler from 'express-async-handler';
import jwt from "jsonwebtoken";
// import { getGoogleOAuthTokens,getGoogleUser,findAndUpdateUser } from "../services/userServices.js";
// // import { createSession } from "../services/sessionServices.js";

dotenv.config();






// http://localhost:8080/api/register




const yourSecretKey = "your_secret_key_here";

export const registerDoctor = asyncHandler(async (req, res) => {
  const { name, email, password, specialty } = req.body;

  const doctorExists = await Doctor.findOne({ email });

  if (doctorExists) {
    res.status(400);
    throw new Error('Doctor already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const doctor = await Doctor.create({
    name,
    email,
    password: hashedPassword,
    specialty,
  });

  if (doctor) {
    const token = jwt.sign({ doctorId: doctor._id }, yourSecretKey, {
      expiresIn: '30d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      _id: doctor._id,
      email: doctor.email,
      name: doctor.name,
      role:doctor.role,
      specialty: doctor.specialty,
      createdAt: doctor.createdAt,
    });
  } else {
    res.status(400);
    throw new Error('Invalid doctor data');
  }
});




export const registerPatient = asyncHandler(async (req, res) => {
  const { name, dob, mobile, email, bloodGroup, address, password, diseases, contactPerson } = req.body;

  const patientExists = await Patient.findOne({ email });

  if (patientExists) {
    res.status(400);
    throw new Error('Patient already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const patient = await Patient.create({
    name,
    dob,
    mobile,
    email,
    bloodGroup,
    address,
    password: hashedPassword,
    diseases,
    contactPerson,
  });

  if (patient) {
    const token = jwt.sign({ patientId: patient._id }, yourSecretKey, {
      expiresIn: '30d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      _id: patient._id,
      email: patient.email,
      name: patient.name,
      bloodGroup: patient.bloodGroup,
      createdAt: patient.createdAt,
    });
  } else {
    res.status(400);
    throw new Error('Invalid patient data');
  }
});


// @desc    Logout 

  // http://localhost:8080/api/login



  
  
  export const loginPatient = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const patient = await Patient.findOne({ email });
  
    if (patient && (await bcrypt.compare(password, patient.password))) {
      const token = jwt.sign({ patientId: patient._id },yourSecretKey , {
        expiresIn: '30d',
      });
  
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
  
      res.status(200).json({
        _id: patient._id,
        email: patient.email,
        name: patient.name,
        bloodGroup: patient.bloodGroup,
        createdAt: patient.createdAt,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });
  
  export const updatePatientInfo = asyncHandler(async (req, res) => {
    const { name, dob, mobile, email, bloodGroup, address, password, diseases, contactPerson } = req.body;
  
    // Get the patient ID from the authenticated token
    const patientId = req.patient._id;
  
    try {
      let patient = await Patient.findById(patientId);
  
      if (!patient) {
        res.status(404);
        throw new Error('Patient not found');
      }
  
      // Update patient information
      patient.name = name || patient.name;
      patient.dob = dob || patient.dob;
      patient.mobile = mobile || patient.mobile;
      patient.email = email || patient.email;
      patient.bloodGroup = bloodGroup || patient.bloodGroup;
      patient.address = address || patient.address;
      patient.diseases = diseases || patient.diseases;
      patient.contactPerson = contactPerson || patient.contactPerson;
  
      // If password is provided, hash and update it
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        patient.password = hashedPassword;
      }
  
      const updatedPatient = await patient.save();
  
      res.status(200).json({
        _id: updatedPatient._id,
        email: updatedPatient.email,
        name: updatedPatient.name,
        bloodGroup: updatedPatient.bloodGroup,
        createdAt: updatedPatient.createdAt,
      });
    } catch (error) {
      res.status(400).json({ error: error.message || 'Error updating patient information' });
    }
  });
  

export const loginDoctor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const doctor = await Doctor.findOne({ email });

  if (doctor && (await bcrypt.compare(password, doctor.password))) {
    const token = jwt.sign({ doctorId: doctor._id }, yourSecretKey, {
      expiresIn: '30d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({
      _id: doctor._id,
      email: doctor.email,
      name: doctor.name,
      specialty: doctor.specialty,
      createdAt: doctor.createdAt,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export const updateDoctorInfo = asyncHandler(async (req, res) => {
  const { name, email, password, speciality, hospital, contact } = req.body;

  // Get the doctor ID from the authenticated token
  const doctorId = req.doctor._id;

  try {
    let doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      res.status(404);
      throw new Error('Doctor not found');
    }

    // Update doctor information
    doctor.name = name || doctor.name;
    doctor.email = email || doctor.email;
    doctor.speciality = speciality || doctor.speciality;
    doctor.hospital = hospital || doctor.hospital;
    doctor.contact = contact || doctor.contact;

    // If password is provided, hash and update it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      doctor.password = hashedPassword;
    }

    const updatedDoctor = await doctor.save();

    res.status(200).json({
      _id: updatedDoctor._id,
      email: updatedDoctor.email,
      name: updatedDoctor.name,
      speciality: updatedDoctor.speciality,
      hospital: updatedDoctor.hospital,
      contact: updatedDoctor.contact,
      createdAt: updatedDoctor.createdAt,
    });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error updating doctor information' });
  }
});

  
   export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await UserModel.findOne({ email });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
  
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
  
    
    

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        msg: "logged in succesfully"
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });
  
  // http://localhost:8080/api/user

  export const getDoctor = asyncHandler(async (req, res) => {
    const doctor = {
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      createdAt: req.user.createdAt,
      // Add doctor-specific fields here
    };
    res.status(200).json({ doctor });
  });
  
  export const getPatient = asyncHandler(async (req, res) => {
    const patient = {
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      createdAt: req.user.createdAt,
      // Add patient-specific fields here
    };
    res.status(200).json({ patient });
  });
  
  
  export const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };
 export const updateUser = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });
  
  
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

//   export const createResetSession = async (req,res)=>{
//     if(req.app.locals.resetSession){
//          return res.status(201).send({ flag : req.app.locals.resetSession})
//     }
//     return res.status(440).send({error : "Session expired!"})
//  }
//  export async function resetPassword(req, res) {
//   try {
//       if (!req.app.locals.resetSession) {
//           return res.status(440).send({ error: "Session expired!" });
//       }

//       const { identifier, password } = req.body;

//       try {
//           UserModel.findOne({ $or: [{ mobile: identifier }, { email: identifier }] })
//               .then(user => {
//                   if (!user) {
//                       return res.status(404).send({ error: "Identifier not found" });
//                   }

//                   bcrypt.hash(password, 10)
//                       .then(hashedPassword => {
//                           UserModel.updateOne({ _id: user._id },
//                               { password: hashedPassword }
//                           )
//                               .then(() => {
//                                   req.app.locals.resetSession = false; // reset session
//                                   return res.status(201).send({ msg: "Record Updated...!" });
//                               })
//                               .catch(e => {
//                                   return res.status(500).send({ error: "Unable to update password" });
//                               });
//                       })
//                       .catch(e => {
//                           return res.status(500).send({ error: "Unable to hash password" });
//                       });
//               })
//               .catch(error => {
//                   return res.status(500).send({ error });
//               });
//       } catch (error) {
//           return res.status(500).send({ error });
//       }
//   } catch (error) {
//       return res.status(401).send({ error });
//   }
// }


// // const accessTokenCookieOptions: CookieOptions = {
// //   maxAge: 900000, // 15 mins
// //   httpOnly: true,
// //   domain: "localhost",
// //   path: "/",
// //   sameSite: "lax",
// //   secure: false,
// // };

// // const refreshTokenCookieOptions: CookieOptions = {
// //   ...accessTokenCookieOptions,
// //   maxAge: 3.154e10, // 1 year
// // };


// export async function googleOauthHandler(req, res) {
//   const code = req.query.code;

//   try {
//     const { id_token, access_token } = await getGoogleOAuthTokens({ code });
//     console.log({ id_token, access_token });

//     const googleUser = await getGoogleUser({ id_token, access_token });
//     console.log({ googleUser });

//     if (!googleUser.verified_email) {
//       return res.status(403).send("Google account is not verified");
//     }

//     const user = await findAndUpdateUser(
//       {
//         email: googleUser.email,
//       },
//       {
//         email: googleUser.email,
//         name: googleUser.name,
//       },
//       {
//         upsert: true,
//         new: true,
//       }
//     );

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "24h",
//     });
// console.log("token",token )
//     // Set JWT token as a cookie
//     // res.cookie("jwt", token, {
//     //   maxAge: 900000, // 15 minutes
//     //   httpOnly: true,
//     //   domain: "localhost",
//     //   path: "/",
//     //   sameSite: "lax",
//     //   secure: false,
//     // });

//     res.cookie('jwt', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
//       sameSite: 'strict', // Prevent CSRF attacks
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     });
  

  

// res.redirect(process.env.ORIGIN);

//   } catch (error) {
//     console.log(error, "Failed to authorize Google user");
//     return res.redirect(`${process.env.ORIGIN}/oauth/error`);
//   }
// }

