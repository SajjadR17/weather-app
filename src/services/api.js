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
