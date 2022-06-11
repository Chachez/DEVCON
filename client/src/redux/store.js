import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './rootReducer';

//Persisting State on Refresh
function savetoLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {}
}

function loadfromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

// Middleware wraps store's dispatch method.
const middleware = [thunk];

const persistedState = loadfromLocalStorage();

//Pass the root Reducer
const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => savetoLocalStorage(store.getState()));

export default store;
