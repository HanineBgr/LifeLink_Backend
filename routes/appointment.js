import express from 'express';
import { 
  createAppointment, 
  getAppointments, 
  getAppointmentsByPatient, 
  getAppointmentsByDoctor, 
  updateAppointment, 
  deleteAppointment 
} from '../controllers/appointment.js'; 

const router = express.Router();

router.post('/add', createAppointment);

router.get('/', getAppointments);

router.get('/patient/:patientId', getAppointmentsByPatient);

router.get('/doctor/:doctorId', getAppointmentsByDoctor);

router.put('/:appointmentId', updateAppointment);

router.delete('/:appointmentId', deleteAppointment);

export default router;
