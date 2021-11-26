import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVideo,
  faDesktop,
  faVideoSlash,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import "./MeetingFooter.css";
import {
  MdCallEnd,
  MdDesktopWindows,
  MdOutlineDesktopAccessDisabled,
  MdOutlineStopScreenShare,
} from "react-icons/md";
import Cookies from "universal-cookie";
import { stopMediaStream } from "../../../../services/videoChatService";
import { useSelector } from "react-redux";

const MeetingFooter = (props) => {
  const hasPresenter = useSelector(
    (state) => state.videoChatReducer.hasPresenter
  );
  const [streamState, setStreamState] = useState({
    mic: true,
    video: false,
    screen: false,
  });
  const micClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        mic: !currentState.mic,
      };
    });
  };

  const onVideoClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        video: !currentState.video,
      };
    });
  };

  const onScreenClick = () => {
    props.onScreenClick(setScreenState);
  };

  const onEndCallClick = () => {
    props.onEndCall();
  };

  const onScreenShareEndClick = () => {
    props.onScreenShareEnd(setScreenState);
  };

  const setScreenState = (isEnabled) => {
    // console.log(isEnabled);
    setStreamState((currentState) => {
      return {
        ...currentState,
        screen: isEnabled,
      };
    });
  };
  useEffect(() => {
    props.onMicClick(streamState.mic);
  }, [streamState.mic]);
  useEffect(() => {
    props.onVideoClick(streamState.video);
  }, [streamState.video]);
  return (
    <div className="meeting-footer">
      <div
        className={
          "meeting-icons " + (!streamState.mic ? "meeting-active" : "")
        }
        data-tip={streamState.mic ? "Mute Audio" : "Unmute Audio"}
        onClick={micClick}
      >
        <FontAwesomeIcon
          icon={!streamState.mic ? faMicrophoneSlash : faMicrophone}
          title="Mute"
        />
      </div>
      {!hasPresenter ? (
        <div
          className={
            "meeting-icons " + (!streamState.video ? "meeting-active" : "")
          }
          data-tip={streamState.video ? "Hide Video" : "Show Video"}
          onClick={onVideoClick}
        >
          <FontAwesomeIcon icon={!streamState.video ? faVideoSlash : faVideo} />
        </div>
      ) : (
        <div
          className={
            "meeting-icons " + (!streamState.video ? "meeting-active" : "")
          }
          data-tip={streamState.video ? "Hide Video" : "Show Video"}
          disabled={true}
        >
          <FontAwesomeIcon icon={!streamState.video ? faVideoSlash : faVideo} />
        </div>
      )}

      {streamState.screen ? (
        <>
          <div
            className="meeting-icons"
            data-tip="Share Screen"
            disabled={streamState.screen}
          >
            <MdDesktopWindows icon={faDesktop} />
          </div>

          <div
            className="meeting-icons"
            data-tip="Stop sharing"
            onClick={onScreenShareEndClick}
          >
            <MdOutlineDesktopAccessDisabled icon={faDesktop} />
          </div>
        </>
      ) : (
        <div
          className="meeting-icons"
          data-tip="Share Screen"
          onClick={onScreenClick}
          disabled={streamState.screen || hasPresenter}
        >
          <MdDesktopWindows icon={faDesktop} />
        </div>
      )}

      <div
        className="meeting-icons"
        data-tip="End the call"
        id="end-call"
        onClick={onEndCallClick}
      >
        <MdCallEnd size={22} />
      </div>
      <ReactTooltip />
    </div>
  );
};

export default MeetingFooter;
