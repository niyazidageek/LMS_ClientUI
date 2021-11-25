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
import teacherHomeReducer from "./teacherHomeReducer"
import videoChatReducer from "./videoChatReducer";

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
    teacherHomeReducer,
    lessonReducer,
    videoChatReducer
  });
  

  export default persistReducer(persistConfig, rootReducer);