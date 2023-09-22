import React from "react";

const Song = ({ currentSong }) => {
  return (
    <div className="song">
      <div className="image">
        <img src={currentSong.cover} alt={currentSong.name} />
      </div>
      <div className="text">
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
      </div>
    </div>
  );
};

export default Song;
