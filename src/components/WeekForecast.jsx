import { useEffect, useState } from "react";
import { forecastFetch } from "../services/api";
import { formatDay, getWeatherIcon, getWeeklyForecast } from "../utils/helper";
import "../styles/weekForecast.css";

function WeekForecast({ lat, lon, setError, timezoneName }) {
  const [loading, setLoading] = useState(true);
  const [fiveDaysForecastDetails, setFiveDaysForecastDetails] = useState(null);

  useEffect(() => {
    const getForecastDetails = async () => {
      setLoading(true);
      try {
        const res = await forecastFetch(lat, lon);
        setFiveDaysForecastDetails(getWeeklyForecast(res.data.list));
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getForecastDetails();
  }, [lat, lon, setError]);

  if (loading) {
    return <div className="five-days-forecast-loading"></div>;
  }

  return (
    <div className="five-days-forecast-container">
      <span className="five-days-forecast-container-header">
        5 Days forecast
      </span>
      <div className="five-days-forecast-list">
        {fiveDaysForecastDetails.slice(0, 5).map((item) => (
          <div className="five-days-forecast-card" key={item.date}>
            <div className="five-days-forecast-card-left">
              <span className="five-days-forecast-card-day">
                {formatDay(item.date, timezoneName)}
              </span>
              <img
                src={getWeatherIcon(item.icon)}
                alt=""
                className="five-days-forecast-card-icon"
              />
            </div>
            <div className="five-days-forecast-card-min-max-temp">
              <span className="five-days-forecast-card-max-temp">
                {item.max.toFixed(0)}°
              </span>
              <span className="five-days-forecast-card-min-temp">
                / {item.min.toFixed(0)}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeekForecast;
