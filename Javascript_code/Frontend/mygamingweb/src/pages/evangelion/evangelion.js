import { useEffect, useState } from "react";
import axios from "axios";

function Evangelion() {
  var [input, setInput] = useState([]);

  async function handleInput() {
    try{
      let response = await axios.get("http://localhost:8010/inputButt");
      setInput(response.data);
    }catch(error){
      console.log("Error: " + error);
    }
  }

  useEffect(() => {
    let timerID = setInterval(() => {
      handleInput();
    }, 2000);

    return () => {
      clearInterval(timerID);
    }
  }, [])

  return (
    <div>
      <h1>Evangelion</h1>
      <span>
        <h2>Input from backend:</h2>
        {/* {input?.length ? (
          <p>
            {input.map((item, index) => (
              <span key={index}>{item.input}</span>
            ))}
          </p>
        ) : (
          <p>No input</p>
        )} */}
        <p>{input}</p>
      </span>
    </div>
  );
}

export default Evangelion;
