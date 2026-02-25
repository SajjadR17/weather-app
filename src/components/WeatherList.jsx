import { useEffect, useState } from "react";
import sunnyImg from "../assets/sunny.png";
import windyImg from "../assets/windy.png";
import thunderstormImg from "../assets/thunderstorm.png";
import snowyImg from "../assets/snowy.png";
import partlyCloudyImg from "../assets/partly-cloudy.png";
import partlyCloudyNightImg from "../assets/partly-cloudy-night.png";
import rainyImg from "../assets/rainy.png";
import hotImg from "../assets/hot.png";
import foggyImg from "../assets/foggy.png";
import cloudyImg from "../assets/cloudy.png";
import coldImg from "../assets/cold.png";
import clearNightImg from "../assets/clear-night.png";
import feelsLikeIcon from "../assets/feels-like.png";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";
import "./WeatherList.css";

function WeatherList() {
  const [forecast, setForecast] = useState([]);
  const [fullForecast, setFullForecast] = useState([]);
  const [today, setToday] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("tehran");
  const API_KEY = "44e4d04bf7840eb1b5ca2daed644e5ab";

  function changeHandler(e) {
    const value = e.target.value;
    setSearch(value);
  }

  function searchBtnClickHandler() {
    if (search.trim() !== "") {
      setCity(search.toLowerCase());
    }
  }

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (Number(data.cod) === 200) {
          setToday(data);
        } else {
          alert("Invalid City Name !!!");
        }
      });
  }, [city]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (Number(data.cod) === 200) {
          const filteredData = data.list.filter((item) =>
            item.dt_txt.includes("12:00:00"),
          );
          setFullForecast(data);
          setForecast(filteredData);
          setLoading(false);
        } else {
          alert("Invalid City Name !!!");
        }
      });
  }, [city]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <h3>Loading ...</h3>;
  }

  function minMaxTempHandel() {}

  function weatherImgHandler() {
    const weatherStatus = today.weather[0].main;
    const weatherStatusIcon = today.weather[0].icon;
    if (today.wind.speed > 15) {
      return windyImg;
    }
    if (today.main.temp > 35) {
      return hotImg;
    }
    if (today.main.temp < 0) {
      return coldImg;
    }
    if (weatherStatus === "Clear") {
      if (weatherStatusIcon === "01d") {
        return sunnyImg;
      }
      if (weatherStatusIcon === "01n") {
        return clearNightImg;
      }
    }
    if (weatherStatus === "Clouds") {
      if (weatherStatusIcon === "02d") {
        return partlyCloudyImg;
      }
      if (weatherStatusIcon === "02n") {
        return partlyCloudyNightImg;
      } else {
        return cloudyImg;
      }
    }
    if (weatherStatus === "Rain" || weatherStatus === "drizzle") {
      return rainyImg;
    }
    if (weatherStatus === "Thunderstorm") {
      return thunderstormImg;
    }
    if (weatherStatus === "Snow") {
      return snowyImg;
    }
    if (
      weatherStatus === "Mist" ||
      weatherStatus === "Smoke" ||
      weatherStatus === "Haze" ||
      weatherStatus === "Dust" ||
      weatherStatus === "Fog" ||
      weatherStatus === "Sand" ||
      weatherStatus === "Ash" ||
      weatherStatus === "Squall" ||
      weatherStatus === "Tornado"
    ) {
      return foggyImg;
    }
  }

  function listWeatherImgHandler(item) {
    const weatherStatus = item.weather[0].main;
    if (item.wind.speed > 15) {
      return windyImg;
    }
    if (item.main.temp > 35) {
      return hotImg;
    }
    if (item.main.temp < 0) {
      return coldImg;
    }
    if (weatherStatus === "Clear") {
      return sunnyImg;
    }
    if (weatherStatus === "Clouds") {
      return partlyCloudyImg;
    }
    if (weatherStatus === "Rain" || weatherStatus === "drizzle") {
      return rainyImg;
    }
    if (weatherStatus === "Thunderstorm") {
      return thunderstormImg;
    }
    if (weatherStatus === "Snow") {
      return snowyImg;
    }
  }

  function weekDayHandel(item) {
    const unixTimestamp = item.dt;
    const date = new Date(unixTimestamp * 1000);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return dayName;
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
            value={search}
            onChange={changeHandler}
          />
          <div onClick={searchBtnClickHandler} className="search-btn">
            Search
          </div>
        </div>
      </div>
      <div className="weather-now">
        <div className="weather-now-left">
          <h1 className="temp">{today.main.temp.toFixed(0)}</h1>
          <div>
            <p className="c-sign">℃</p>
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
              <p>Feels like: {today.main.feels_like.toFixed(0)}℃</p>
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
      </div>
      <div className="weather-five-days-list">
        {forecast.map((item) => {
          return (
            <div className="weather-list-card">
              <span className="weekday">{weekDayHandel(item)}</span>
              <img
                src={listWeatherImgHandler(item)}
                alt=""
                className="weekday-img"
              />
              <span className="min-max-temp"></span>
              <span className="weather-status">
                {item.weather[0].description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherList;
