import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Shop name</h1>
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/faq">FAQ</NavLink>
      <NavLink to="/terms">Terms and Conditions</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/cart">Cart</NavLink>
    </nav>
  </header>
);

export default Header;
