import Main from "./components/Main";
import Nav from "./components/Nav";
import { useState } from "react";

function App() {
  let [foundCharacters, setFoundCharacters] = useState(0);
  let [userTime, setUserTime] = useState(0);

  return (
    <div className="App">
      <Nav
        foundCharacters={foundCharacters}
        setUserTime={setUserTime}
        userTime={userTime}
      />
      <Main
        foundCharacters={foundCharacters}
        setFoundCharacters={setFoundCharacters}
        userTime={userTime}
      />
    </div>
  );
}

export default App;
