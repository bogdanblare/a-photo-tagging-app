import Card from "./Card";
import Timer from "./Timer";
import batman from "./../images/characters/batman.png";
import sonic from "./../images/characters/sonic.png";
import waldo from "./../images/characters/waldo.png";

export default function Nav(props) {
  let { foundCharacters, setUserTime, userTime } = props;

  const handleClick = () => {
    let dropdownMenu = document.querySelector(".nav-dropdown-characters");

    // Toggle dropdown menu visibility
    dropdownMenu.style.display =
      dropdownMenu.style.display === "flex" ? "none" : "flex";
  };

  return (
    <>
      <nav>
        <h1>Where's Everyone?</h1>
        <Timer
          setUserTime={setUserTime}
          userTime={userTime}
          foundCharacters={foundCharacters}
        />
        <button className="nav-found-characters" onClick={handleClick}>
          {3 - foundCharacters}
        </button>
      </nav>
      <div className="nav-dropdown-characters">
        <p>Chars to Find</p>
        <Card name="Batman" img={batman} />
        <Card name="Sonic" img={sonic} />
        <Card name="Waldo" img={waldo} />
      </div>
      <div className="found-char-popup">
        <p className="popup-text">Found someone!</p>
      </div>
    </>
  );
}
