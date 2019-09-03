import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.scss';

const ErrorPage = () => (
  <div className="not-found__container">
    <h2 className="not-found__text">Page not found.</h2>
    <Link className="not-found__button" to="/">Return to main page</Link>
  </div>
);
export default ErrorPage;
