import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import authReducer from "../reducers/authReducer";
import studentHomeReducer from "./studentHomeReducer";
import lessonReducer from "./lessonReducer";
import onBoardReducer from "./onBoardReducer";
import profileReducer from "./profileReducer";
import assignmentReducer from "./assignmentReducer";
import theoryReducer from "./theoryReducer"

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["authReducer","onBoardReducer"],
  };

  const rootReducer = combineReducers({
    profileReducer,
    authReducer,
    theoryReducer,
    onBoardReducer,
    studentHomeReducer,
    assignmentReducer,
    
    lessonReducer
  });
  

  export default persistReducer(persistConfig, rootReducer);