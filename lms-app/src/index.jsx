import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import persistState from 'redux-localstorage'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './redux/rootReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
      applyMiddleware(
          thunkMiddleware
      ),
      persistState(/*paths, config*/)
  )
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
