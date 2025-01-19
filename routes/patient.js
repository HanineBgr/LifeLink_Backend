import express from 'express';
import { createPatient, patientSignIn, getPatientProfile, updatePatientProfile, deletePatient } from '../controllers/patient.js';

const router = express.Router();

router.post('/signup', createPatient);

router.post('/signin', patientSignIn);

router.get('/profile/:id', getPatientProfile);

//router.get('/patients', getPatients);

router.put('/updateProfile/:id',updatePatientProfile);

router.delete('/delete/:id',deletePatient);

export default router;
