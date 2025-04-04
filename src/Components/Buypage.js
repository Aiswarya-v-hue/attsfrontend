import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Buypage.css';
import backendUrl from '../config';

function Buypage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`${backendUrl}/api/getall`);
        console.log(res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="buy-page-container">
      <h1 className="title">Jewellery Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.image ? `${backendUrl}/uploads/${product.image}` : 'https://via.placeholder.com/150'}
              alt={product.name}
              className="product-image"
            />
            
            <p className="product-desc">{product.description}</p>
            <p className="product-price">₹ {product.price}</p>
            <p className="product-stock">In Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buypage;
