import React, { useEffect, useRef, useState } from "react";
import "./Participants.css";
import { useSelector, useDispatch } from "react-redux";
import { Participant } from "./Participant/Participant";
import { actionTypes } from "../../../../actions/const";

const Participants = () => {
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const participantsState = useSelector(state=>state.videoChatReducer.participants)
  const mainStream = useSelector(state=>state.videoChatReducer.mainStream)
  const currentUserState = useSelector(state=>state.videoChatReducer.currentUser)
  // const hasPresenter = useSelector(state=>state.videoChatReducer.hasPresenter)

  let participantKey = Object.keys(participantsState);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = mainStream;
      videoRef.current.muted = true;
    }
  }, [currentUserState, mainStream]);

  const currentUser = currentUserState
    ? Object.values(currentUserState)[0]
    : null;

  let gridCol =
    participantKey.length === 1 ? 1 : participantKey.length <= 4 ? 2 : 4;
  const gridColSize = participantKey.length <= 4 ? 1 : 2;
  let gridRowSize =
    participantKey.length <= 4
      ? participantKey.length
      : Math.ceil(participantKey.length / 2);

  const screenPresenter = participantKey.find((element) => {
    const currentParticipant = participantsState[element];
    if(currentParticipant.screen){
      dispatch({
        type:actionTypes.SET_PRESENTER
      })
    }
    else{
      dispatch({
        type:actionTypes.UNSET_PRESENTER
      })
    }
    return currentParticipant.screen;
  });

  if (screenPresenter) {
    gridCol = 1;
    gridRowSize = 2;
  }
  const participants = participantKey.map((element, index) => {
    const currentParticipant = participantsState[element];
    const isCurrentUser = currentParticipant.currentUser;
    if (isCurrentUser) {
      return null;
    }
    const pc = currentParticipant.peerConnection;
    const remoteStream = new MediaStream();
    let curentIndex = index;
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
      const videElement = document.getElementById(
        `participantVideo${curentIndex}`
      );
      if (videElement) videElement.srcObject = remoteStream;
    // if (pc) {
  
    //   };
    }

    return (
      // console.log(element),
      <Participant
        key={curentIndex}
        currentParticipant={currentParticipant}
        curentIndex={curentIndex}
        hideVideo={(screenPresenter && screenPresenter !== element)}
        showAvatar={
          !currentParticipant.video &&
          !currentParticipant.screen &&
          currentParticipant.name
        }
      />
    );
  });
  return (
    // console.log('jpk'),
    <div
      style={{
        "--grid-size": gridCol,
        "--grid-col-size": gridColSize,
        "--grid-row-size": gridRowSize,
      }}
      className={`participants`}
    >
      {participants}
      <Participant
        currentParticipant={currentUser}
        curentIndex={participantKey.length}
        hideVideo={screenPresenter && !currentUser.screen}
        videoRef={videoRef}
        showAvatar={currentUser && !currentUser.video && !currentUser.screen}
        currentUser={true}
      />
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     participants: state.participants,
//     currentUser: state.currentUser,
//     stream: state.mainStream,
//   };
// };

export default Participants;