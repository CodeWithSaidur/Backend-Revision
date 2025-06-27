// index.js
import { app } from './app.js';
import dotenv from 'dotenv';
import connectDb from './db/index.js';

dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 3030, () => {
      console.log(`click http://localhost:${process.env.PORT}`);
    });
  })

  .catch((err) => {
    console.log('Db Connection failed');
  });
