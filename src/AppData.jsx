import { v4 as uuidv4 } from "uuid";

const AppData = () => {
  return [
    {
      name: "Changing Winds",
      artist: "Knowmadic",
      cover: "https://i.scdn.co/image/ab67616d0000b273fca90fd7b378efe6b6598e8a",
      id: uuidv4(),
      active: true,
      color: ["#d45d6f", "#f6bf7a"],
      audio: "https://stream.chillhop.com/mp3/41654",
    },
    {
      name: "It'll Always be Alright",
      artist: "Masked Man",
      cover: "https://i.scdn.co/image/ab67616d0000b2730ea5e512c9a4593ada738a0e",
      id: uuidv4(),
      active: false,
      color: ["#cc7e4e", "#fcdc53"],
      audio: "https://stream.chillhop.com/mp3/41883",
    },
    {
      name: "Come In And Stay",
      artist: "Dotlights",
      cover: "https://i.scdn.co/image/ab67616d0000b273f73cc2e03a580f5440dbc18a",
      id: uuidv4(),
      active: false,
      color: ["#4b4e83", "#5482c0"],
      audio: "https://stream.chillhop.com/mp3/45146",
    },
  ];
};

export default AppData;
