import MainScreen from "./MainScreen/MainScreen";
import firepadRef, { db } from "../../../fireBase";
import "./VideoChat.css";
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { useParams } from "react-router";
import {
  setMainStreamAction,
  addParticipantAction,
  setUserAction,
  updateParticipantAction,
  removeParticipantAction,
  fetchVideoStateAction,
} from "../../../actions/videoChatActions";
import { useSelector, useDispatch } from "react-redux";
import {
  createUserStream,
  createUserStreamWithoutVideo,
  createUserStreamWithVideo,
  killVideoTracks,
} from "../../../services/videoChatService";

function VideoChat() {
  const { search } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const participants = useSelector(
    (state) => state.videoChatReducer.participants
  );
  const mainStream = useSelector((state) => state.videoChatReducer.mainStream);
  const currentUser = useSelector(
    (state) => state.videoChatReducer.currentUser
  );
  const cookies = new Cookies();
  const [hasJoined, setHasJoined] = useState(cookies.get("hasJoined"));
  let userName;

  if (!hasJoined || hasJoined == "false") {
    userName = cookies.get("userName");
  }

  // const getUserStream = async () => {
  //   const localStream = await navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //     video: true,
  //   });

  //   return localStream;
  // };

  useEffect(async () => {
    if (userName && id && (hasJoined == "false" || !hasJoined)) {
      window.addEventListener("beforeunload", () => {
        cookies.set("hasJoined", false, { path: "/" });
      });

      const stream = await createUserStreamWithVideo();
      stream.getVideoTracks()[0].enabled = false;
      dispatch(setMainStreamAction(stream));
      connectedRef.on("value", (snap) => {
        if (snap.val()) {
          const defaultPreference = {
            audio: true,
            video: false,
            screen: false,
          };
          const userStatusRef = participantRef.push({
            userName,
            preferences: defaultPreference,
          });
          cookies.set("hasJoined", "true", { path: "/" });
          dispatch(
            setUserAction(
              {
                [userStatusRef.key]: { name: userName, ...defaultPreference },
              },
              participants,
              id
            )
          );
          userStatusRef.onDisconnect().remove();
        }
      });
    }
  }, []);

  let connectedRef;
  let participantRef;

  let isUserSet;
  let isStreamSet;
  let isParticipantsSet;

  if (userName) {
    connectedRef = db.database().ref(".info/connected");
    participantRef = firepadRef.child(id).child("participants");
    isUserSet = !!currentUser;
    isStreamSet = !!mainStream;
    isParticipantsSet = Object.keys(participants).length === 0;
  }

  useEffect(() => {
    if (userName && id) {
      if (isStreamSet && isUserSet && isParticipantsSet) {
        participantRef.on("child_added", (snap) => {
          const preferenceUpdateEvent = participantRef
            .child(snap.key)
            .child("preferences");
          preferenceUpdateEvent.on("child_changed", (preferenceSnap) => {
            dispatch(
              updateParticipantAction({
                [snap.key]: {
                  [preferenceSnap.key]: preferenceSnap.val(),
                },
              })
            );
          });
          const { userName: name, preferences = {} } = snap.val();
          dispatch(
            addParticipantAction(
              {
                [snap.key]: {
                  name,
                  ...preferences,
                },
              },
              currentUser,
              mainStream,
              id
            )
          );
        });
        participantRef.on("child_removed", (snap) => {
          dispatch(removeParticipantAction(participants, snap.key));
        });
      }
    }
  }, [isStreamSet, isUserSet, isParticipantsSet]);

  if (hasJoined == "true") {
    return (
      <Redirect
        to={{
          pathname: "/videochat/offboard",
          state: {
            message: "You have already joined the lesson..",
            title: "Sorry!",
          },
        }}
      />
    );
  } else if (!userName) {
    return (
      <Redirect
        to={{
          pathname: "/videochat/onboard",
          state: {
            roomId: id,
          },
        }}
      />
    );
  }

  return (
    // console.log(mainStream&&mainStream.getVideoTracks()),
    <div className="App">
      <MainScreen roomId={id} dbRef={participantRef}/>
    </div>
  );
}

export default VideoChat;
