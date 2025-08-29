import React from "react";

function Light({ room, on, mToggle }) {
  console.log({ room, on });
  return (
    <div>
      <button style={{backgroundColor:'green', margin: '2px'}} onClick={mToggle}>
        {room}
        {on ? "💡" : "⬛"}
      </button>
    </div>
  );
}

export default React.memo(Light);