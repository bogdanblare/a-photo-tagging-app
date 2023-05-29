import React from "react";

const Menu = ({ position, checkClick, hidden }) => {
  const { x, y } = position;
  const style = {
    position: "absolute",
    top: y,
    left: x,
    display: hidden ? "none" : "flex",
  };

  return (
    <div className="menu" style={style}>
      <button className="batman-button" onClick={() => checkClick("batman")}>
        Batman
      </button>
      <button className="sonic-button" onClick={() => checkClick("sonic")}>
        Sonic
      </button>
      <button className="waldo-button" onClick={() => checkClick("waldo")}>
        Waldo
      </button>
    </div>
  );
};

export default Menu;
