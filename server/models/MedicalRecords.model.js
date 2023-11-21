import mongoose from 'mongoose';

const MedicalRecordSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  prescriptions: [{
    medicine: String,
    dosage: String,
    frequency: String,
    // Add more fields related to prescriptions as needed
  }],
  testResults: [{
    testType: String,
    result: String,
    // Add more fields related to test results as needed
  }],
  // Other fields such as notes, treatment plans, etc.
}, { timestamps: true });

const MedicalRecord = mongoose.model('MedicalRecord', MedicalRecordSchema);

export default MedicalRecord;
