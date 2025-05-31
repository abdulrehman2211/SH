import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header style={{ background: '#eee', padding: '1rem' }}>
    <nav>
      <Link to="/" style={{ margin: '0 1rem' }}>Home</Link>
      <Link to="/products" style={{ margin: '0 1rem' }}>Products</Link>
      <Link to="/cart" style={{ margin: '0 1rem' }}>Cart</Link>
      <Link to="/about" style={{ margin: '0 1rem' }}>About</Link>
      <Link to="/contact" style={{ margin: '0 1rem' }}>Contact</Link>
      <Link to="/login" style={{ margin: '0 1rem' }}>Login</Link>
    </nav>
  </header>
);

export default Header;
