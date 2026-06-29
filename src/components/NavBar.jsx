import { BiSearch } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { searchFetch } from "../services/api";
import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import "../styles/navBar.css";

function NavBar({ setLat, setLon }) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [getLocErr, setGetLocErr] = useState(false);
  const [getLocErrMessage, setGetLocErrMessage] = useState("");

  useEffect(() => {
    if (!searchInputValue.trim()) return;

    const timer = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await searchFetch(searchInputValue);
        setSearchResult(res.data);
        setSearchLoading(false);
      } catch (err) {
        console.log(err);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInputValue]);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        localStorage.setItem("latWeatherApp", position.coords.latitude);
        localStorage.setItem("lonWeatherApp", position.coords.longitude);
      },
      (err) => {
        if (err.code === 1) {
          setGetLocErrMessage(
            "Location access was denied. Please enable location permission or search for a city manually.",
          );
          setGetLocErr(true);
        } else if (err.code === 2) {
          setGetLocErrMessage(
            "Unable to determine your location. Please check your internet connection or device location settings",
          );
          setGetLocErr(true);
        } else if (err.code === 3) {
          setGetLocErrMessage("Location request timed out. Please try again.");
          setGetLocErr(true);
        } else {
          setGetLocErrMessage(
            "Something went wrong while getting your location.",
          );
          setGetLocErr(true);
        }
      },
    );
  };

  return (
    <>
      {getLocErr && (
        <>
          <div className="overlay"></div>
          <div className="location-err-modal">
            <div className="err-message">{getLocErrMessage}</div>
            <button
              className="error-modal-ok-btn"
              onClick={() => {
                setGetLocErr(false);
                setGetLocErrMessage("");
              }}
            >
              Ok
            </button>
          </div>
        </>
      )}
      <nav>
        <div className="search-input-container">
          <BiSearch size={25} />
          <input
            type="text"
            placeholder="Search for city"
            onChange={(e) => setSearchInputValue(e.target.value)}
            value={searchInputValue}
            className="search-input"
          />
          <div
            className={`search-results-container ${searchInputValue.length > 0 ? "active" : null}`}
          >
            {searchLoading ? (
              <div className="search-loading">Loading...</div>
            ) : searchResult.length ? (
              searchResult.map((item) => (
                <div
                  className="search-result-card"
                  onClick={() => {
                    setLat(item.lat);
                    setLon(item.lon);
                    localStorage.setItem("latWeatherApp", item.lat);
                    localStorage.setItem("lonWeatherApp", item.lon);
                    setSearchInputValue("");
                  }}
                  key={crypto.randomUUID()}
                >
                  <img
                    src={`https://flagcdn.com/w40/${item.country.toLowerCase()}.png`}
                    alt=""
                    className="search-result-country-img"
                  />
                  <div className="search-result-details">
                    <div className="search-result-name">
                      {item.name}
                      {item.state ? (
                        <div className="search-result-state">
                          {" "}
                          - {item.state}
                        </div>
                      ) : null}
                    </div>
                    <div className="serach-result-geo">
                      {item.lat.toFixed(2)} , {item.lon.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-search-result">No result</div>
            )}
          </div>
        </div>
        <button
          className="user-location-btn"
          onClick={() => {
            getUserLocation();
            setSearchInputValue("");
          }}
        >
          <GrLocation size={25} />
        </button>
      </nav>
    </>
  );
}

export default NavBar;
