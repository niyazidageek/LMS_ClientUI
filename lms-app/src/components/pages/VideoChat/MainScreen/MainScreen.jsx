import React, { useRef, useEffect } from "react";
import MeetingFooter from "../MeetingFooter/MeetingFooter";
import Participants from "../Participants/Participants";
import "./MainScreen.css";
import { useSelector, useDispatch } from "react-redux";
import {setMainStreamAction, updateUserAction} from "../../../../actions/videoChatActions"
import { createUserStream, createUserStreamWithoutVideo, createUserStreamWithVideo, killVideoTracks, replaceTracks, stopMediaStream } from "../../../../services/videoChatService";

const MainScreen = () => {
  const participants = useSelector(state=>state.videoChatReducer.participants)
  const mainStream = useSelector(state=>state.videoChatReducer.mainStream)
  const currentUser = useSelector(state=>state.videoChatReducer.currentUser)
  const dispatch = useDispatch();

  const participantRef = useRef(participants);

  const onMicClick = (micEnabled) => {
    if (mainStream) {
      mainStream.getAudioTracks()[0].enabled = micEnabled;
      dispatch(updateUserAction(currentUser,{ audio: micEnabled }))
    }
  };
  const onVideoClick = async (videoEnabled) => {
    if (mainStream) {
      mainStream.getVideoTracks()[0].enabled = videoEnabled;
      dispatch(updateUserAction(currentUser,{ video: videoEnabled }))
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
    dispatch(setMainStreamAction(stream))
  };

  const onEndCall = ()=>{
    stopMediaStream(mainStream);
  }

  const onScreenShareEnd = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    localStream.getVideoTracks()[0].enabled = Object.values(
      currentUser
    )[0].video;

    updateStream(localStream);

    dispatch(updateUserAction(currentUser,{ screen: false }))
  };

  const onScreenClick = async () => {
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

    dispatch(updateUserAction(currentUser,{ screen: true }))
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
          onEndCall = {onEndCall}
        />
      </div>
    </div>
  );
};

export default MainScreen;