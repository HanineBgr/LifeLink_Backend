import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import doctorRoutes from './routes/doctor.js'; 
import patientRoutes from './routes/patient.js'; 
import articleRoutes from './routes/article.js'; 

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use('/api/doctors', doctorRoutes); 
app.use('/api/patients', patientRoutes); 
app.use('/api/articles', articleRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
