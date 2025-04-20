// server.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); 

const PORT = 3000;

app.get('/api/products', (req, res) => {
  const products = [
    {
      id: 1,
      name: 'iPhone 16 Pro',
      category: 'Smartphones',
      price: 999,
      description:
        '6.1-inch Super Retina XDR display, A18 Pro chip, 48MP camera',
      brand: 'Apple',
      colors: ['Space Black', 'Silver', 'Gold'],
      stock: 150,
      rating: 4.8,
      reviews: 425,
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      category: 'Smartphones',
      price: 1199,
      description:
        '6.8-inch Dynamic AMOLED, Snapdragon 8 Gen 3, 200MP camera',
      brand: 'Samsung',
      colors: [
        'Phantom Black',
        'Titanium Gray',
        'Burgundy',
      ],
      stock: 200,
      rating: 4.7,
      reviews: 380,
    },
    {
      id: 3,
      name: 'Sony WH-1000XM5',
      category: 'Headphones',
      price: 349,
      description:
        'Industry-leading noise canceling wireless headphones',
      brand: 'Sony',
      colors: ['Black', 'Silver', 'Blue'],
      stock: 85,
      rating: 4.9,
      reviews: 1120,
    },
    {
      id: 4,
      name: 'Apple Watch Series 9',
      category: 'Wearables',
      price: 399,
      description:
        'Advanced health monitoring and fitness tracking',
      brand: 'Apple',
      colors: ['Midnight', 'Starlight', 'Product Red'],
      stock: 120,
      rating: 4.6,
      reviews: 287,
    },
    {
      id: 5,
      name: 'Dyson V15 Detect',
      category: 'Home Appliances',
      price: 699,
      description:
        'Cordless vacuum with laser dust detection',
      brand: 'Dyson',
      colors: ['Gold', 'Nickel'],
      stock: 45,
      rating: 4.8,
      reviews: 532,
    },
    {
      id: 6,
      name: 'PlayStation 5',
      category: 'Gaming',
      price: 499,
      description:
        'Next-gen gaming console with ultra-high speed SSD',
      brand: 'Sony',
      colors: ['White'],
      stock: 30,
      rating: 4.9,
      reviews: 2100,
    },
    {
      id: 7,
      name: 'Bose QuietComfort 45',
      category: 'Headphones',
      price: 329,
      description:
        'Premium noise-canceling Bluetooth headphones',
      brand: 'Bose',
      colors: ['Black', 'Smoke White'],
      stock: 75,
      rating: 4.7,
      reviews: 896,
    },
    {
      id: 8,
      name: 'Nintendo Switch OLED',
      category: 'Gaming',
      price: 349,
      description:
        '7-inch OLED screen, enhanced audio, 64GB storage',
      brand: 'Nintendo',
      colors: ['White', 'Neon Red/Blue'],
      stock: 60,
      rating: 4.8,
      reviews: 1540,
    },
    {
      id: 9,
      name: 'Kindle Paperwhite',
      category: 'E-Readers',
      price: 139,
      description:
        '6.8" glare-free display, adjustable warm light',
      brand: 'Amazon',
      colors: ['Black'],
      stock: 200,
      rating: 4.7,
      reviews: 2450,
    },
    {
      id: 10,
      name: 'GoPro HERO12 Black',
      category: 'Cameras',
      price: 399,
      description:
        '5.3K video, HyperSmooth 6.0 stabilization',
      brand: 'GoPro',
      colors: ['Black'],
      stock: 50,
      rating: 4.6,
      reviews: 420,
    },
  ];
  res.send(products);
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
