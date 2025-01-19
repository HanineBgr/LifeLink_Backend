import Appointment from '../models/appointment.js'; 

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const { patient, doctor, appointmentDate, status, notes } = req.body;

    // Create a new appointment
    const newAppointment = new Appointment({
      patient,
      doctor,
      appointmentDate,
      status,
      notes,
    });

    await newAppointment.save();

    res.status(201).json({ message: 'Appointment created successfully!', appointment: newAppointment });
  } catch (err) {
    res.status(500).json({ message: 'Error creating appointment', error: err.message });
  }
};

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient doctor') 
      .sort({ appointmentDate: 1 }); 

    res.status(200).json({ appointments });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err.message });
  }
};

// Get appointments by patient ID
export const getAppointmentsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const appointments = await Appointment.find({ patient: patientId })
      .populate('doctor') 
      .sort({ appointmentDate: 1 });

    res.status(200).json({ appointments });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching patient appointments', error: err.message });
  }
};

// Get appointments by doctor ID
export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const appointments = await Appointment.find({ doctor: doctorId })
      .populate('patient') 
      .sort({ appointmentDate: 1 });

    res.status(200).json({ appointments });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching doctor appointments', error: err.message });
  }
};

// Update an appointment
export const updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const updatedData = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      updatedData,
      { new: true } 
      
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment updated successfully!', appointment: updatedAppointment });
  } catch (err) {
    res.status(500).json({ message: 'Error updating appointment', error: err.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting appointment', error: err.message });
  }
};
