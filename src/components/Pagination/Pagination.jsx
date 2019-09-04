import React from 'react';
import PropTypes from 'prop-types';

import './Pagination.scss';

const Pagination = ({ pages, show, presentPage, changePage }) => {
  const prevButton = <li className="pagination__list__item" onClick={() => changePage(presentPage - 1)}>&lt;</li>;
  const nextButton = <li className="pagination__list__item" onClick={() => changePage(presentPage + 1)}>&gt;</li>;
  if (!show) { return null; }
  return (
    <div className="pagination">
      <ul className="pagination__list">
        {(presentPage > 1) ? prevButton : ''}
        {[...Array(pages)].map((el, page) => (
          <li
            key={++page}
            onClick={() => { changePage(page); }}
            className={`pagination__list__item${((page) === presentPage) ? ' pagination__list__item--active' : ''}`}>
            {page}
          </li>
        ))}
        {(presentPage === pages && pages !== 0) ? '' : nextButton}
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  initialPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
