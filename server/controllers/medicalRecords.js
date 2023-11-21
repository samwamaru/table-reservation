import MedicalRecord from '../models/MedicalRecords.model.js';

// Create a new medical record
export const createMedicalRecord = async (req, res) => {
  try {
    const { patientId, doctorId, diagnosis, prescriptions, testResults } = req.body;

    const newMedicalRecord = await MedicalRecord.create({
      patient: patientId,
      doctor: doctorId,
      diagnosis,
      prescriptions,
      testResults,
    });

    res.status(201).json({ medicalRecord: newMedicalRecord });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error creating medical record' });
  }
};

// Get all medical records
export const getAllMedicalRecords = async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.find().populate('patient').populate('doctor');
    res.status(200).json({ medicalRecords });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching medical records' });
  }
};

// Get medical record by ID
export const getMedicalRecordById = async (req, res) => {
  try {
    const { recordId } = req.params;

    const medicalRecord = await MedicalRecord.findById(recordId)
      .populate('patient', 'name dateOfBirth') // Include only necessary patient info
      .populate('doctor', 'name specialization'); // Include only necessary doctor info

    if (!medicalRecord) {
      res.status(404).json({ error: 'Medical record not found' });
      return;
    }

    // Extract relevant information from the medical record
    const { diagnosis, prescriptions, testResults } = medicalRecord;

    // Construct a limited response object with necessary details
    const limitedMedicalRecord = {
      patient: medicalRecord.patient,
      doctor: medicalRecord.doctor,
      diagnosis,
      prescriptions,
      testResults,
    };

    res.status(200).json({ medicalRecord: limitedMedicalRecord });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching medical record' });
  }
};

// Update medical record by ID
export const updateMedicalRecord = async (req, res) => {
  try {
    const { recordId } = req.params;
    const { diagnosis, prescriptions, testResults } = req.body;

    const updatedRecord = await MedicalRecord.findByIdAndUpdate(
      recordId,
      { diagnosis, prescriptions, testResults },
      { new: true }
    );

    if (!updatedRecord) {
      res.status(404).json({ error: 'Medical record not found' });
      return;
    }
    res.status(200).json({ medicalRecord: updatedRecord });
  } catch (error) {
    res.status(400).json({ error: 'Error updating medical record' });
  }
};

// Delete medical record by ID
export const deleteMedicalRecord = async (req, res) => {
  try {
    const { recordId } = req.params;
    const deletedRecord = await MedicalRecord.findByIdAndDelete(recordId);
    if (!deletedRecord) {
      res.status(404).json({ error: 'Medical record not found' });
      return;
    }
    res.status(200).json({ message: 'Medical record deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting medical record' });
  }
};
