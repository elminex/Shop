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
export const AddProductToCart = (item, quantity) => ({
  product: item,
  type: ADD_PRODUCT_TO_CART,
  quantity,
});

export const CHANGE_DISCOUNT_AND_QUANTITY = createActionName('CHANGE_DISCOUNT_AND_QUANTITY');
export const changeDiscountAndQuantity = (discount, quantity, id) => ({
  type: CHANGE_DISCOUNT_AND_QUANTITY,
  discount,
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

/* INITIAL STATE */

const initialState = {
  products: [],
  request: {
    pending: false,
    error: null,
    success: null,
  },
  cart: [],
  shipping: '',
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
    case ADD_PRODUCT_TO_CART: {
      if (statePart.cart.some((item) => item.product.id === action.product.id)) {
        return {
          ...statePart,
          cart: statePart.cart.map((cartItem) => {
            if (cartItem.product.id === action.product.id) {
              cartItem.quantity += parseFloat(action.quantity);
              cartItem.itemsPrice = (cartItem.product.price
                - (cartItem.product.price * (cartItem.discount / 100)))
                * cartItem.quantity;
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
          quantity: parseFloat(action.quantity),
          discount: 0,
          itemsPrice: action.product.price,
        },
        ...statePart.cart,
        ],
      };
    }
    case CHANGE_DISCOUNT_AND_QUANTITY:
      return {
        ...statePart,
        cart: statePart.cart.map((cartItem) => {
          if (cartItem.product.id === action.id) {
            cartItem.quantity = parseFloat(action.quantity);
            cartItem.discount = parseFloat(action.discount);
            cartItem.itemsPrice = (cartItem.product.price
              - (cartItem.product.price * (action.discount / 100))) * cartItem.quantity;
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
        shipping: action.shipping,
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
    const json = await response.json();
    dispatch(getProducts(json));
    dispatch(endRequest());
  } else {
    dispatch(errorRequest(response.status));
  }
};
