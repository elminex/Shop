/* SELECTORS */

export const allProductsSelector = ({ shop }) => shop.products;
export const singleProductSelector = ({ shop }, id) => shop.products.find(
  (item) => item.id === id,
);
export const cartSelector = ({ shop }) => shop.cart;
export const getRequest = ({ shop }) => shop.request;


/* ACTIONS */
// action name creator
const reducerName = 'shopReducer';
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

export const ADD_PRODUCT_TO_CART = createActionName('ADD_PRODUCT_TO_CART');
export const AddProductToCart = (item) => ({ product: item, type: ADD_PRODUCT_TO_CART });

export const CHANGE_DISCOUNT = createActionName('CHANGE_DISCOUNT');
export const changeDiscount = (discount, id) => ({ type: CHANGE_DISCOUNT, discount, id });

export const CHANGE_QUANTITY = createActionName('CHANGE_QUANTITY');
export const changeQuantity = (quantity, id) => ({ type: CHANGE_QUANTITY, quantity, id });

/* INITIAL STATE */

const initialState = {
  products: [],
  request: {
    pending: false,
    error: null,
    success: null,
  },
  cart: [
    {
      product: {
        index: 6,
        id: '9c57491d-9b6e-40ec-b929-3dc6eee7fee4',
        name: 'Veal Inside - Provimi',
        company: 'Patriot Transportation Holding, Inc.',
        photo: 'http://dummyimage.com/200x160.png/5fa2dd/ffffff',
        price: '50.70',
        description: 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
      },
      quantity: 3,
      discount: 20,
    },
  ],
};

/* REDUCER */

export default function shopReducer(statePart = initialState, action = {}) {
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
    case ADD_PRODUCT_TO_CART:
      return {
        ...statePart,
        cart: [{
          product: action.product,
          quantity: 1,
          discount: 0,
        },
        ...statePart.cart,
        ],
      };
    case CHANGE_DISCOUNT:
      return {
        ...statePart,
        cart: statePart.cart.map((cartItem) => {
          if (cartItem.product.id === action.id) {
            cartItem.discount = action.discount;
            return cartItem;
          }
          return cartItem;
        }),
      };
    case CHANGE_QUANTITY:
      return {
        ...statePart,
        cart: statePart.cart.map((cartItem) => {
          if (cartItem.product.id === action.id) {
            cartItem.quantity = action.quantity;
            return cartItem;
          }
          return cartItem;
        }),
      };
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
    dispatch(errorRequest(response.status));
  }
};
