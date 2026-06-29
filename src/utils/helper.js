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

  "02d": "/images/partly-cloudy-bg.jpg",
  "02n": "/images/partly-cloudy-night-bg.jpg",

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

export function formatTime(timestamp, timezoneName) {
  if (!timezoneName) return "--:--";

  try {
    return new Date(timestamp * 1000).toLocaleTimeString("en-GB", {
      timeZone: timezoneName,
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "--:--";
  }
}

export function getAirQualityTip(aqi) {
  switch (aqi) {
    case 1:
      return {
        status: "Good",
        tip: "Air quality is excellent. Perfect for outdoor activities.",
      };

    case 2:
      return {
        status: "Fair",
        tip: "Air quality is acceptable for most people.",
      };

    case 3:
      return {
        status: "Moderate",
        tip: "Sensitive people should limit prolonged outdoor activities.",
      };

    case 4:
      return {
        status: "Poor",
        tip: "Reduce outdoor activities and keep windows closed if possible.",
      };

    case 5:
      return {
        status: "Very-Poor",
        tip: "Avoid outdoor activities and wear a mask if you need to go outside.",
      };

    default:
      return {
        status: "Unknown",
        tip: "Air quality information is unavailable.",
      };
  }
}

export function getWeeklyForecast(list) {
  const filteredDays = {};

  list.forEach((item) => {
    const date = item.dt_txt.slice(0, 11);

    if (!filteredDays[date]) {
      filteredDays[date] = {
        date,
        min: item.main.temp_min,
        max: item.main.temp_max,
        icon: item.weather[0].icon,
      };
    }

    if (item.main.temp_min < filteredDays[date].min) {
      filteredDays[date].min = item.main.temp_min;
    }

    if (item.main.temp_max > filteredDays[date].max) {
      filteredDays[date].max = item.main.temp_max;
    }

    const weather = item.weather[0].main;

    if (
      weather === "Thunderstorm" ||
      weather === "Snow" ||
      weather === "Rain"
    ) {
      filteredDays[date].icon = item.weather[0].icon;
    }
  });

  return Object.values(filteredDays);
}

export function formatDay(date, timezoneName) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: timezoneName,
  });
}

export function getWindDirection(deg) {
  if (deg >= 337.5 || deg < 22.5) return "North";
  if (deg < 67.5) return "North-East";
  if (deg < 112.5) return "East";
  if (deg < 157.5) return "South-East";
  if (deg < 202.5) return "South";
  if (deg < 247.5) return "South-West";
  if (deg < 292.5) return "West";
  return "North-West";
}
