import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Social from '../../components/Social/Social';
import './Contact.scss';

const Contact = () => (
  <div className="contact__container">
    <span>
      <FontAwesomeIcon icon={faMobileAlt} />
      {'+48 111 222 3333'}
    </span>
    <span>
      <FontAwesomeIcon icon={faEnvelope} />
      <a className="contact__mail" href="mailto:awesome@company.com">awesome@company.com</a>
    </span>
    <address className="contact__address">
      {'Awesome Company'}
      <br />
      {'Imaginary Street 77'}
      <br />
      {'00-000 AwesomeTown'}
    </address>

    <Social container="contact" />
  </div>
);
export default Contact;
