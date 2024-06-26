import "./evangelion.css";
import music from "./music/Neon Genesis Evangelion.mp3";

//Import sounds
import Eva_1 from "./sounds/Eva_1.mp3";
import Eva_2 from "./sounds/Eva_2.mp3";
import Eva_3 from "./sounds/Eva_3.mp3";
import Eva_4 from "./sounds/Eva_4.mp3";
import Eva_5 from "./sounds/Eva_5.mp3";
import Eva_6 from "./sounds/Eva_6.mp3";
import Eva_7 from "./sounds/Eva_7.mp3";
import Eva_8 from "./sounds/Eva_8.mp3";
import Eva_9 from "./sounds/Eva_9.mp3";
import Eva_10 from "./sounds/Eva_10.mp3";
import Eva_11 from "./sounds/Eva_11.mp3";
import Eva_12 from "./sounds/Eva_12.mp3";
import Eva_13 from "./sounds/Eva_13.mp3";
import Eva_14 from "./sounds/Eva_14.mp3";
import Eva_15 from "./sounds/Eva_15.mp3";
import Eva_16 from "./sounds/Eva_16.mp3";
import Eva_17 from "./sounds/Eva_17.mp3";
import Eva_18 from "./sounds/Eva_18.mp3";
import Eva_19 from "./sounds/Eva_19.mp3";
import Eva_20 from "./sounds/Eva_20.mp3";
import Eva_21 from "./sounds/Eva_21.mp3";
import Eva_22 from "./sounds/Eva_22.mp3";
import Eva_23 from "./sounds/Eva_23.mp3";
import Eva_24 from "./sounds/Eva_24.mp3";
import Eva_25 from "./sounds/Eva_25.mp3";
import Eva_26 from "./sounds/Eva_26.mp3";
import Eva_27 from "./sounds/Eva_27.mp3";
import Eva_28 from "./sounds/Eva_28.mp3";
import Eva_29 from "./sounds/Eva_29.mp3";
import Eva_30 from "./sounds/Eva_30.mp3";
import Eva_31 from "./sounds/Eva_31.mp3";
import Eva_32 from "./sounds/Eva_32.mp3";
import Eva_33 from "./sounds/Eva_33.mp3";
import Eva_34 from "./sounds/Eva_34.mp3";
import Eva_35 from "./sounds/Eva_35.mp3";
import Eva_36 from "./sounds/Eva_36.mp3";
import Eva_37 from "./sounds/Eva_37.mp3";
import Eva_38 from "./sounds/Eva_38.mp3";
import Eva_39 from "./sounds/Eva_39.mp3";
import Eva_40 from "./sounds/Eva_40.mp3";
import Eva_41 from "./sounds/Eva_41.mp3";
import Eva_42 from "./sounds/Eva_42.mp3";
import Eva_43 from "./sounds/Eva_43.mp3";

//Import react hooks
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import axios from "axios";

function Evangelion() {
  const [input, setInput] = useState([]);
  const [lyrics, setLyrics] = useState([]);
  const [lyricIndex, setLyricIndex] = useState(0);
  const [start, setStart] = useState(false);

  const getLyricRef = useRef(false);

  //Store sounds in an array
  const sounds = useMemo(() => {
    return [
      "",
      Eva_1,
      Eva_2,
      Eva_3,
      Eva_4,
      Eva_5,
      Eva_6,
      Eva_7,
      Eva_8,
      Eva_9,
      Eva_10,
      Eva_11,
      Eva_12,
      Eva_13,
      Eva_14,
      Eva_15,
      Eva_16,
      Eva_17,
      Eva_18,
      Eva_19,
      Eva_20,
      Eva_21,
      Eva_22,
      Eva_23,
      Eva_24,
      Eva_25,
      Eva_26,
      Eva_27,
      Eva_28,
      Eva_29,
      Eva_30,
      Eva_31,
      Eva_32,
      Eva_33,
      Eva_34,
      Eva_35,
      Eva_36,
      Eva_37,
      Eva_38,
      Eva_39,
      Eva_40,
      Eva_41,
      Eva_42,
      Eva_43,
    ];
  }, []);

  //Function handle input from backend
  async function handleInput() {
    try {
      let response = await axios.get("http://localhost:8010/inputButt");
      setInput(response.data);
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  useEffect(() => {
    let timerID = null;
    if (start) {
      timerID = setInterval(() => {
        handleInput();
      }, 500);
    }

    return () => {
      clearInterval(timerID);
    };
  }, [start]);

  //Function handle lyrics from backend
  useEffect(() => {
    if (getLyricRef.current === false) {
      const getLyrics = async () => {
        try {
          await axios
            .get("http://localhost:8010/evangelion")
            .then((response) => {
              setLyrics(response.data);
              console.log(response.data);
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
    console.log("Lyrics", lyrics[0]);
  }, [lyrics]);

  //Function handle changing lyrics
  function startLyric() {
    setStart(true);
  }

  const nextLyric = useCallback(() => {
    var audio = new Audio(sounds[lyricIndex]);

    if (lyricIndex < lyrics.length - 1) {
      setLyricIndex(lyricIndex + 1);
      audio = new Audio(sounds[lyricIndex + 1]);
      audio.play();
    }
  }, [lyricIndex, lyrics, sounds]);

  function resetLyric() {
    setLyricIndex(0);
    setStart(false);
    setInput([]);
  }

  //Function to compare input from Wemos with direction from lyrics
  useEffect(() => {
    if (input.length > 0 && lyrics.length > 0) {
      if (input === lyrics[lyricIndex].direction) {
        nextLyric();
      }
    }
  }, [input, lyricIndex, lyrics, nextLyric]);

  return (
    <div className="background-image">
      <div id="evangelion-container">
        <h1>Evangelion</h1>
        <span>
          <h2>Input from Wemos:</h2>
          {input.length > 0 ? <p>{input}</p> : <p>Loading...</p>}
        </span>
        <audio controls>
          <source src={music} type="audio/mpeg" />
        </audio>
        <button onClick={startLyric}>Start lyric</button>
        <button onClick={nextLyric}>Next lyric</button>
        <button onClick={resetLyric}>Reset lyric</button>
        <div>
          {start ? (
            // <h2>Input from Wemos: </h2>
            <div>
              <h2>Input from lyric: </h2>
              {lyrics.length > 0 ? (
                <p>{lyrics[lyricIndex].direction}</p>
              ) : (
                <p>Loading...</p>
              )}
              <h2>Lyrics:</h2>
              {lyrics.length > 0 ? (
                <div>
                  <p>{lyrics[lyricIndex].lyric}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ) : (
            <h2>Press Start Button</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Evangelion;
