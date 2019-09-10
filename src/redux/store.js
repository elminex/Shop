import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';


// import reducers
import shop from './reducer';

// combine reducers
const rootReducer = combineReducers({
  shop,
});

const store = createStore(rootReducer,
  compose(applyMiddleware(thunk)));

export default store;
