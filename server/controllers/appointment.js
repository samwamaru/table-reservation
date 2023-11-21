import Appointment from '../models/Appointment.model.js';

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate,    duration, reason } = req.body;

    // Create the appointment
    const appointment = await Appointment.create({
      patient :patientId,
      doctor :doctorId,
      appointmentDate,
      duration,
      reason,
    });

    res.status(201).json({ appointment });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Appointment creation failed' });
  }
};

// Doctor updates appointment status
export const updateAppointmentStatus = async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const { status } = req.body;
  
      // Find the appointment by ID and update its status
      const appointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { status },
        { new: true }
      );
  
      if (!appointment) {
        res.status(404).json({ error: 'Appointment not found' });
        return;
      }
  
      res.status(200).json({ appointment });
    } catch (error) {
      res.status(500).json({ error: 'Appointment update failed' });
    }
  };
  
  // Get all appointments
export const getAllAppointments = async (req, res) => {
    try {
      // Retrieve all appointments
      const appointments = await Appointment.find();
  
      res.status(200).json({ appointments });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching appointments' });
    }
  };
  