import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare, faInstagram, faTwitterSquare, faPinterestSquare,
} from '@fortawesome/free-brands-svg-icons';
import './Social.scss';

const Social = ({ container }) => (
  <div className={container !== '' ? `social__container social__container--${container}` : 'social__container'}>
    <ul className="social__list">
      <li className="social__item">
        <a className="social__link" href="https://www.facebook.com">
          <FontAwesomeIcon icon={faFacebookSquare} />
        </a>
      </li>
      <li className="social__item">
        <a className="social__link" href="https://www.instagram.com">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </li>
      <li className="social__item">
        <a className="social__link" href="https://www.twitter.com">
          <FontAwesomeIcon icon={faTwitterSquare} />
        </a>
      </li>
      <li className="social__item">
        <a className="social__link" href="https://www.pinterest.com">
          <FontAwesomeIcon icon={faPinterestSquare} />
        </a>
      </li>
    </ul>
  </div>
);
export default Social;

Social.propTypes = {
  container: PropTypes.string.isRequired,
};
