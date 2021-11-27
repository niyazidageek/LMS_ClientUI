import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunkMiddleware from "redux-thunk";
import { persistStore } from "redux-persist";
import signalRMiddleware from "./middlewares/hubMiddleWare";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, signalRMiddleware))
);

export const persistor = persistStore(store);
