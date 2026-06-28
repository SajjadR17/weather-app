import { useEffect, useState } from "react";
import "../styles/weatherExtraDetails.css";
import ExtraDetailCard from "./ExtraDetailCard";
import { currentWeatherFetch, forecastFetch } from "../services/api";
import { formatTime } from "../utils/helper";

function WeatherExtraDetails({ lat, lon, setError, timezoneName }) {
  const [weatherDetailsForecast, setWeatherDetailsForecast] = useState({});
  const [weatherDetailsCurrent, setWeatherDetailsCurrent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeatherDetails = async () => {
      setLoading(true);
      try {
        const forecastRes = await forecastFetch(lat, lon);
        const currentWeatherRes = await currentWeatherFetch(lat, lon);
        setWeatherDetailsForecast(forecastRes.data.list[0]);
        setWeatherDetailsCurrent(currentWeatherRes.data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getWeatherDetails();
  }, [lat, lon, setError]);

  const chanceOfRain = Math.round(weatherDetailsForecast?.pop * 100);

  const precipitation =
    weatherDetailsForecast?.rain?.["3h"] ??
    weatherDetailsForecast?.snow?.["3h"] ??
    0;

  if (loading) {
    return <div className="extra-details-container-loading"></div>;
  }

  return (
    <div className="extra-details-container">
      <span className="extra-details-container-header">Extra Details</span>
      <div className="extra-details">
        <ExtraDetailCard
          name="Feels like"
          value={`${weatherDetailsCurrent?.main?.feels_like.toFixed(0)}°`}
          icon="/images/feels-like.png"
        />
        <ExtraDetailCard
          name="Sunset"
          value={formatTime(weatherDetailsCurrent?.sys?.sunset, timezoneName)}
          icon="/images/sunset.png"
        />
        <ExtraDetailCard
          name="Sunrise"
          value={formatTime(weatherDetailsCurrent?.sys?.sunrise, timezoneName)}
          icon="/images/sunrise.png"
        />
        <ExtraDetailCard
          name="Rain chance"
          value={`${chanceOfRain}%`}
          icon="/images/rain-chance.png"
        />
        <ExtraDetailCard
          name="Precipitation"
          value={`${precipitation}mm`}
          icon="/images/precipitation.png"
        />
        <ExtraDetailCard
          name="Wind gust"
          value={`${weatherDetailsCurrent?.wind?.gust} m/s`}
          icon="/images/wind.png"
        />
      </div>
    </div>
  );
}

export default WeatherExtraDetails;
