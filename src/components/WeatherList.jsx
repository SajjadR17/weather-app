import { useEffect, useState } from "react";
import { list } from "../data/forecast";
import { todayList } from "../data/today";
import sunnyImg from "../assets/sunny.png";
import windyImg from "../assets/windy.png";
import thunderstormImg from "../assets/thunderstorm.png";
import snowyImg from "../assets/snowy.png";
import sleetImg from "../assets/sleet.png";
import partlyCloudyImg from "../assets/partly-cloudy.png";
import partlyCloudyNightImg from "../assets/partly-cloudy-night.png";
import rainyImg from "../assets/rainy.png";
import hotImg from "../assets/hot.png";
import foggyImg from "../assets/foggy.png";
import coldImg from "../assets/cold.png";
import clearNightImg from "../assets/clear-night.png";
import feelsLikeIcon from "../assets/feels-like.png";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";
import "./WeatherList.css";

function WeatherList() {
  const [forecast, setForecast] = useState([]);
  const [today, setToday] = useState(todayList);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // fetch("")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setForecast(data);
    //     console.log(data);
    //   });
    const dailyList = list.filter((item) => item.dt_txt.includes("12:00:00"));
    setForecast(dailyList);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function weatherImgHandler() {
    const weatherStatus = today.weather.map((item) => item.main);
    const weatherStatusIcon = today.weather.map((item) => item.icon);
    if (today.wind.speed > 10) {
      return windyImg;
    } else if (today.main.temp > 35) {
      return hotImg;
    } else if (today.main.temp < 0) {
      return coldImg;
    } else if (weatherStatus === "Clear") {
      if (weatherStatusIcon === "01d") {
        return sunnyImg;
      } else if (weatherStatusIcon === "01n") {
        return clearNightImg;
      }
    } else if (weatherStatus === "Clouds") {
      if (weatherStatusIcon === "02d") {
        return partlyCloudyImg;
      } else if (weatherStatusIcon === "02n") {
        return partlyCloudyNightImg;
      }
    } else if (weatherStatus === "Rain" || "drizzle") {
      return rainyImg;
    } else if (weatherStatus === "Thunderstorm") {
      return thunderstormImg;
    } else if (weatherStatus === "Snow") {
      return snowyImg;
    }
  }

  return (
    <div>
      <div className="weather-sec-header">
        <div className="city-info">
          <h2 className="city-name">{today.name}</h2>
          <p className="time">
            {currentTime
              .toLocaleString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              .replace(",", " |")}
          </p>
        </div>
        <div className="search-sec">
          <input
            type="text"
            className="search-input"
            placeholder="Enter city name"
          />
          <div className="search-btn">Search</div>
        </div>
      </div>
      <div className="weather-now">
        <div className="weather-now-left">
          <h1 className="temp">{today.main.temp.toFixed(0)}</h1>
          <div>
            <p className="c-sign">C</p>
            <div className="weather-status">
              {today.weather.map((item) => item.description)}
            </div>
          </div>
        </div>
        <div className="weather-now-right">
          <img src={weatherImgHandler()} alt="" className="weather-img" />
          <div className="more-weather-info">
            <div className="feels-like-temp">
              <img
                src={feelsLikeIcon}
                alt=""
                className="feels-like-temp-icon"
              />
              <p>Feels like: {today.main.feels_like.toFixed(0)}C</p>
            </div>
            <div className="humidity">
              <img src={humidityIcon} alt="" className="humidity-icon" />
              <p>Humidity: {today.main.humidity}%</p>
            </div>
            <div className="wind">
              <img src={windIcon} alt="" className="wind-icon" />
              <p>Wind: {today.wind.speed.toFixed(0)} km/h</p>
            </div>
          </div>
        </div>
        <div className="weather-five-days-list"></div>
      </div>
    </div>
  );
}

export default WeatherList;
