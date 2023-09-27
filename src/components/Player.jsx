import React, { useEffect } from "react";
import { FaAngleLeft, FaAngleRight, FaPlay, FaPause } from "react-icons/fa";
import { playAudio } from "../util";

const Player = ({
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setCurrentSong,
  currentSong,
  setSongs,
}) => {
  //   useEffect
  useEffect(() => {
    // Active Selected Song
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  }, [currentSong]);
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

  // Time display in nice way(Formates Time Number)
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  // Drag Handler for Range
  const dragHandler = (e) => {
    // console.log(e);
    // console.log(e.target.value);
    // For Control song time for as input drag
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value }); // For drag range as per time
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      // console.log(`next index is ${currentIndex + 1}`);
      // console.log(`songs length is ${songs.length}`);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        playAudio(isPlaying, audioRef);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      // console.log(`next index is ${currentIndex + 1}`);
      // console.log(`songs length is ${songs.length}`);
    }
    playAudio(isPlaying, audioRef);
    // console.log(currentIndex + 1);
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        {/* <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} /> */}
        <div
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
        >
          <FaAngleLeft />
        </div>
        <div onClick={playSongHandler} className="play">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <div
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
        >
          <FaAngleRight />
        </div>
      </div>
    </div>
  );
};

export default Player;
