import React from "react";

const LibrarySong = ({
  song,
  songs,
  setSongs,
  setCurrentSong,
  isPlaying,
  audioRef,
  id,
}) => {
  const songSelectHandler = () => {
    const selectedSong = songs.filter((state) => state.id === id);
    setCurrentSong(selectedSong[0]);
  };

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

  // setSongs(newSongs);

  // Check if the song is playing
  if (isPlaying) {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then((audio) => {
        audioRef.current.play();
      });
    }
  }

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
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
