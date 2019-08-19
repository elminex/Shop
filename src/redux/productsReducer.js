/* SELECTORS */

/* ACTIONS */

// action name creator
const reducerName = 'products';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* INITIAL STATE */

const initialState = [];

/* REDUCER */

export default function productsReducer(statePart = initialState, action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
