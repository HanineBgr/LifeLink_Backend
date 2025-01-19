import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Doctor from '../models/doctor.js'; 

// Sign Up 
export const doctorSignUp = async (req, res) => {
    const { name, email, password, bio, clinicHours, specialization, address, diplomaVerification } = req.body;

    try {
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newDoctor = new Doctor({
            name,
            email,
            password: hashedPassword,
            bio,
            clinicHours,
            specialization,
            address,
            diplomaVerification
        });

        await newDoctor.save();

        const token = jwt.sign({ doctorId: newDoctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'Doctor registered successfully',
            token,
            doctorId: newDoctor._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Error registering doctor', 
            error: error.message 
        });
    }
};

// Sign In 
export const doctorSignIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, doctor.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid password' });
        }

       
        const token = jwt.sign({ doctorId: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Doctor signed in successfully',
            token,
            doctorId: doctor._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Error signing in doctor', 
            error: error.message 
        });
    }
};

// Get Doctor by ID 
export const getDoctorById = async (req, res) => {
    const doctorId = req.params.id;

    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({
            message: 'Doctor retrieved successfully',
            doctor
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving doctor', error: error.message });
    }
};

// Get All Doctors 
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json({
            message: 'Doctors retrieved successfully',
            doctors
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving doctors', error: error.message });
    }
};

// Update 
export const updateDoctorProfile = async (req, res) => {
    const { name, bio, clinicHours, specialization, address, diplomaVerification } = req.body;
    const doctorId = req.params.id;  // Assuming the doctor is identified by their ID

    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        doctor.name = name || doctor.name;
        doctor.bio = bio || doctor.bio;
        doctor.clinicHours = clinicHours || doctor.clinicHours;
        doctor.specialization = specialization || doctor.specialization;
        doctor.address = address || doctor.address;
        doctor.diplomaVerification = diplomaVerification || doctor.diplomaVerification;

        await doctor.save();

        res.status(200).json({
            message: 'Doctor profile updated successfully',
            doctor
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Error updating doctor profile', 
            error: error.message 
        });
    }
};

// Delete 
export const deleteDoctor = async (req, res) => {
    const doctorId = req.params.id;

    try {
        const doctor = await Doctor.findByIdAndDelete(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({
            message: 'Doctor deleted successfully',
            doctor
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Error deleting doctor', 
            error: error.message 
        });
    }
};
