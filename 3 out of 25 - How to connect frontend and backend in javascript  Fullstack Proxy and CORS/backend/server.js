import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/product', (req, res) => {
  const product = [
    {
      id: 1,
      name: 'product q',
      description: 'This is a product 1',
    },
    {
      id: 2,
      name: 'product q',
      description: 'This is a product 2',
    },
    {
      id: 3,
      name: 'product q',
      description: 'This is a product 3',
    },
    {
      id: 4,
      name: 'product q',
      description: 'This is a product 4',
    },
  ];
  res.send(product);
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
