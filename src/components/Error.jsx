import { GiLoad } from "react-icons/gi";
import "../styles/error.css";

function Error() {
  return (
    <div className="error">
      <img src="/images/error.png" alt="" className="error-img" />
      <h2>Unable to load weather</h2>
      <span>
        We couldn't fetch the latest weather data.
        <span> Check your connection or try again.</span>
      </span>
      <button className="reload-btn" onClick={() => location.reload()}>
        Try Again
      </button>
    </div>
  );
}

export default Error;
