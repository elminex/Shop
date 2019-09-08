import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => (
  <header className="header">
    <h1 className="header__logo">Shop name</h1>
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <NavLink className="header__link" activeClassName="header__link--active" exact to="/">Home</NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink className="header__link" activeClassName="header__link--active" to="/shop">Shop</NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink className="header__link" activeClassName="header__link--active" to="/terms">Terms and Conditions</NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink className="header__link" activeClassName="header__link--active" to="/contact">Contact</NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink className="header__link" activeClassName="header__link--active" to="/cart">Cart</NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink className="header__link" activeClassName="header__link--active" to="/search">Search</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
