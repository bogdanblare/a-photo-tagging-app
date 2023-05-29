import map from "./../images/map/map.jpg";
import { useState } from "react";
import Menu from "./Menu";
import { getPercentageData } from "../firebase";
import Modal from "./Modal";

export default function Main(props) {
  let { foundCharacters, setFoundCharacters, userTime } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });

  // Hide/Show menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = (event) => {
    const rect = event.target.getBoundingClientRect();

    // Coordinates of the click considering the scroll(Y)
    const clickedX = event.clientX - rect.left;
    const clickedY = event.clientY - rect.top + window.pageYOffset;

    // Update coordinates
    setClickCoordinates({ x: clickedX, y: clickedY });

    // Hide/Show menu
    toggleMenu();
  };

  const showFoundSomeonePopup = (found, char) => {
    let popup = document.querySelector(".found-char-popup");
    let text = document.querySelector(".popup-text");

    text.textContent = found ? `You found ${char}` : "Keep searching!";

    popup.style.display = "block";
    setTimeout(() => {
      popup.style.display = "none";
    }, 2000);
  };

  let startX;
  let endX;
  let startY;
  let endY;

  const getCoordinates = async (character) => {
    let startXpercentage = await getPercentageData(character, "startX");
    let endXpercentage = await getPercentageData(character, "endX");
    let startYpercentage = await getPercentageData(character, "startY");
    let endYpercentage = await getPercentageData(character, "endY");

    const screenWidth = window.innerWidth;
    const screenHeight = document.querySelector("main img").height;

    startX = screenWidth * startXpercentage;
    endX = screenWidth * endXpercentage;
    startY = screenHeight * startYpercentage;
    endY = screenHeight * endYpercentage;
  };

  const checkClick = async (character) => {
    let x = clickCoordinates.x;
    let y = clickCoordinates.y;

    let batman = document.querySelector(".batman");
    let sonic = document.querySelector(".sonic");
    let waldo = document.querySelector(".waldo");

    if (character === "batman") {
      await getCoordinates("batman");

      if (x > startX && x < endX && y > startY && y < endY) {
        batman.className += " found";
        document.querySelector(".batman-button").style.display = "none";
        setFoundCharacters((prevCount) => prevCount + 1);
        showFoundSomeonePopup(true, "Batman");
      } else {
        showFoundSomeonePopup(false);
      }
    } else if (character === "sonic") {
      await getCoordinates("sonic");

      if (x > startX && x < endX && y > startY && y < endY) {
        sonic.className += " found";
        document.querySelector(".sonic-button").style.display = "none";
        setFoundCharacters((prevCount) => prevCount + 1);
        showFoundSomeonePopup(true, "Sonic");
      } else {
        showFoundSomeonePopup(false);
      }
    } else {
      await getCoordinates("waldo");

      if (x > startX && x < endX && y > startY && y < endY) {
        waldo.className += " found";
        document.querySelector(".waldo-button").style.display = "none";
        setFoundCharacters((prevCount) => prevCount + 1);
        showFoundSomeonePopup(true, "Waldo");
      } else {
        showFoundSomeonePopup(false);
      }
    }
  };

  return (
    <main
      className={foundCharacters >= 3 ? "disable-scroll" : ""}
      onClick={handleClick}
    >
      <img src={map} alt="cartoon background with pop culture characters" />
      <Menu
        checkClick={checkClick}
        hidden={!isMenuOpen}
        position={clickCoordinates}
      />
      {foundCharacters === 3 && (
        <Modal userTime={userTime} setFoundCharacters={setFoundCharacters} />
      )}
    </main>
  );
}
