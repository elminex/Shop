import PropTypes from 'prop-types';

export const productTypes = PropTypes.shape({
  company: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  sales: PropTypes.number.isRequired,
});

export const cartItemTypes = PropTypes.shape({
  product: productTypes.isRequired,
  quantity: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  itemsPrice: PropTypes.number.isRequired,
});

export const requestTypes = PropTypes.shape({
  success: PropTypes.oneOfType([
    PropTypes.bool,
    () => null,
  ]),
  pending: PropTypes.oneOfType([
    PropTypes.bool,
    () => null,
  ]),
  error: PropTypes.oneOfType([
    PropTypes.bool,
    () => null,
  ]),
});
