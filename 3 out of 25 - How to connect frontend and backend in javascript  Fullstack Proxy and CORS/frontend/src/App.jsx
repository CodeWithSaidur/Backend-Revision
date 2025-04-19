import { useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  return (
    <>
      <h1>Code</h1>
      <p>{products.length}</p>
      {products.map((product) => {
        (<h3>{product.id}</h3>),
          (<p>{product.name}</p>),
          (<p>{product.description}</p>);
      })}
    </>
  );
}

export default App;
