import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number, // Appointment duration in minutes
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'], // Appointment status
    default: 'pending',
  },
  reason: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
