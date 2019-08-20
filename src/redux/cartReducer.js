/* SELECTORS */

/* ACTIONS */

// action name creator
const reducerName = 'cartReducer';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* INITIAL STATE */

const initialState = [];

/* REDUCER */

export default function cartReducer(statePart = initialState, action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
