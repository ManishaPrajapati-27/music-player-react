import React from "react";
import { useEffect } from "react";
// import { playAudio } from "./../util";

const LibrarySong = ({
  song,
  songs,
  id,
  setCurrentSong,
  isPlaying,
  audioRef,
  setSongs,
}) => {
  const songSelectHandler = async () => {
    const selectedSong = songs.filter((state) => state.id === id);
    await setCurrentSong(selectedSong[0]);

    // Active Selected Song
    const newSongs = songs.map((song) => {
      if (song.id === id) {
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
    //   Check song is playing
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "active" : ""}`}
    >
      <div className="image">
        <img src={song.cover} alt={song.name} />
      </div>
      <div className="text">
        <h3>{song.name}</h3>
        <h5>{song.artist}</h5>
      </div>
    </div>
  );
};

export default LibrarySong;
