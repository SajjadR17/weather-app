import CurrentWeather from "./components/CurrentWeather";
import NavBar from "./components/NavBar";
import { useState } from "react";

function App() {
  const [lat, setLat] = useState(
    localStorage.getItem("latWeatherApp") || 35.6892523,
  );
  const [lon, setLon] = useState(
    localStorage.getItem("lonWeatherApp") || 51.3896004,
  );
  return (
    <>
      <header className="container">
        <NavBar setLat={setLat} setLon={setLon} />
      </header>
      <main className="container">
        <div className="first-row">
          <CurrentWeather lat={lat} lon={lon} />
        </div>
      </main>
    </>
  );
}

export default App;
