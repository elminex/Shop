import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Social from '../Social/Social';
import './Header.scss';

const Header = () => {
  const [menu, setMenu] = useState(false);
  return (
    <header className="header">
      <h1 className="header__logo">Shop name</h1>
      <button className="header__nav-button" type="button" onClick={() => setMenu(!menu)}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <nav className={menu ? 'header__nav header__nav--active' : 'header__nav'}>
        <div className="header__nav-logo">LOGO</div>
        <button className="header__nav-close" type="button" onClick={() => setMenu(!menu)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
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
        <Social container="header" />
      </nav>
    </header>
  );
};

export default Header;
