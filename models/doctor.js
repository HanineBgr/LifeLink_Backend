import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: "" },
    clinicHours: { type: String, default: "" },
    specialization: { type: String, required: true },
    address: { type: String, required: true },
    diplomaVerification: {
        isVerified: { type: Boolean, required: true, default: false },
        verificationDocuments: [{ type: String }],
        specialization: { type: String }
    },
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }]
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);  

export default Doctor;
