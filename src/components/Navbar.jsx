import React from "react";
import { FiMusic } from "react-icons/fi";

const Navbar = ({ libraryStatus, setLibraryStatus }) => {
  const libraryToggleHandler = () => {
    setLibraryStatus(!libraryStatus);
  };

  return (
    <div className="navbar">
      <h1>
        Music<span>Waves</span>
      </h1>
      <button onClick={libraryToggleHandler} className="library-button">
        Library <FiMusic />
      </button>
    </div>
  );
};

export default Navbar;
