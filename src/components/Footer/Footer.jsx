import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="footer__logo">
      LOGO
    </div>
    <nav className="footer__nav">
      <ul className="footer__nav-list">
        <li className="footer__nav-item">
          <NavLink className="footer__link" activeClassName="footer__link--active" exact to="/">Home</NavLink>
        </li>
        <li className="footer__nav-item">
          <NavLink className="footer__link" activeClassName="footer__link--active" to="/shop">Shop</NavLink>
        </li>
        <li className="footer__nav-item">
          <NavLink className="footer__link" activeClassName="footer__link--active" to="/terms">Terms and Conditions</NavLink>
        </li>
        <li className="footer__nav-item">
          <NavLink className="footer__link" activeClassName="footer__link--active" to="/contact">Contact</NavLink>
        </li>
        <li className="footer__nav-item">
          <NavLink className="footer__link" activeClassName="footer__link--active" to="/cart">Cart</NavLink>
        </li>
      </ul>
    </nav>
  </footer>
);

export default Footer;
