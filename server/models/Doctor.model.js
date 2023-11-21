import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  role: {
    type: String,
    default: "doctor", // Set role as "doctor" for doctors
  },
  specialty: {
    type: String,
    required: true, // You can add specific fields like specialty for doctors
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
