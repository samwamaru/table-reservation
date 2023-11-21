import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Patient from '../models/Patient.model.js'; // Import the Patient model
import Doctor from '../models/Doctor.model.js'; // Import the Doctor model
import dotenv from 'dotenv';
dotenv.config();
const yourSecretKey = "your_secret_key_here";
export const authenticatePatient = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, yourSecretKey);

      req.patient = await Patient.findById(decoded.patientId).select('-password');

      if (!req.patient) {
        return res.status(401).json({ error: 'Unauthorized: Patient not found' });
      }

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ error: 'Your session has expired. Please log in again.' });
      } else {
        console.error(error);
        res.status(401).json({ error: 'Not authorized, token failed' });
      }
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
});

export const authenticateDoctor = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, yourSecretKey);

      req.doctor = await Doctor.findById(decoded.doctorId).select('-password');

      if (!req.doctor) {
        return res.status(401).json({ error: 'Unauthorized: Doctor not found' });
      }

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ error: 'Your session has expired. Please log in again.' });
      } else {
        console.error(error);
        res.status(401).json({ error: 'Not authorized, token failed' });
      }
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
});
