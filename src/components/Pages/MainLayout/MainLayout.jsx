import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './MainLayout.scss';

const MainLayout = ({ children }) => (
  <div className="Main-container">
    <Header />
    <div className="Content-container">
      {children}
    </div>
    <Footer />
  </div>
);

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
