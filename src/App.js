import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import { EVENT_NAMES } from "./utils";
import './App.scss';
import bannerImage from './Banner.png';


// const sendAnswer =(answer)=>{
//   socket.emit(EVENT_NAMES.selection, answer);
//     console.log(answer);
// }

const App = () => {

  const [isConnected, setIsConnected] = useState(false);
  const [question, setQuestion] = useState("");
  // const [isReady, setIsReady] = useState(false)
  const [choices, setChoices] = useState([]);
  // const [selection, setSelection] = useState('');
  // const [room, setRoom] = useState()


  useEffect(() => {
    function handleConnect() {
      setIsConnected(true);
      console.log("handleConnect has been triggered");
      setQuestion("")
      setChoices([]);
    }

    function handleDisconnect() {
      setIsConnected(false);
      console.log("handleDisconnect has been triggered");
      setQuestion("")
      setChoices([]);
    }

    

      // socket.emit(EVENT_NAMES.selection, selection);

  //     const handleChoice = (selection) => {
  //   socket.emit(EVENT_NAMES.selection, selection);
  // };
    

    // these are our listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("response", (payload) => console.log(payload));
    socket.on(EVENT_NAMES.questionsReady, (question) => {
      setQuestion(question);
      setChoices(question.choices);

      // setIsReady(true);
      console.log(question);
      console.log(question.choices);
      // clean up the socket listeners
    });

    return () => {
      // turns off socket listeners
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("response", () => console.log("response listener is off"));
    };
  }, []);

  // const handleHello = () => {
  //   socket.emit("hello");
  // };

  const handleReady = () => {
    socket.emit(EVENT_NAMES.childReady);
    // socket.on(EVENT_NAMES.questionsReady, (question) => setQuestion(question));
    // setIsReady(true);
    // console.log(question);
  };

  const handleChoice = (choice) => {
    console.log(choice);
    socket.emit(EVENT_NAMES.selection, choice);
    
  };


  return (
    <div>
      <p>{isConnected ? "connected" : "not connected"}</p>
      <br></br>
      <img src={bannerImage} alt="banner" />
      <br></br>
      {/* <button onClick={handleHello}>Say hello</button> */}
      <button className="startButton" onClick={handleReady}>Start new game</button>
      {/* <EffectDemo /> */}
      <div>
        {question.message}
         
         <div className="choices">
          {choices.map((choice) => (
        <button key={choice} value={choice} onClick={(e)=> handleChoice(choice)}>
          {choice}
        </button>
        ))}
        </div>
        {/* {question.choices.map((choice) => 
          <button>{choice}</button>
        )} */}
      </div>
    </div>
  );
};


export default App;
