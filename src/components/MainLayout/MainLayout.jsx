import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const MainLayout = ({ children }) => (
  <>
    <Header />
    <div className="container">
      {children}
    </div>
    <Footer />
  </>
);

export default MainLayout;
