import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/index.js';

dotenv.config();

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

connectDb();
app.listen(PORT, () => {
  console.log(`click http://localhost:${PORT}`);
});

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
//     app.on('error', (err) => {
//       console.log(err);
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.log('error', error);
//   }
// })();
