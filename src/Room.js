import React from "react";

const Room = ({ currentRoom, handleDoorClick, choices, handleChoice }) => {
  const backgroundUrl = `url(/${currentRoom}.png)`;

  return (
    <div
      className="room"
      style={{
        position: "relative",
        height: "600px",
        backgroundImage: backgroundUrl,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      {/* <img src={`/${currentRoom}.png`} alt={`${currentRoom}`} /> */}
      {choices &&
        choices.map((choice) => (
          <button
            key={choice}
            value={choice}
            onClick={(e) => handleChoice(choice)}
            className="door"
            style={{
              position: "absolute",
              top: "30%",
              left: "40vw",
              width: "60px",
              height: "100px",
              backgroundColor: "brown",
              borderRadius: "5%",
            }}
          >
            <p style={{ fontSize: "12px", color: "white" }}>{choice}</p>
          </button>
        ))}
    </div>
  );
};

export default Room;
