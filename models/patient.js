import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    medicalHistory: { type: String, default: '' },
    doctorAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
    emergencyContact: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      relation: { type: String, required: true }
    }
  },
  { timestamps: true }
);

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
