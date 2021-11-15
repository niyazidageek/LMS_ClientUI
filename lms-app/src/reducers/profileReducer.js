import { actionTypes } from "../actions/const";

const initialState = {
  username:null,
  name:null,
  surname:null,
  email:null,
  bio:null,
  isSubscribedToSender:null,
  filename:null,
  groups:null
};

const profileReducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionTypes.GET_USER_PROFILE:
            return {
                username:action.payload.username,
                name:action.payload.name,
                surname:action.payload.surname,
                email:action.payload.email,
                bio:action.payload.bio,
                filename:action.payload.filename,
                isSubscribedToSender:action.payload.isSubscribedToSender,
                groups:action.payload.groups
            }
        default:
            return state;
    }
}

export default profileReducer;