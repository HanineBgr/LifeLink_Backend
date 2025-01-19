import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient', // Assuming you have a 'Patient' model
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor', 
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'], 
      default: 'Scheduled',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, 
  }
);

const Appointment = mongoose.model('Appointment', AppointmentSchema);

export default Appointment;
