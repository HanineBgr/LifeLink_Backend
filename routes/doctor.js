import express from 'express';
import { 
    doctorSignUp, 
    doctorSignIn, 
    updateDoctorProfile, 
    getDoctorById, 
    getAllDoctors, 
    deleteDoctor 
} from '../controllers/doctor.js';
const router = express.Router();

router.post('/signup', doctorSignUp);
router.post('/signin', doctorSignIn);
router.put('/updateProfile/:id',updateDoctorProfile);
router.get('/doctor/:id', getDoctorById);
router.get('/doctors',  getAllDoctors);
router.delete('/doctor/:id',deleteDoctor);

export default router;
