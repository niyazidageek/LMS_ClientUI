import { addConnection, initializeListensers, updatePreference } from "../services/videoChatService"
import { actionTypes } from "./const"
import {generateColor} from "../utils/generateColor"

export const setMainStreamAction = (stream) => async(dispatch)=>{
    dispatch({
        type:actionTypes.SET_MAIN_STREAM,
        payload:{
            mainStream:stream
        }
    })
    //    dispatch(fetchVideoStateAction())
}

export const setUserAction = (user, participants, roomId) => async (dispatch) => { 
    const userId = Object.keys(user)[0];
    user[userId].avatarColor = generateColor();
    await initializeListensers(userId,participants,roomId);
    dispatch({
        type:actionTypes.SET_VIDEO_USER,
        payload:{
            currentUser:user,
        }
    })  
    // dispatch(fetchVideoStateAction())
}

export const addParticipantAction = (user, currentUser, mainStream,roomId) => (dispatch) => {
    const newUserId = Object.keys(user)[0];
    const currentUserId = Object.keys(currentUser)[0];

    if (mainStream && currentUserId !== newUserId) {
          user  = addConnection(
          user,
          currentUser,
          mainStream,
          roomId
        );
      }

      if (currentUserId === newUserId)
        user[newUserId].currentUser = true;
        user[newUserId].avatarColor = generateColor()

    dispatch({
        type:actionTypes.ADD_VIDEO_PARTICIPANT,
        payload:{
            newUser:user
        }
    })

    // dispatch(fetchVideoStateAction())
}

export const updateUserAction = (currentUser,user, roomId) => async (dispatch) =>{
    const userId = Object.keys(currentUser)[0];
    await updatePreference(userId, user,roomId)

    dispatch({
        type:actionTypes.UPDATE_VIDEO_USER,
        payload:{
            currentUser:user,
        }
    })

    // dispatch(fetchVideoStateAction())
}

export const updateParticipantAction = (user) => (dispatch)=>{
    dispatch({
        type: actionTypes.UPDATE_VIDEO_PARTICIPANT,
        payload:{
            newUser:user,
        }
    })
    // dispatch(fetchVideoStateAction())
}

export const removeParticipantAction = (participants,userId) => async (dispatch) =>{
    delete participants[userId]
    dispatch({
        type:actionTypes.REMOVE_VIDEO_PARTICIPANT,
        payload:{
            participants:participants
        }
    })
}

export const fetchVideoStateAction = () => (dispatch) => {
    dispatch({
        type:actionTypes.FETCH_VIDEO_CHAT_STATE
    })
}