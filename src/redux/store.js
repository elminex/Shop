import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';


// import reducers
import products from './productsReducer';
import cart from './cartReducer';

// combine reducers
const rootReducer = combineReducers({
  products,
  cart,
});

const store = createStore(rootReducer,
  compose(applyMiddleware(thunk),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;
