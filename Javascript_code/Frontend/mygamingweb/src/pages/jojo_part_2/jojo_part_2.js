// import "../evangelion/evangelion.css";
import music from ".//music/JoJo's Bizarre Adventure - Opening 2.mp3";

//Import background images
import Pic_1 from "./assets/jojop2_1.jpg";
import Pic_3 from "./assets/jojop2_2.jpg";
import Pic_5 from "./assets/jojop2_3.jpg";
import logo from "./assets/logo.png";

//Import sounds
import Eva_1 from "./sounds/jo_1.mp3";
import Eva_2 from "./sounds/jo_2.mp3";
import Eva_3 from "./sounds/jo_3.mp3";
import Eva_4 from "./sounds/jo_4.mp3";
import Eva_5 from "./sounds/jo_5.mp3";
import Eva_6 from "./sounds/jo_6.mp3";
import Eva_7 from "./sounds/jo_7.mp3";
import Eva_8 from "./sounds/jo_8.mp3";
import Eva_9 from "./sounds/jo_9.mp3";
import Eva_10 from "./sounds/jo_10.mp3";
import Eva_11 from "./sounds/jo_11.mp3";
import Eva_12 from "./sounds/jo_12.mp3";
import Eva_13 from "./sounds/jo_13.mp3";
import Eva_14 from "./sounds/jo_14.mp3";
import Eva_15 from "./sounds/jo_15.mp3";
import Eva_16 from "./sounds/jo_16.mp3";
import Eva_17 from "./sounds/jo_17.mp3";
import Eva_18 from "./sounds/jo_18.mp3";
import Eva_19 from "./sounds/jo_19.mp3";
import Eva_20 from "./sounds/jo_20.mp3";
import Eva_21 from "./sounds/jo_21.mp3";
import Eva_22 from "./sounds/jo_22.mp3";
import Eva_23 from "./sounds/jo_23.mp3";
import Eva_24 from "./sounds/jo_24.mp3";
import Eva_25 from "./sounds/jo_25.mp3";
import Eva_26 from "./sounds/jo_26.mp3";
import Eva_27 from "./sounds/jo_27.mp3";
import Eva_28 from "./sounds/jo_28.mp3";
import Eva_29 from "./sounds/jo_29.mp3";
import Eva_30 from "./sounds/jo_30.mp3";
import Eva_31 from "./sounds/jo_31.mp3";
import Eva_32 from "./sounds/jo_32.mp3";
import Eva_33 from "./sounds/jo_33.mp3";
import Eva_34 from "./sounds/jo_34.mp3";
import Eva_35 from "./sounds/jo_35.mp3";
import Eva_36 from "./sounds/jo_36.mp3";
import Eva_37 from "./sounds/jo_37.mp3";
import Eva_38 from "./sounds/jo_38.mp3";
import Eva_39 from "./sounds/jo_39.mp3";

//Import react hooks
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";

