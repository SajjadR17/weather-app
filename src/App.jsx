import NavBar from "./components/NavBar";
import { useState } from "react";

function App() {
  const [lat, setLat] = useState(
    Number(localStorage.getItem("lat")) || 35.6892523,
  );
  const [lon, setLon] = useState(
    Number(localStorage.getItem("lon")) || 51.3896004,
  );
  return (
    <>
      <header className="container">
        <NavBar setLat={setLat} setLon={setLon} />
      </header>
      <main className="container"></main>
    </>
  );
}

export default App;
