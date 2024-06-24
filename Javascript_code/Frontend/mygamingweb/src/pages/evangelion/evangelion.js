import "./evangelion.css";
import music from "./music/Neon Genesis Evangelion.mp3";
import Eva_1 from "./sounds/Eva_1.mp3";

import { useEffect, useState } from "react";
import axios from "axios";

function Evangelion() {
  var [input, setInput] = useState([]);

  async function handleInput() {
    try {
      let response = await axios.get("http://localhost:8010/inputButt");
      setInput(response.data);
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  function playSound() {
    var audio = new Audio(Eva_1);
    audio.play();
  }

  useEffect(() => {
    let timerID = setInterval(() => {
      handleInput();

      // if (input == "right") {
      //   playSound();
      // }
    }, 2000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div className="background-image">
      <div id="evangelion-container">
        <h1>Evangelion</h1>
        <span>
          <h2>Input from backend:</h2>
          <p>{input}</p>
        </span>
        <audio controls>
          <source src={music} type="audio/mpeg" />
        </audio>
        <button onClick={playSound}>play</button>
      </div>
    </div>
  );
}

export default Evangelion;
