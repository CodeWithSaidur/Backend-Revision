import mongoose from 'mongoose';
// Patient.model.js
const PatientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    diagonsedWith: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },

    bloudGroup: {
      type: String,
      required: true,
    },

    admittedIn: {
      type: mongoose.Types.ObjectId,
      ref: 'Hospital',
    },



  },
  {
    timestamps: true,
  },
);

export const Patient = mongoose.model(
  'Patient',
  PatientSchema,
);
