import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight, FaPlay, FaPause } from "react-icons/fa";

const Player = ({
  isPlaying,
  setIsPlaying,
  audioRef,
  getTime,
  songInfo,
  setSongInfo,
}) => {
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
        <div onClick={playSongHandler} className="play">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <FaAngleRight className="skip-forward" />
      </div>
    </div>
  );
};

export default Player;
