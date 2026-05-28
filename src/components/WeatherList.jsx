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
  const [city, setCity] = useState(
    localStorage.getItem("lastCity") || "tehran",
  );
  const [errorModal, setErrorModal] = useState(false);
  const [weatherModal, SetWeatherModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedForecastDayData, setSelectedForecastDayData] = useState(null);
  const API_KEY = "44e4d04bf7840eb1b5ca2daed644e5ab";

  function changeHandler(e) {
    const value = e.target.value;
    setSearch(value);
  }

  function searchBtnClickHandler() {
    if (search.trim() !== "") {
      setCity(search.toLowerCase());
      setLoading(true)
      setSearch("")
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
          localStorage.setItem("lastCity", city);
          setLoading(false)
        } else {
          setIsModalOpen(true);
          setErrorModal(true);
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
          setFullForecast(data.list);
          setForecast(filteredData);
          setLoading(false);
        } else {
          setIsModalOpen(true);
          setErrorModal(true);
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

  function minMaxTempHandel(item) {
    const filteredForecast = fullForecast.filter((forcastItem) =>
      forcastItem.dt_txt.includes(item.dt_txt.slice(0, 10)),
    );

    if (!filteredForecast.length) return null;

    let minTemp = Infinity;
    let maxTemp = -Infinity;
    filteredForecast.forEach((filteredForecastItem) => {
      if (filteredForecastItem.main.temp_min < minTemp) {
        minTemp = filteredForecastItem.main.temp_min.toFixed(0);
      }
      if (filteredForecastItem.main.temp_max > maxTemp) {
        maxTemp = filteredForecastItem.main.temp_max.toFixed(0);
      }
    });

    if (minTemp === -0) {
      minTemp = 0;
    }

    if (maxTemp === -0) {
      maxTemp = 0;
    }

    return (
      <span className="min-max-temp">
        {maxTemp} / {minTemp}
      </span>
    );
  }

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

  function forecastListClickHandler(item) {
    setSelectedForecastDayData(item);
    setIsModalOpen(true);
    SetWeatherModal(true);
  }

  return (
    <div>
      <div className="weather-sec-header">
        <div className="city-info">
          <h2 className="city-name">
            {today.name} - {today.sys.country}
          </h2>
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
              .replace(",", " |")}{" "}
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
          <div
            onClick={() => {
              searchBtnClickHandler();
            }}
            className="search-btn"
          >
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
            <div
              className="weather-list-card"
              key={item.dt}
              onClick={() => {
                forecastListClickHandler(item);
              }}
            >
              <span className="weekday">{weekDayHandel(item)}</span>
              <img
                src={listWeatherImgHandler(item)}
                alt=""
                className="weekday-img"
              />
              {minMaxTempHandel(item)}
              <span className="weather-status">
                {item.weather[0].description}
              </span>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <>
          <div
            className="overlay"
            onClick={() => {
              setIsModalOpen(false);
              setErrorModal(false);
              SetWeatherModal(false);
            }}
          ></div>
          <div className="modal">
            <div className="modal-header">
              <span className="modal-title">
                {errorModal && "Error"}
                {weatherModal &&
                  `${weekDayHandel(selectedForecastDayData)} Weather Info`}
              </span>
              <span
                className="close-btn"
                onClick={() => {
                  setIsModalOpen(false);
                  setErrorModal(false);
                  SetWeatherModal(false);
                }}
              >
                X
              </span>
            </div>
            {errorModal && (
              <div className="modal-main-sec-error">
                <img
                  src="https://img.icons8.com/?size=100&id=41730&format=png&color=000000"
                  alt=""
                  className="error-icon"
                />
                <span>Invalid city name !!!</span>
              </div>
            )}
            {weatherModal && (
              <div className="modal-main-sec-weather-info">
                <div className="modal-temp-details">
                  <div className="modal-temp-details-left">
                    <div className="modal-temp">
                      <h2>{selectedForecastDayData.main.temp.toFixed(0)}</h2>
                      <span>℃</span>
                    </div>
                    <div className="modal-weather-status">
                      {selectedForecastDayData.weather[0].description}
                    </div>
                    <div className="modal-feels-like-temp">
                      Feels Like:{" "}
                      {selectedForecastDayData.main.feels_like.toFixed(0)}℃
                    </div>
                    <div className="modal-min-max-temp">
                      MAX/MIN: {minMaxTempHandel(selectedForecastDayData)}
                    </div>
                  </div>
                  <div className="modal-temp-details-right">
                    <img
                      src={listWeatherImgHandler(selectedForecastDayData)}
                      alt=""
                      className="modal-weather-img"
                    />
                  </div>
                </div>
                <div className="modal-atmospheric-details">
                  <div className="modal-humidity">
                    <span className="humidity-title">Humidity</span>
                    <h4>{selectedForecastDayData.main.humidity}%</h4>
                  </div>
                  <div className="modal-pop">
                    <span className="pop-title">POP</span>
                    <h4>{selectedForecastDayData.pop}%</h4>
                  </div>
                  <div className="modal-wind">
                    <span className="wind-title">Wind Speed</span>
                    <h4>
                      {selectedForecastDayData.wind.speed.toFixed(0)} Km/h
                    </h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherList;
