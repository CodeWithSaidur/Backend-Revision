const express = require('express');
const env = require('dotenv');

env.config({});
const app = express();

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => {
  console.log(`click http://localhost:${PORT}`);
});
