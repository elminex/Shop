/* SELECTORS */

export const allProductsSelector = ({ products }) => products.products;

/* ACTIONS */
// action name creator
const reducerName = 'productsReducer';
const createActionName = (name) => `app/${reducerName}/${name}`;

export const GET__PRODUCTS = createActionName('GET__PRODUCTS');
export const getProducts = (payload) => ({ payload, type: GET__PRODUCTS });

export const START_REQUEST = createActionName('START_REQUEST');
export const startRequest = () => ({ type: START_REQUEST });

export const END_REQUEST = createActionName('END_REQUEST');
export const endRequest = () => ({ type: END_REQUEST });

export const ERROR_REQUEST = createActionName('ERROR_REQUEST');
export const errorRequest = (error) => ({ error, type: ERROR_REQUEST });

export const RESET_REQUEST = createActionName('RESET_REQUEST');
export const resetRequest = () => ({ type: RESET_REQUEST });

/* INITIAL STATE */

const initialState = {
  products: [],
  request: {
    pending: false,
    error: null,
    success: null,
  },
};

/* REDUCER */

export default function productsReducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case GET__PRODUCTS:
      return { ...statePart, products: [...action.payload] };
    case START_REQUEST:
      return { ...statePart, request: { pending: true, error: null, success: null } };
    case END_REQUEST:
      return { ...statePart, request: { pending: false, error: null, success: true } };
    case ERROR_REQUEST:
      return { ...statePart, request: { pending: false, error: action.error, success: false } };
    case RESET_REQUEST:
      return { ...statePart, request: { pending: false, error: null, success: null } };
    default:
      return statePart;
  }
}

/* THUNKS */

export const loadProductsRequest = () => async (dispatch) => {
  dispatch(startRequest());
  const response = await fetch('http://localhost:3000');

  if (response.ok) {
    dispatch(endRequest());
    const json = await response.json();
    dispatch(getProducts(json));
  } else {
    alert(`HTTP-Error:  + ${response.status}`);
    dispatch(errorRequest(response.status));
  }
};
