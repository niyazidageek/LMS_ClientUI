import { actionTypes } from "../actions/const";

const initialState = {
  profileName: null,
  isLoggedIn: false,
  isFetching: false,
  jwt: null,
  jwtExpiryDate: null,
  error: null,
  message: null,
  isMailConfirmed: false,
  rememberMe: false,
  name: null,
  surname: null,
  email: null,
  roles: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        profileName: action.payload.username,
        email: action.payload.email,
        name: action.payload.name,
        surname: action.payload.surname,
        isLoggedIn: true,
        isFetching: false,
        jwt: action.payload.token,
        error: null,
        roles: action.payload.roles,
        message: null,
        jwtExpiryDate: action.payload.expiryDate,
        rememberMe: action.payload.rememberMe,
      };
    case actionTypes.LOG_OUT:
      return initialState;
    case actionTypes.SET_IS_FETCHING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case actionTypes.DISABLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case actionTypes.CONFIRM_EMAIL_COMPLETE:
      return {
        ...state,
        isFetching: false,
        isMailConfirmed: true,
      };
    case actionTypes.SET_AUTH_ERROR:
      return {
        ...state,
        error: action.payload.message,
      };
    case actionTypes.DISABLE_AUTH_ERROR:
      return {
        ...state,
        error: null,
      };
    case actionTypes.SET_AUTH_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
      };
    case actionTypes.DISABLE_AUTH_MESSAGE:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};

export default authReducer;
