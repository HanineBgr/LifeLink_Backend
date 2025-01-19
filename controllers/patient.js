import Patient from '../models/patient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Create a new patient
export const createPatient = async (req, res) => {
  const { name, email, password, phone, address, dateOfBirth, gender, medicalHistory, emergencyContact } = req.body;

  try {
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: 'Patient already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new Patient({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      dateOfBirth,
      gender,
      medicalHistory,
      emergencyContact
    });

    await newPatient.save();

    const token = jwt.sign({ patientId: newPatient._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    res.status(201).json({
      message: 'Patient created successfully',
      token,
      patientId: newPatient._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating patient', error: error.message });
  }
};

// Sign In Route for Patients
export const patientSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: 'Patient not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, patient.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ patientId: patient._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    res.status(200).json({
      message: 'Patient signed in successfully',
      token,
      patientId: patient._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in patient', error: error.message });
  }
};

// Get All Patients (New Endpoint)
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find(); // Fetch all patients from the database
    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: 'No patients found' });
    }

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

// Get Patient Profile
export const getPatientProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id).populate('doctorAssigned appointments');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient profile', error: error.message });
  }
};

// Update Patient Profile
export const updatePatientProfile = async (req, res) => {
  const { id } = req.params;
  const { name, phone, address, dateOfBirth, gender, medicalHistory, emergencyContact } = req.body;

  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    patient.name = name || patient.name;
    patient.phone = phone || patient.phone;
    patient.address = address || patient.address;
    patient.dateOfBirth = dateOfBirth || patient.dateOfBirth;
    patient.gender = gender || patient.gender;
    patient.medicalHistory = medicalHistory || patient.medicalHistory;
    patient.emergencyContact = emergencyContact || patient.emergencyContact;

    await patient.save();

    res.status(200).json({
      message: 'Patient profile updated successfully',
      patient
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient profile', error: error.message });
  }
};

// Delete Patient
export const deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    await patient.remove();

    console.log("Status: 200 - Patient deleted successfully");
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error: error.message });
  }
};
