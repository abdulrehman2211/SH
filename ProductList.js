import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const listStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '0 1rem'
  };

  if (loading) {
    return <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Loading products...</p>;
  }
  if (error) {
    return <p style={{ textAlign: 'center', color: 'red', fontSize: '1.2rem' }}>Error loading products: {error}</p>;
  }
  if (products.length === 0) {
    return <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>No products found.</p>;
  }

  return (
    <div style={listStyle}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;