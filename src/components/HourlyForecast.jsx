import { useEffect, useState } from "react";
import { currentTimeFetch, forecastFetch } from "../services/api";
import { formatForecastTime, getWeatherIcon } from "../utils/helper";
import "../styles/hourlyForecast.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Dot,
} from "recharts";
import HourlyTemperatureChart from "./HourlyForecastChart";

function HourlyForecast({ lat, setError, lon }) {
  const [loading, setLoading] = useState(true);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [timezoneName, setTimezoneName] = useState("");

  useEffect(() => {
    const getForecast = async () => {
      setLoading(true);
      try {
        const res = await forecastFetch(lat, lon);
        const forecastFilter = res.data.list.slice(0, 9);
        setHourlyForecast(forecastFilter);
        const zone = await currentTimeFetch(lat, lon);
        setTimezoneName(zone.data.zoneName);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getForecast();
  }, [lat, lon, setError]);

  if (loading) {
    return <div className="hourly-forecast-loading"></div>;
  }

  return (
    <div className="hourly-forecast-container">
      <span className="hourly-forecast-header">Hourly Forecast</span>
      <div className="hourly-forecast-list">
        {hourlyForecast.map((f) => (
          <div className="hourly-forecast-card" key={f.dt}>
            <span className="hourly-forecast-card-time">
              {formatForecastTime(f.dt, timezoneName)}
            </span>
            <img
              src={getWeatherIcon(f?.weather?.[0]?.icon)}
              className="hourly-forecast-card-icon"
              alt=""
            />
            <span className="hourly-forecast-card-temp">
              {f?.main?.temp?.toFixed(0)}°
            </span>
          </div>
        ))}
      </div>
      <HourlyTemperatureChart
        forecast={hourlyForecast}
        timezoneName={timezoneName}
      />
    </div>
  );
}

export default HourlyForecast;
