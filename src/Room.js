import React from "react";

const rooms = [
  "kidsroom",
  "bathroom",
  "parentsroom",
  "hallway",
  "kitchen",
  "livingroom",
  "garage",
];

const Room = (choices) => {
  return (
    <div>
      {choices.forEach((choice) => {
        rooms.includes(choice) && <img src={`/${choice}.png`} alt={choice} />;
      })}
    </div>
  );
};

export default Room;
