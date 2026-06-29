import { useEffect, useState } from "react";
import { airPollutionFetch } from "../services/api";
import { getAirQualityTip } from "../utils/helper";
import "../styles/airPollution.css";

function AirPollution({ lat, lon, setError }) {
  const [loading, setLoading] = useState(true);
  const [airPollutionDetails, setAirPollutionDetails] = useState(null);

  useEffect(() => {
    const getAirPollutionDetails = async () => {
      setLoading(true);
      try {
        const res = await airPollutionFetch(lat, lon);
        setAirPollutionDetails(res.data);
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getAirPollutionDetails();
  }, [lat, lon, setError]);

  if (loading) {
    return <div className="air-pollution-container-loading"></div>;
  }

  return (
    <div className="air-pollution-container">
      <span className="air-pollution-container-header">Air pollution</span>
      <div className="air-pollution-details">
        <div
          className={`air-pollution-detail ${getAirQualityTip(airPollutionDetails?.list?.[0]?.main?.aqi).status}`}
        >
          <h2 className="air-pollution-num">
            {airPollutionDetails?.list?.[0]?.main?.aqi}
          </h2>
          <div className="air-pollution-status">
            {getAirQualityTip(airPollutionDetails?.list?.[0]?.main?.aqi).status}
          </div>
        </div>
        <div className="air-pollution-advice">
          {getAirQualityTip(airPollutionDetails?.list?.[0]?.main?.aqi).tip}
        </div>
      </div>
    </div>
  );
}

export default AirPollution;
