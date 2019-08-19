import { createStore, combineReducers } from 'redux';

// import reducers
import products from './productsReducer';
import cart from './carsReducer';

// combine reducers
const rootReducer = combineReducers({
  products,
  cart,
});

const store = createStore(rootReducer);

export default store;
