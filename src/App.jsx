import { useState, useRef } from "react";
// Import Styles
import "./assets/styles/app.scss";
// Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Navbar from "./components/Navbar";
// Import Data
import data from "./data";

function App() {
  // Ref
  const audioRef = useRef(null);
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animateTrackPercentage: 0,
  });

  // Time Update Function
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    // console.log(animation);
    // console.log(roundedCurrent);
    // console.log(roundedDuration);
    // console.log((roundedCurrent / roundedDuration) * 100);
    console.log(animation);
    // console.log(duration);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animateTrackPercentage: animation,
    });
    // console.log(e.target);
  };

  return (
    <div className="App">
      <Navbar
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <Song currentSong={currentSong} />
      <Player
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
