import React, { useEffect, useState } from 'react';
import './BackToTop.scss';

const BackToTop = () => {
  const [active, setActive] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  let interval;
  const scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(interval);
    } else {
      window.scroll(0, window.pageYOffset - 50); // sscroll step in px = 30
    }
  };

  const scrollToTop = () => {
    interval = setInterval(scrollStep, 15); // delay in ms = 15
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return (
    <button type="button" onClick={() => scrollToTop()} className={active ? 'back-to-top-button back-to-top-button--active' : 'back-to-top-button'}>Top</button>
  );
};
export default BackToTop;
