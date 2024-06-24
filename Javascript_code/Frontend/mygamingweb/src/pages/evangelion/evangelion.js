import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

function Evangelion() {
  const [input, setInput] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getInput = async () => {
      try {
        const response = await axios.get("http://localhost:8010/inputButt", {
          signal: controller.signal,
        });

        console.log(
          "Get input response: ",
          JSON.stringify(response.data.input)
        );

        if (isMounted) {
          setInput(response.data);
        }
      } catch (error) {
        console.log("Get input error: " + error);
      }
    };
    getInput();

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  return (
    <div>
      <h1>Evangelion</h1>
      <span>
        <h2>Input from backend:</h2>
        {input?.length ? (
          <p>
            {input.map((item, index) => (
              <span key={index}>{item.input}</span>
            ))}
          </p>
        ) : (
          <p>No input</p>
        )}
      </span>
    </div>
  );
}

export default Evangelion;
