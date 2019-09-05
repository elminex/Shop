import React from 'react';
import PropTypes from 'prop-types';

import './Pagination.scss';

const Pagination = ({
  pages,
  presentPage,
  changePage,
}) => (
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
      {[...Array(pages)].map((el, page) => {
        if ((presentPage === 1 && page <= presentPage + 4)
        || (presentPage === 2 && page <= presentPage + 3)
        || (presentPage === 3 && page <= presentPage + 2)
        || (presentPage === pages && page >= presentPage - 6)
        || (presentPage === pages - 1 && page >= presentPage - 5)
        || (presentPage === pages - 2 && page >= presentPage - 4)
        || page === 0
        || page === pages - 1
        || (page >= presentPage - 3 && page <= presentPage + 1)) {
          return (
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
          );
        }
        return '';
      })}
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

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  presentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default Pagination;
