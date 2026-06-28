import CurrentWeather from "./components/CurrentWeather";
import CurrentWeatherStats from "./components/CurrentWeatherStats";
import Error from "./components/Error";
import HourlyForecast from "./components/HourlyForecast";
import NavBar from "./components/NavBar";
import { useState } from "react";

function App() {
  const [lat, setLat] = useState(
    localStorage.getItem("latWeatherApp") || 35.6892523,
  );
  const [lon, setLon] = useState(
    localStorage.getItem("lonWeatherApp") || 51.3896004,
  );
  const [error, setError] = useState(false);

  if (error) {
    return <Error />;
  }

  return (
    <>
      <header className="container">
        <NavBar setLat={setLat} setLon={setLon} />
      </header>
      <main className="container">
        <div className="first-row">
          <CurrentWeather lat={lat} setError={setError} lon={lon} />
          <HourlyForecast lat={lat} setError={setError} lon={lon} />
        </div>
        <div className="second-row">
          <div className="second-row-left">
            <CurrentWeatherStats lat={lat} setError={setError} lon={lon} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
