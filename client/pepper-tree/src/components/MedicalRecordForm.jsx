import { useState } from 'react';
import { HiOutlineUser, HiOutlineCalendar, HiOutlinePencilAlt } from 'react-icons/hi';
import { useCreateMedicalRecordMutation } from '../slices/reservationApiSlice';

const MedicalRecordForm = () => {
    const initialPrescription = { medicine: '', dosage: '', frequency: '' };
    const initialTestResult = { testType: '', result: '' };
   const [newMedicalRecord,  {isLoading,isError}]= useCreateMedicalRecordMutation()
    const [formData, setFormData] = useState({
      patient: '',
      doctor: '',
      date: '',
      diagnosis: '',
      prescriptions: [initialPrescription],
      testResults: [initialTestResult],
    });
  
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const createdRecord = await newMedicalRecord(formData).unwrap();
          console.log('New medical record created:', createdRecord);
          // Further actions after successful record creation
        } catch (error) {
          console.error('Error creating medical record:', error);
          // Handle error scenarios
        }
      };
    
      // Other functions and form elements remain unchanged
  
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handlePrescriptionChange = (index, field, value) => {
      const updatedPrescriptions = [...formData.prescriptions];
      updatedPrescriptions[index][field] = value;
      setFormData({
        ...formData,
        prescriptions: updatedPrescriptions,
      });
    };
  
    const handleTestResultChange = (index, field, value) => {
      const updatedTestResults = [...formData.testResults];
      updatedTestResults[index][field] = value;
      setFormData({
        ...formData,
        testResults: updatedTestResults,
      });
    };
  
    const addPrescription = () => {
      setFormData((prevData) => ({
        ...prevData,
        prescriptions: [...prevData.prescriptions, initialPrescription],
      }));
    };
  
    const addTestResult = () => {
      setFormData((prevData) => ({
        ...prevData,
        testResults: [...prevData.testResults, initialTestResult],
      }));
    };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="patient" className="block text-gray-700 mb-1">Patient Name</label>
        <input
          type="text"
          id="patient"
          name="patient"
          value={formData.patient}
          onChange={handleChange}
          className="border rounded-md px-3 py-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="doctor" className="block text-gray-700 mb-1">Doctor Name</label>
        <input
          type="text"
          id="doctor"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          className="border rounded-md px-3 py-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 mb-1">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border rounded-md px-3 py-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="diagnosis" className="block text-gray-700 mb-1">Diagnosis</label>
        <textarea
          id="diagnosis"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          className="border rounded-md px-3 py-2 w-full"
        ></textarea>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Prescriptions</h3>
        {formData.prescriptions.map((prescription, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Medicine"
              value={prescription.medicine}
              onChange={(e) => handlePrescriptionChange(index, 'medicine', e.target.value)}
              className="border rounded-md px-3 py-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Dosage"
              value={prescription.dosage}
              onChange={(e) => handlePrescriptionChange(index, 'dosage', e.target.value)}
              className="border rounded-md px-3 py-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Frequency"
              value={prescription.frequency}
              onChange={(e) => handlePrescriptionChange(index, 'frequency', e.target.value)}
              className="border rounded-md px-3 py-2 w-full mb-2"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addPrescription}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Add Prescription
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Test Results</h3>
        {formData.testResults.map((testResult, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Test Type"
              value={testResult.testType}
              onChange={(e) => handleTestResultChange(index, 'testType', e.target.value)}
              className="border rounded-md px-3 py-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Result"
              value={testResult.result}
              onChange={(e) => handleTestResultChange(index, 'result', e.target.value)}
              className="border rounded-md px-3 py-2 w-full mb-2"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addTestResult}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Add Test Result
        </button>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default MedicalRecordForm;
