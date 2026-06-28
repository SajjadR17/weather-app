import { useEffect, useState } from "react";
import { currentWeatherFetch } from "../services/api";
import { getWeatherBG, getWeatherIcon } from "../utils/helper";
import "../styles/currentWeather.css";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import { BsArrowDown, BsArrowDownCircle, BsArrowUp } from "react-icons/bs";
import { WiCelsius } from "react-icons/wi";
import { RiCelsiusFill, RiCelsiusLine } from "react-icons/ri";

function CurrentWeather({ lat, setError, lon }) {
  const [currentWeatherDetails, setCurrentWeatherDetails] = useState({});
  const [now, setNow] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [timezone, setTimezone] = useState(0);

  useEffect(() => {
    const getCurrentWeatherDetails = async () => {
      setLoading(true);
      try {
        const res = await currentWeatherFetch(lat, lon);
        setCurrentWeatherDetails(res.data);
        setTimezone(res.data.timezone);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getCurrentWeatherDetails();
  }, [lat, lon, setError]);

  useEffect(() => {
    if (!timezone) return;

    const updateTime = () => {
      const utc = Date.now() + new Date().getTimezoneOffset() * 60000;

      setNow(new Date(utc + timezone * 1000));
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, [timezone]);

  const currentTime = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const currentDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  if (loading) {
    return <div className="current-weather-loading"></div>;
  }

  return (
    <div
      className="current-weather-container"
      style={{
        backgroundImage: `linear-gradient(
           90deg,
         rgba(5,8,22,.75) 0%,
         rgba(5,8,22,.2) 45%,
           transparent 100%
           ),url(${getWeatherBG(currentWeatherDetails?.weather?.[0]?.icon)})`,
      }}
    >
      <div className="current-weather-header">
        <div className="current-weather-timezone-details">
          <span className="current-weather-city-name">
            {currentWeatherDetails?.name} -{" "}
            {currentWeatherDetails?.sys?.country}
          </span>
          <span className="current-weather-date">
            {currentDate} - {currentTime}
          </span>
        </div>
        <div className="current-weather-status-container">
          <img
            src={getWeatherIcon(currentWeatherDetails?.weather?.[0]?.icon)}
            alt=""
            className="current-weather-status-icon"
          />
          <span className="current-weather-status-discrption">
            {currentWeatherDetails?.weather?.[0]?.description}
          </span>
        </div>
      </div>
      <div className="current-weather-details">
        <h1 className="current-weather-temp">
          {currentWeatherDetails?.main?.temp.toFixed(0)}°
        </h1>
        <span className="current-weather-feels-like-temp">
          Feels like {currentWeatherDetails?.main?.feels_like.toFixed(0)}°
        </span>
        <div className="current-weather-max-min-temp-container">
          <div className="current-weather-max-temp">
            <BsArrowUp size={20} color="red" />
            {currentWeatherDetails?.main?.temp_max?.toFixed(0)}
          </div>
          <div className="current-weather-min-temp">
            <BsArrowDown size={20} color="blue" />
            {currentWeatherDetails?.main?.temp_min?.toFixed(0)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
