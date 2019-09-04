import React from 'react';
import PropTypes from 'prop-types';

import './Pagination.scss';

const Pagination = ({
  pages,
  presentPage,
  changePage,
}) => {
  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__list-item">
          <button
            className={`pagination__button ${(presentPage > 1) ? '' : 'pagination__button--hidden'}`}
            type="button"
            onClick={() => changePage(presentPage - 1)}
          >
            &lt;
          </button> 
        </li>
        {[...Array(pages)].map((el, page) => (
          <li
            key={++page}
            className="pagination__list-item"
          >
            <button
              className={`pagination__button ${((page) === presentPage) ? ' pagination__button--active' : ''}`}
              type="button"
              onClick={() => { changePage(page); }}
            >
              {page}
            </button>
          </li>
        ))}
        <li className="pagination__list-item">
          <button
            className={`pagination__button ${(presentPage === pages && pages !== 0) ? 'pagination__button--hidden' : ''}`}
            type="button"
            onClick={() => changePage(presentPage + 1)}
          >
            &gt;
          </button>
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  presentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default Pagination;
