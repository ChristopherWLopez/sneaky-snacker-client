import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import { EVENT_NAMES } from "./utils";
import "./App.scss";
import bannerImage from "./Banner.png";

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([]);
  const [message, setMessage] = useState('')

  useEffect(() => {
    function handleConnect() {
      setIsConnected(true);
      console.log("handleConnect has been triggered");
      setQuestion("");
      setChoices([]);
    }

    function handleDisconnect() {
      setIsConnected(false);
      console.log("handleDisconnect has been triggered");
      setQuestion("");
      setChoices([]);
    }

    // these are our listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("response", (payload) => console.log(payload));
    socket.on(EVENT_NAMES.questionsReady, (question) => {
      setQuestion(question);
      setChoices(question.choices)
      console.log(question);
      console.log(question.choices);
    });

    socket.on(EVENT_NAMES.message, (message) =>{
      console.log(message);
      setMessage(message);
    })
    // clean up the socket listeners
    return () => {
      // turns off socket listeners
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("response", () => console.log("response listener is off"));
    };
  }, []);

  const handleReady = () => {
    socket.emit(EVENT_NAMES.childReady);
  };

  const handleChoice = (choice) => {
    setMessage('');
    console.log(choice);
    socket.emit(EVENT_NAMES.selection, choice);
  };

  return (
    <div>
      <p>{isConnected ? "connected" : "not connected"}</p>
      <br></br>
      <img src={bannerImage} alt="banner" />
      <br></br>
      <button className="startButton" onClick={handleReady}>
        Start new game
      </button>
      <div>
      {message}
      <br></br>
      <br></br>
      {question.message}

        <div className="choices">
          {choices &&
            choices.map((choice) => (
              <button
                key={choice}
                value={choice}
                onClick={(e) => handleChoice(choice)}
              >
                {choice}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
