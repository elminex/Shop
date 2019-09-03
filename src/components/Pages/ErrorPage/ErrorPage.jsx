import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.scss';

const ErrorPage = () => (
  <div className="error-page__container">
    <h2 className="error-page__text">An error occured, please try again</h2>
    <Link className="error-page__button" to="/">Return to main page</Link>
  </div>
);
export default ErrorPage;
