import "./evangelion.css";
import music from "./music/Neon Genesis Evangelion.mp3";

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

  useEffect(() => {
    let timerID = setInterval(() => {
      handleInput();
    }, 2000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div className="background-image">
      <h1>Evangelion</h1>
      <span>
        <h2>Input from backend:</h2>
        <p>{input}</p>
      </span>
      <audio controls autoPlay>
        <source src={music} type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default Evangelion;
