import mongoose from 'mongoose';
// Patient.model.js
const PatientSchema = new mongoose.Schema(
  {
    
  },
  {
    timestamps: true,
  },
);

export const Patient = mongoose.model(
  'Patient',
  PatientSchema,
);
