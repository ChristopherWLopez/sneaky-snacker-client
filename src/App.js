// import logo from './logo.svg';
// import './App.css';
import React,{ useEffect, useState } from "react";
import { child } from "../child";
import { doggo } from "../doggo";
import { socket } from "../src/Socket-server"; 


const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
      function handleConnect() {
        setIsConnected(true);
        console.log("handleConnect has been triggered");
      }

      function handleDisconnect() {
        setIsConnected(false);
        console.log("handleDisconnect has been triggered");
      }

      child.on("connect", handleConnect);
      doggo.on("connect", handleConnect);

      child.on("disconnect", handleDisconnect);
      doggo.on("disconnect", handleDisconnect);
      child.on("response", (payload) => console.log(payload));
      doggo.on("response", (payload) => console.log(payload));

      return ()=> {
        child.off("connect", handleConnect);
        doggo.off("connect", handleConnect);
  
        child.off("disconnect", handleDisconnect);
        doggo.off("disconnect", handleDisconnect);
        child.off("response", () => console.log("response listener is off"));
        doggo.off("response", () => console.log("response listener is off"));
      };
}, []);

    const handleHello = () => {
      child.emit("hello");
      doggo.emit("bark!")
    };

return (
  <div>
    <p>Is connected? {isConnected ? "true" : "false"}</p>
    <button onClick={handleHello}>Say hello</button>
  </div>
);
  }

export default App;
