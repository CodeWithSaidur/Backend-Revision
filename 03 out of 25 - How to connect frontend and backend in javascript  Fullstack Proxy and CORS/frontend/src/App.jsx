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
  }, []);

  return (
    <div>
      <h1>Top {products.length} Products</h1>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: '2px solid white',
            borderRadius: '10px',
            padding: '60px',
            margin: '60px'
          }}
        >
          <h4>Id : {product.id}</h4>
          <p>Name : {product.name}</p>
          <p>Category : {product.category}</p>
          <p>Price : {product.price}</p>
          <p>Description : {product.description}</p>
          <p>Brand : {product.brand}</p>
          <p>Color : {product.colors}</p>
          <p>Stock : {product.stock}</p>
          <p>Rating : {product.rating}</p>
          <p>Reviews : {product.reviews}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
