import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import authReducer from "../reducers/authReducer";
import studentHomeReducer from "./studentHomeReducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["authReducer"],
  };

  const rootReducer = combineReducers({
    authReducer,
    studentHomeReducer
  });
  

  export default persistReducer(persistConfig, rootReducer);