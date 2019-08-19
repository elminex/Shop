import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => (
  <header className="header">
    <h1 className="header__logo">Shop name</h1>
    <nav className="header__nav">
      <NavLink className="header__link" to="/">Home</NavLink>
      <NavLink className="header__link" to="/faq">FAQ</NavLink>
      <NavLink className="header__link" to="/terms">Terms and Conditions</NavLink>
      <NavLink className="header__link" to="/contact">Contact</NavLink>
      <NavLink className="header__link" to="/cart">Cart</NavLink>
    </nav>
  </header>
);

export default Header;
