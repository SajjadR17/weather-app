import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { currentWeatherFetch } from "../services/api";
import "../styles/currentWeatherStats.css";

function CurrentWeatherStats({ lat, lon, setError }) {
  const [weatherStatus, setWeatherStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeatherStatus = async () => {
      setLoading(true);
      try {
        const res = await currentWeatherFetch(lat, lon);
        setWeatherStatus(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getWeatherStatus();
  }, [lat, lon, setError]);

  function getVisibilityStatus(visibility) {
    const v = visibility / 1000;
    const km = v.toFixed(0);

    if (km >= 10) return "Excellent";
    if (km >= 5) return "Good";
    if (km >= 2) return "Moderate";
    if (km >= 1) return "Poor";
    return "Very Poor";
  }

  function getHumidityStatus(humidity) {
    if (humidity < 30) return "Dry";
    if (humidity < 60) return "Comfortable";
    if (humidity < 80) return "Humid";
    return "Very Humid";
  }

  function getPressureStatus(pressure) {
    if (pressure < 990) return "Very Low";
    if (pressure < 1005) return "Low";
    if (pressure <= 1020) return "Normal";
    if (pressure <= 1035) return "High";
    return "Very High";
  }

  function getWindStatus(speed) {
    if (speed < 2) return "Calm";
    if (speed < 5) return "Light Breeze";
    if (speed < 8) return "Moderate Breeze";
    if (speed < 11) return "Strong Breeze";
    if (speed < 17) return "High Wind";
    return "Storm";
  }

  function getCloudStatus(clouds) {
    if (clouds <= 10) return "Clear";
    if (clouds <= 30) return "Mostly Clear";
    if (clouds <= 60) return "Partly Cloudy";
    if (clouds <= 90) return "Mostly Cloudy";
    return "Overcast";
  }

  if (loading) {
    return (
      <div className="weather-stats-container">
        <div className="stat-card-loading"></div>
        <div className="stat-card-loading"></div>
        <div className="stat-card-loading"></div>
        <div className="stat-card-loading"></div>
        <div className="stat-card-loading"></div>
        <div className="stat-card-loading"></div>
      </div>
    );
  }

  const visibilityHandel = (visibility) => {
    const v = visibility / 1000;
    return v.toFixed(0);
  };

  return (
    <div className="weather-stats-container">
      <StatCard
        icon={"/images/humidity.png"}
        title={"Humidity"}
        value={`${weatherStatus?.main?.humidity}%`}
        tip={getHumidityStatus(weatherStatus?.main?.humidity)}
      />
      <StatCard
        icon={"/images/wind.png"}
        title={"Wind"}
        value={`${weatherStatus?.wind?.speed.toFixed(0)} Km`}
        tip={getWindStatus(weatherStatus?.wind?.speed)}
      />
      <StatCard
        icon={"/images/pressure.png"}
        title={"Pressure"}
        value={`${weatherStatus?.main?.pressure} Pha`}
        tip={getPressureStatus(weatherStatus?.main?.pressure)}
      />
      <StatCard
        icon={"/images/visibility.png"}
        title={"Visibility"}
        value={`${visibilityHandel(weatherStatus?.visibility)} Km`}
        tip={getVisibilityStatus(weatherStatus?.visibility)}
      />
      <StatCard
        icon={"/images/clouds.png"}
        title={"Clouds"}
        value={`${weatherStatus?.clouds?.all}%`}
        tip={getCloudStatus(weatherStatus?.clouds?.all)}
      />
      <StatCard
        icon={"/images/wind-deg.png"}
        title={"Wind deg"}
        value={`${weatherStatus?.wind?.deg}°`}
      />
    </div>
  );
}

export default CurrentWeatherStats;
