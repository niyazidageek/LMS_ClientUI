import React, { useRef, useEffect } from "react";
import MeetingFooter from "../MeetingFooter/MeetingFooter";
import Participants from "../Participants/Participants";
import "./MainScreen.css";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeParticipantAction,
  setMainStreamAction,
  updateUserAction,
} from "../../../../actions/videoChatActions";
import {
  createUserStream,
  createUserStreamWithoutVideo,
  createUserStreamWithVideo,
  killVideoTracks,
  replaceTracks,
  stopMediaStream,
} from "../../../../services/videoChatService";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";

const MainScreen = ({dbRef,roomId}) => {
  const participants = useSelector(
    (state) => state.videoChatReducer.participants
  );
  const mainStream = useSelector((state) => state.videoChatReducer.mainStream);
  const currentUser = useSelector(
    (state) => state.videoChatReducer.currentUser
  );
  const history = useHistory();
  const dispatch = useDispatch();

  const participantRef = useRef(participants);

  const onMicClick = (micEnabled) => {
    if (mainStream) {
      mainStream.getAudioTracks()[0].enabled = micEnabled;
      dispatch(updateUserAction(currentUser, { audio: micEnabled },roomId));
    }
  };
  const onVideoClick = async (videoEnabled) => {
    if (mainStream) {
      mainStream.getVideoTracks()[0].enabled = videoEnabled;
      dispatch(updateUserAction(currentUser, { video: videoEnabled },roomId));
    }
  };

  useEffect(() => {
    participantRef.current = participants;
  }, [participants]);

  const updateStream = (stream) => {
    for (let key in participantRef.current) {
      const sender = participantRef.current[key];
      if (sender.currentUser) continue;
      const peerConnection = sender.peerConnection
        .getSenders()
        .find((s) => (s.track ? s.track.kind === "video" : false));
      peerConnection.replaceTrack(stream.getVideoTracks()[0]);
    }
    dispatch(setMainStreamAction(stream));
  };

  const onEndCall = () => {
    let cookies = new Cookies;
    
    stopMediaStream(mainStream);
    dbRef.child(Object.keys(currentUser)[0]).remove();
    removeParticipantAction(participants,Object.keys(currentUser)[0])
    // console.log(Object.keys(currentUser)[0]);

    history.replace({
      pathname: "/videochat/offboard",
      state: {
        message: "Thank you for joining the session!",
        title: "See you soon!",
      },
    });
    cookies.set("hasJoined", false, { path: "/" });
    // console.log(Object.keys(currentUser)[0]);
  };

  const onScreenShareEnd = async (callback) => {

    // console.log(mainStream);

    mainStream.getVideoTracks()[0].stop();
    
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });


    // navigator.mediaDevices.getUserMedia({
    //   video: { mediaSource: "screen" },
    // });
    

    localStream.getVideoTracks()[0].enabled =
      Object.values(currentUser)[0].video;

    updateStream(localStream);

    dispatch(updateUserAction(currentUser, { screen: false },roomId));

    callback(false)
  };

  const onScreenClick = async (callback) => {
    let mediaStream;
    if (navigator.getDisplayMedia) {
      mediaStream = await navigator.getDisplayMedia({ video: true });
    } else if (navigator.mediaDevices.getDisplayMedia) {
      mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
    } else {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { mediaSource: "screen" },
      });
    }

    mediaStream.getVideoTracks()[0].onended = onScreenShareEnd;

    updateStream(mediaStream);

    dispatch(updateUserAction(currentUser, { screen: true },roomId));

    callback(true);
  };
  return (
    <div className="wrapper">
      <div className="main-screen">
        <Participants />
      </div>

      <div className="footer">
        <MeetingFooter
          onScreenClick={onScreenClick}
          onMicClick={onMicClick}
          onVideoClick={onVideoClick}
          onEndCall={onEndCall}
          onScreenShareEnd={onScreenShareEnd}
        />
      </div>
    </div>
  );
};

export default MainScreen;
