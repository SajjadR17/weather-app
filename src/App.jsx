import CurrentWeather from "./components/CurrentWeather";
import CurrentWeatherStats from "./components/CurrentWeatherStats";
import Error from "./components/Error";
import HourlyForecast from "./components/HourlyForecast";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import WeatherExtraDetails from "./components/WeatherExtraDetails";
import { currentTimeFetch } from "./services/api";
import AirPollution from "./components/AirPollution";
import WeekForecast from "./components/WeekForecast";

function App() {
  const [lat, setLat] = useState(
    localStorage.getItem("latWeatherApp") || 35.6892523,
  );
  const [lon, setLon] = useState(
    localStorage.getItem("lonWeatherApp") || 51.3896004,
  );
  const [error, setError] = useState(false);
  const [timezoneName, setTimezoneName] = useState(false);

  useEffect(() => {
    const getTimezoneName = async () => {
      try {
        const zone = await currentTimeFetch(lat, lon);
        setTimezoneName(zone.data.zoneName);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };

    getTimezoneName();
  }, [lat, lon]);

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
          <CurrentWeather
            lat={lat}
            timezoneName={timezoneName}
            setError={setError}
            lon={lon}
          />
          <HourlyForecast
            lat={lat}
            timezoneName={timezoneName}
            setError={setError}
            lon={lon}
          />
        </div>
        <div className="second-row">
          <div className="second-row-left">
            <CurrentWeatherStats lat={lat} setError={setError} lon={lon} />
            <div className="second-row-left-bottom">
              <WeatherExtraDetails
                lat={lat}
                timezoneName={timezoneName}
                setError={setError}
                lon={lon}
              />
              <AirPollution lat={lat} setError={setError} lon={lon} />
            </div>
          </div>
          <WeekForecast
            lat={lat}
            timezoneName={timezoneName}
            setError={setError}
            lon={lon}
          />
        </div>
      </main>
    </>
  );
}

export default App;
