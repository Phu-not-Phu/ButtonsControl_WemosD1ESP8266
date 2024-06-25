import "./evangelion.css";
import music from "./music/Neon Genesis Evangelion.mp3";
import Eva_1 from "./sounds/Eva_1.mp3";

import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Evangelion() {
  const [input, setInput] = useState([]);
  const [lyrics, setLyrics] = useState([]);
  const [text, setText] = useState("Text");
  const getLyricRef = useRef(false);

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

  function playSound() {
    var audio = new Audio(Eva_1);
    audio.play();
  }

  function changeText() {
    setText("Hello World");
  }

  useEffect(() => {
    if (getLyricRef.current === false) {
      const getLyrics = async () => {
        try {
          await axios
            .get("http://localhost:8010/evangelion")
            .then((response) => {
              setLyrics(response.data);
            });
        } catch (error) {
          console.log(error);
        }
      };

      getLyrics();

      return () => {
        getLyricRef.current = true;
      };
    }
  }, []);

  useEffect(() => {
    console.log("Lyrics", lyrics[0].lyric);
  }, [lyrics]);

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
        <button onClick={playSound}>play sond</button>
        <button onClick={changeText}>change text</button>
        <p>{text}</p>
        <div>
          <h2>Lyrics:</h2>
        </div>
      </div>
    </div>
  );
}

export default Evangelion;
