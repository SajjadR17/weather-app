export const weatherApiBaseUrl = "https://api.openweathermap.org/";

const weatherIcons = {
  "01d": "/images/sunny.png",
  "01n": "/images/clear-night.png",

  "02d": "/images/partly-cloudy.png",
  "02n": "/images/partly-cloudy-night.png",

  "03d": "/images/cloudy.png",
  "03n": "/images/cloudy.png",
  "04d": "/images/cloudy.png",
  "04n": "/images/cloudy.png",

  "09d": "/images/rainy.png",
  "09n": "/images/rainy.png",
  "10d": "/images/rainy.png",
  "10n": "/images/rainy.png",

  "11d": "/images/thunderstorm.png",
  "11n": "/images/thunderstorm.png",

  "13d": "/images/snowy.png",
  "13n": "/images/snowy.png",

  "50d": "/images/foggy.png",
  "50n": "/images/foggy.png",
};

const weatherBG = {
  "01d": "/images/clear-day-bg.jpg",
  "01n": "/images/clear-night-bg.jpg",

  "02d": "/images/cloudy.jpg",
  "02n": "/images/cloudy.jpg",
  "03d": "/images/cloudy-bg.jpg",
  "03n": "/images/cloudy-bg.jpg",
  "04d": "/images/cloudy-bg.jpg",
  "04n": "/images/cloudy-bg.jpg",

  "09d": "/images/rainy-bg.jpg",
  "09n": "/images/rainy-bg.jpg",
  "10d": "/images/rainy-bg.jpg",
  "10n": "/images/rainy-bg.jpg",

  "11d": "/images/thunderstorm-bg.jpg",
  "11n": "/images/thunderstorm-bg.jpg",

  "13d": "/images/snowy-bg.jpg",
  "13n": "/images/snowy-bg.jpg",

  "50d": "/images/foggy-bg.jpg",
  "50n": "/images/foggy-bg.jpg",
};

export function getWeatherIcon(icon) {
  return weatherIcons[icon] || "/images/sunny.png";
}

export function getWeatherBG(icon) {
  return weatherBG[icon] || "/images/clear-day-bg.png";
}

export function formatForecastTime(timestamp, timezone) {
  const utc = timestamp * 1000;
  const local = new Date(utc + timezone * 1000);

  return local.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
