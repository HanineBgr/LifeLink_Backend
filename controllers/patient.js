import Patient from '../models/patient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Create a new patient
export const createPatient = async (req, res, next) => {
  const { name, email, password, phone, address, dateOfBirth, gender, medicalHistory, emergencyContact } = req.body;

  try {
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      const error = new Error('Patient already exists');
      error.status = 400;
      throw error; // Throwing error to be caught by middleware
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
    next(error); // Passing error to the error handler middleware
  }
};

// Sign In Route for Patients
export const patientSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      const error = new Error('Patient not found');
      error.status = 400;
      throw error;
    }

    const isPasswordCorrect = await bcrypt.compare(password, patient.password);
    if (!isPasswordCorrect) {
      const error = new Error('Invalid password');
      error.status = 400;
      throw error;
    }

    const token = jwt.sign({ patientId: patient._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    res.status(200).json({
      message: 'Patient signed in successfully',
      token,
      patientId: patient._id
    });
  } catch (error) {
    next(error);
  }
};

// Get Patient Profile
export const getPatientProfile = async (req, res, next) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id).populate('doctorAssigned appointments');
    if (!patient) {
      const error = new Error('Patient not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};

// Update Patient Profile
export const updatePatientProfile = async (req, res, next) => {
  const { id } = req.params;
  const { name, phone, address, dateOfBirth, gender, medicalHistory, emergencyContact } = req.body;

  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      const error = new Error('Patient not found');
      error.status = 404;
      throw error;
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
    next(error);
  }
};

// Delete Patient
export const deletePatient = async (req, res, next) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      const error = new Error('Patient not found');
      error.status = 404;
      throw error;
    }

    await patient.remove();

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    next(error);
  }
};
