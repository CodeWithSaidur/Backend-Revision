// App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  return (
    <div>
      <h1>Top {products.length} Products</h1>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: '2px solid white',
            borderRadius: '10px',
          }}
        >
          <h4>{product.id}</h4>
          <p>{product.name}</p>
          <p>{product.category}</p>
          <p>{product.price}</p>
          <p>{product.description}</p>
          <p>{product.brand}</p>
          <p>{product.colors}</p>
          <p>{product.stock}</p>
          <p>{product.rating}</p>
          <p>{product.reviews}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
