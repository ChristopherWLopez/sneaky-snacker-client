import React from "react";

const Room = ({ currentRoom }) => {
  return (
    <div>
      <img src={`/${currentRoom}.png`} alt={`${currentRoom}`} />
    </div>
  );
};

export default Room;
