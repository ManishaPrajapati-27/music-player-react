import React, { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaPlay, FaPause } from "react-icons/fa";
const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  // Ref
  const audioRef = useRef(null);

  // Event
  const playSongHandler = () => {
    // console.log(audioRef.current);
    // audioRef.current.play();

    // For Pause and Play State

    if (isPlaying) {
      audioRef.current.pause(); // Pause
      setIsPlaying(!isPlaying); // Is Play in state
    } else {
      audioRef.current.play(); // Play
      setIsPlaying(!isPlaying); // Is Play in state
    }
  };

  // Time Update Function
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // console.log(duration);
    setSongInfo({ ...songInfo, currentTime: current, duration });
    // console.log(e.target);
  };

  // Time display in nice way(Formates Time Number)
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  // State
  const [songInfo, setSongInfo] = useState({
    currentTime: null,
    duration: null,
  });

  // Drag Handler for Range
  const dragHandler = (e) => {
    // console.log(e);
    // console.log(e.target.value);
    // For Control song time for as input drag
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value }); // For drag range as per time
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        {/* <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} /> */}
        <FaAngleLeft className="skip-back" />

        {/* <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={FaPlay}
        /> */}
        <div onClick={playSongHandler} className="play">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        {/* <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        /> */}
        <FaAngleRight className="skip-forward" />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
