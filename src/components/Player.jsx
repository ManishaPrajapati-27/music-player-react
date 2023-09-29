import React, { useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { FiSkipBack, FiSkipForward } from "react-icons/fi";

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

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      // console.log(`next index is ${currentIndex + 1}`);
      // console.log(`songs length is ${songs.length}`);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      // console.log(`next index is ${currentIndex + 1}`);
      // console.log(`songs length is ${songs.length}`);
    }
    if (isPlaying) audioRef.current.play();
    // playAudio(isPlaying, audioRef);
    // console.log(currentIndex + 1);
  };

  // Add Style
  const trackAnim = {
    transform: `translateX(${songInfo.animateTrackPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="play-control">
        {/* <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} /> */}
        <div
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back play-icons icon"
        >
          <FiSkipBack />
        </div>
        <div onClick={playSongHandler} className="play play-icons">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <div
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward play-icons icon"
        >
          <FiSkipForward />
        </div>
      </div>
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track">
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
    </div>
  );
};

export default Player;
