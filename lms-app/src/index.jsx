import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import persistState from "redux-localstorage";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store } from "./store";
import { persistor } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