function Evangelion() {
  const [input, setInput] = useState([]);
  const [lyrics, setLyrics] = useState([]);
  const [lyricFuture, setLyricFuture] = useState([]);
  const [lyricIndex, setLyricIndex] = useState(0);
  const [start, setStart] = useState(false);
  const [nextLyricIndex, setNextLyricIndex] = useState(1);

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
            .get("http://localhost:8010/jojopart2")
            .then((response) => {
              setLyrics(response.data);
              setLyricFuture(response.data);
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

    if (start) {
      if (lyricIndex < lyrics.length - 1) {
        setLyricIndex(lyricIndex + 1);

        if (lyricIndex < lyrics.length - 2) {
          setNextLyricIndex(nextLyricIndex + 1);
        } else {
          setNextLyricIndex(lyricIndex + 1);
        }
        audio = new Audio(sounds[lyricIndex + 1]);
        audio.play();
      }
    }
  }, [lyricIndex, lyrics, sounds, start, nextLyricIndex]);

  const previousLyric = useCallback(() => {
    if (lyricIndex > 1) {
      var audio = new Audio(sounds[lyricIndex]);

      if (lyricIndex < lyrics.length - 1) {
        setNextLyricIndex(nextLyricIndex - 1);
      } else {
        setNextLyricIndex(lyricIndex);
      }

      setLyricIndex(lyricIndex - 1);

      audio = new Audio(sounds[lyricIndex - 1]);
      audio.play();
    }
  }, [lyricIndex, sounds, nextLyricIndex, lyrics]);

  async function resetLyric() {
    setLyricIndex(0);
    setNextLyricIndex(1);
    setStart(false);
    setInput([]);

    //Reset input from Database
    try {
      await axios
        .get("http://localhost:8010/inputButt/refresh")
        .then((response) => {
          setInput(response.data);
        });
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  //Function to compare input from Wemos with direction from lyrics
  useEffect(() => {
    if (input.length > 0 && lyrics.length > 0) {
      if (input === lyrics[lyricIndex].direction) {
        nextLyric();
      }
    }
  }, [input, lyricIndex, lyrics, nextLyric]);

  //Function to change background images
  function changeBackground1() {
    document.getElementsByClassName(
      "background-image"
    )[0].style.backgroundImage = `url(${Pic_1})`;
  }

  function changeBackground2() {
    document.getElementsByClassName(
      "background-image"
    )[0].style.backgroundImage = `url(${Pic_3})`;
  }

  function changeBackground3() {
    document.getElementsByClassName(
      "background-image"
    )[0].style.backgroundImage = `url(${Pic_5})`;
  }

  return (
    <div
      className="background-image"
      style={{ "background-image": `url(${Pic_1})` }}
    >
      <div id="evangelion-container">
        <div className="songs"></div>
        <div className="player">
          {/*Logo*/}
          <div className="logo-evangelion">
            <img src={logo} alt="" />
          </div>

          {/*Title song*/}
          <div className="text-wrapper">
            <h3>Bloody Stream - Coda</h3>
            <h3>Bloody Stream - Coda</h3>
            <h3>Bloody Stream - Coda</h3>
          </div>

          {/*Full song control*/}
          <audio controls>
            <source src={music} type="audio/mpeg" />
          </audio>

          {/*Lyric control*/}
          <div id="button-layout">
            <button onClick={resetLyric} id="reset-button">
              Reset
            </button>
            <button onClick={previousLyric} id="prevlyric-button">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
              >
                <path d="m27 28a1 1 0 0 1 -.5-.13l-19-11a1 1 0 0 1 0-1.74l19-11a1 1 0 0 1 1 0 1 1 0 0 1 .5.87v22a1 1 0 0 1 -1 1zm-17-12 16 9.27v-18.54z" />
                <path d="m2 4h2v24h-2z" />
                <path d="m0 0h32v32h-32z" fill="none" />
              </svg>
            </button>
            <button onClick={nextLyric} id="nextlyric-button">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
              >
                <path d="m5 28a1 1 0 0 1 -1-1v-22a1 1 0 0 1 .5-.87 1 1 0 0 1 1 0l19 11a1 1 0 0 1 0 1.74l-19 11a1 1 0 0 1 -.5.13zm1-21.27v18.54l16-9.27z" />
                <path d="m28 4h2v24h-2z" />
                <path d="m0 0h32v32h-32z" fill="none" />
              </svg>
            </button>
            <button onClick={startLyric} id="start-button">
              Start
            </button>
          </div>

          {/*Song contents*/}
          <div className="lyric-container">
            {!start ? (
              <div id="start-display">
                <h2>Press Start Button</h2>
              </div>
            ) : (
              <div className="display-content">
                {/*Display lyrics*/}
                <div className="lyric-display">
                  <div id="lyric-word-display">
                    <h2>Lyrics:</h2>
                  </div>
                  {lyrics.length > 0 ? (
                    <>
                      <div id="lyric-of-the-song">
                        <p>{lyrics[lyricIndex].lyric}</p>
                      </div>
                      <div id="lyric-future-of-the-song">
                        <p>{lyricFuture[nextLyricIndex].lyric}</p>
                      </div>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>

                {/*Display input from Wemos and lyrics*/}
                <div className="input-display">
                  <div id="input-wemos">
                    <h2>Wemos</h2>
                    {input.length > 0 ? <p>{input}</p> : <p>Loading...</p>}
                  </div>
                  <div id="input-lyric">
                    <h2>Direction</h2>
                    {lyrics.length > 0 ? (
                      <div id="circle-dot">
                        <p>{lyrics[lyricIndex].direction}</p>
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/*Background images*/}
        <div className="background">
          <div className="back-frem">
            <div className="back-change" onClick={changeBackground1}>
              <img src={Pic_1} alt="" id="pic1"></img>
            </div>
            <div className="back-change" onClick={changeBackground2}>
              <img src={Pic_3} alt="" id="pic2"></img>
            </div>
            <div className="back-change" onClick={changeBackground3}>
              <img src={Pic_5} alt="" id="pic3"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Evangelion;
