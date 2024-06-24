import "./typing_test.css";

import { useState, useRef, useEffect } from "react";

const paragraph = `zankoku na tenshi no you ni shounen 
yo shinwa ni nare [Short Instrumental Intro] aoi   
kaze ga ima mune no DOA wo tataite mo watashi dake wo   
tada mitsumete hohoende'ru anata sotto fureru mono 
motomeru koto ni muchuu de unmei sae mada shiranai 
itaike na hitomi dakedo itsuka kidzuku deshou sono senaka ni wa
haruka mirai mezasu tame no hane ga aru koto zankoku na 
tenshi no TE-ZE madobe kara yagate tobitatsu hotobashiru atsui 
PATOSU de omoide wo uragiru nara kono sora wo daite kagayaku 
shounen yo shinwa ni nare [Instrumental] zutto nemutte'ru 
watashi no ai no yurikago anata dake ga yume no shisha ni 
yobareru asa ga kuru hosoi kubisuji wo tsukiakari ga 
utsushite'ru sekai-juu no toki wo tomete tojikometai kedo 
moshi mo futari aeta koto ni imi ga aru nara watashi wa sou 
jiyuu wo shiru tame no BAIBURU zankoku na tenshi no TE-ZE 
kanashimi ga soshite hajimaru dakishimeta inochi no katachi 
sono yume ni mezameta toki dare yori mo hikari wo hanatsu 
shounen yo shinwa ni nare hito wa ai wo tsumugi nagara 
rekishi wo tsukuru megami nante narenai mama watashi wa ikiru
zankoku na tenshi no TE-ZE madobe kara yagate tobitatsu 
hotobashiru atsui PATOSU de omoide wo uragiru nara kono sora 
wo daite kagayaku shounen yo shinwa ni nare`;

function TypingTest() {
  const maxTime = 60;
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [mistake, setMistake] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const inputRef = useRef(null);
  const charRefs = useRef([]);
  const [correctWrong, setCorrectWrong] = useState([]);

  useEffect(() => {
    inputRef.current.focus();
    setCorrectWrong(Array(charRefs.current.length).fill(""));
  }, []);

  const handleChange = (e) => {
    const charaters = charRefs.current;
    let currentChar = charRefs.current[charIndex];
    let typedChar = e.target.value.slice(-1);

    if (charIndex < charaters.length && timeLeft > 0) {
      if (!isTyping) {
        setIsTyping(true);
      }

      if (typedChar === currentChar.textContent) {
        setCharIndex(charIndex + 1);
        correctWrong[charIndex] = " correct ";
      } else {
        setMistake(mistake + 1);
        setCharIndex(charIndex + 1);
        correctWrong[charIndex] = " wrong ";
      }

      if (charIndex === charaters.length - 1) {
        setIsTyping(false);
      }
    } else {
      setIsTyping(false);
    }
  };

  const resetGame = () => {
    setIsTyping(false);
    setTimeLeft(maxTime);
    setCharIndex(0);
    setMistake(0);
    setCPM(0);
    setWPM(0);
    setCorrectWrong(Array(charRefs.current.length).fill(""));
    inputRef.current.focus();
  };

  return (
    <div className="typing-container">
      <div className="test">
        <input
          type="text"
          className="input-field"
          ref={inputRef}
          onChange={handleChange}
        ></input>
        {paragraph.split("").map((char, index) => {
          return (
            <span
              className={`char ${index === charIndex ? " active" : ""} ${
                correctWrong[index]
              }`}
              ref={(e) => (charRefs.current[index] = e)}
            >
              {char}
            </span>
          );
        })}
      </div>
      <br />
      <div className="result">
        <p>
          Time Left: <strong>{timeLeft}</strong>
        </p>
        <p>
          Mistake: <strong>{mistake}</strong>
        </p>
        <p>
          WPM: <strong>{WPM}</strong>
        </p>
        <p>
          CPM: <strong>{CPM}</strong>
        </p>
        <button className="btn" onClick={resetGame}>
          Try again
        </button>
      </div>
    </div>
  );
}

export default TypingTest;
