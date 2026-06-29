import axios from "axios";
import { weatherApiBaseUrl } from "../utils/helper";

export const searchFetch = async (searchValue) => {
  try {
    const res = await axios.get(
      `${weatherApiBaseUrl}geo/1.0/direct?q=${searchValue}&limit=5&appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`,
    );
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const currentWeatherFetch = async (lat, lon) => {
  try {
    const res = await axios.get(
      `${weatherApiBaseUrl}data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`,
    );
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const currentTimeFetch = async (lat, lon) => {
  try {
    const res = await axios.get(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=${import.meta.env.VITE_TIMEZONEDB_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`,
    );
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const forecastFetch = async (lat, lon) => {
  try {
    const res = await axios.get(
      `${weatherApiBaseUrl}data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`,
    );
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const airPollutionFetch = async (lat, lon) => {
  try {
    const res = await axios.get(
      `${weatherApiBaseUrl}data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`,
    );
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};
