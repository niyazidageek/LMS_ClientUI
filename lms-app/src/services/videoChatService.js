import firepadRef from "../fireBase";
import {store} from "../store"

const participantRef = firepadRef.child("participants");

export const updatePreference = (userId, preference) => {
  const currentParticipantRef = participantRef
    .child(userId)
    .child("preferences");
  setTimeout(() => {
    currentParticipantRef.update(preference);
  });
};

export const createOffer = async (peerConnection, receiverId, createdID) => {
  const currentParticipantRef = participantRef.child(receiverId);
  peerConnection.onicecandidate = (event) => {
    event.candidate &&
      currentParticipantRef
        .child("offerCandidates")
        .push({ ...event.candidate.toJSON(), userId: createdID });
  };

  const offerDescription = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
    userId: createdID,
  };

  await currentParticipantRef.child("offers").push().set({ offer });
};


export const initializeListensers = async (userId, participants) => {
  const currentUserRef = participantRef.child(userId);
  currentUserRef.child("offers").on("child_added", async (snapshot) => {
    const data = snapshot.val();
    if (data?.offer) {
      const pc = store.getState().videoChatReducer.participants[data.offer.userId].peerConnection;
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      await createAnswer(data.offer.userId, userId, participants);
    }
  });

  currentUserRef.child("offerCandidates").on("child_added", (snapshot) => {
    const data = snapshot.val();
    if (data.userId) {
      const pc = store.getState().videoChatReducer.participants[data.userId].peerConnection;
      pc.addIceCandidate(new RTCIceCandidate(data));
    }
  });

  currentUserRef.child("answers").on("child_added", (snapshot) => {
    const data = snapshot.val();
    if (data?.answer) {
      const pc = store.getState().videoChatReducer.participants[data.answer.userId].peerConnection;
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });

  currentUserRef.child("answerCandidates").on("child_added", (snapshot) => {
    const data = snapshot.val();
    if (data.userId) {
      const pc = store.getState().videoChatReducer.participants[data.userId].peerConnection;
      pc.addIceCandidate(new RTCIceCandidate(data));
    }
  });
};


export const addConnection = (newUser, currentUser, stream) => {
    const peerConnection = new RTCPeerConnection(servers);
    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });
    const newUserId = Object.keys(newUser)[0];
    const currentUserId = Object.keys(currentUser)[0];
  
    const offerIds = [newUserId, currentUserId].sort((a, b) =>
      a.localeCompare(b)
    );
  
    newUser[newUserId].peerConnection = peerConnection;
    if (offerIds[0] !== currentUserId)
      createOffer(peerConnection, offerIds[0], offerIds[1]);
    return newUser;
  };

  export const createUserStreamWithVideo = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    return localStream;
  };

  export const createUserStreamWithoutVideo = async ()=>{
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    return localStream;
  }

  export const killVideoTracks = (stream) =>{ 
    let videoTracks = stream.getTracks();
    for( var i = 0 ; i < videoTracks.length ; i++ ) videoTracks[i].enabled = false;

  }

  
const createAnswer = async (otherUserId, userId, participants) => {
    const pc = store.getState().videoChatReducer.participants[otherUserId].peerConnection;
    const participantRef1 = participantRef.child(otherUserId);
    pc.onicecandidate = (event) => {
      event.candidate &&
        participantRef1
          .child("answerCandidates")
          .push({ ...event.candidate.toJSON(), userId: userId });
    };
  
    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);
  
    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
      userId: userId,
    };
  
    await participantRef1.child("answers").push().set({ answer });
  };

  export const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun4.l.google.com:19302",
          "stun:stun.services.mozilla.com",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };