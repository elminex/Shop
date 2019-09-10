/* eslint-disable no-param-reassign */
/* SELECTORS */

export const allProductsSelector = ({ shop }) => shop.products;
export const singleProductSelector = ({ shop }, id) => shop.products.find(
  (item) => item.id === id,
);
export const cartSelector = ({ shop }) => shop.cart;
export const getRequest = ({ shop }) => shop.request;
export const dataSelector = ({ shop }) => shop.data;


/* ACTIONS */
// action name creator
const reducerName = 'shopReducer';
const createActionName = (name) => `app/${reducerName}/${name}`;

export const GET_PRODUCTS = createActionName('GET_PRODUCTS');
export const getProducts = (payload) => ({ payload, type: GET_PRODUCTS });

export const START_REQUEST = createActionName('START_REQUEST');
export const startRequest = () => ({ type: START_REQUEST });

export const END_REQUEST = createActionName('END_REQUEST');
export const endRequest = () => ({ type: END_REQUEST });

export const ERROR_REQUEST = createActionName('ERROR_REQUEST');
export const errorRequest = (error) => ({ error, type: ERROR_REQUEST });

export const RESET_REQUEST = createActionName('RESET_REQUEST');
export const resetRequest = () => ({ type: RESET_REQUEST });

export const ADD_TO_CART = createActionName('ADD_TO_CART');
export const AddToCart = (item, quantity, discount) => ({
  product: item,
  type: ADD_TO_CART,
  quantity,
  discount,
});

export const CHANGE_QUANTITY = createActionName('CHANGE_QUANTITY');
export const changeQuantity = (quantity, id) => ({
  type: CHANGE_QUANTITY,
  quantity,
  id,
});

export const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
export const removeFromCart = (id) => ({ type: REMOVE_FROM_CART, id });

export const SELECT_SHIPPING_OPTION = createActionName('SELECT_SHIPPING_OPTION');
export const selectShippingOption = (option) => ({
  type: SELECT_SHIPPING_OPTION,
  shipping: option,
});

export const COUNT_TOTAL_PRICE = createActionName('COUNT_TOTAL_PRICE');
export const countTotalPrice = () => ({ type: COUNT_TOTAL_PRICE });

/* INITIAL STATE */

const initialState = {
  products: [],
  request: {
    pending: false,
    error: null,
    success: null,
  },
  cart: [],
  data: {
    shipping: 0,
    subTotal: 0,
    total: 0,
  },
};

/* REDUCER */

export default function shopReducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...statePart, products: [...action.payload] };
    case START_REQUEST:
      return { ...statePart, request: { pending: true, error: null, success: null } };
    case END_REQUEST:
      return { ...statePart, request: { pending: false, error: null, success: true } };
    case ERROR_REQUEST:
      return { ...statePart, request: { pending: false, error: action.error, success: false } };
    case RESET_REQUEST:
      return { ...statePart, request: { pending: false, error: null, success: null } };
    case ADD_TO_CART: {
      if (statePart.cart.some((item) => item.product.id === action.product.id)) {
        return {
          ...statePart,
          cart: statePart.cart.map((cartItem) => {
            if (cartItem.product.id === action.product.id) {
              cartItem.quantity += action.quantity;
              cartItem.itemsPrice = cartItem.product.price * cartItem.quantity;
              return cartItem;
            }
            return cartItem;
          }),
        };
      }
      return {
        ...statePart,
        cart: [{
          product: action.product,
          quantity: action.quantity,
          discount: 0,
          itemsPrice: action.product.price * action.quantity,
        },
        ...statePart.cart,
        ],
      };
    }
    case CHANGE_QUANTITY:
      return {
        ...statePart,
        cart: statePart.cart.map((cartItem) => {
          if (cartItem.product.id === action.id) {
            cartItem.quantity = action.quantity;
            cartItem.itemsPrice = cartItem.product.price * cartItem.quantity;
            return cartItem;
          }
          return cartItem;
        }),
      };
    case REMOVE_FROM_CART:
      return {
        ...statePart,
        cart: statePart.cart.filter((cartItem) => cartItem.product.id !== action.id),
      };
    case SELECT_SHIPPING_OPTION:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          shipping: action.shipping,
        },
      };
    case COUNT_TOTAL_PRICE:
      return {
        ...statePart,
        data: {
          ...statePart.data,
          subTotal: statePart.cart.reduce((a, b) => a + b.itemsPrice, 0),
          total: statePart.cart.reduce((a, b) => a + b.itemsPrice, 0) + statePart.data.shipping,
        },
      };
    default:
      return statePart;
  }
}

/* THUNKS */

export const loadProductsRequest = () => async (dispatch) => {
  dispatch(startRequest());
  const response = await fetch('/api');
  if (response.ok) {
    const json = await response.json();
    dispatch(getProducts(json));
    dispatch(endRequest());
  } else {
    dispatch(errorRequest(response.status));
  }
};

export const AddProductToCart = (product, quantity, discount = 0) => (dispatch) => {
  dispatch(AddToCart(product, quantity, discount));
  dispatch(countTotalPrice());
};

export const changeQuantityAndPrice = (quantity, id) => (dispatch) => {
  dispatch(changeQuantity(quantity, id));
  dispatch(countTotalPrice());
};
