import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );

    console.log('Database Connected', connectionInstance.connection.host);
  } catch (error) {
    console.error(`Database Conection Failed: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
