import mongoose from 'mongoose';
// Doctor.model.js
const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    experienceInYears: {
      type: Number,
      default: 0,
    },

    worksInHospital: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
      },
    ],
    
  },
  {
    timestamps: true,
  },
);

export const Doctor = mongoose.model(
  'Doctor',
  DoctorSchema,
);
