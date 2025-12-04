// src/utils/fetchOpenMeteo.js

const iconMap = {
    0: "01d",
    1: "02d",
    2: "03d",
    3: "04d",
    45: "50d",
    48: "50d",
    51: "09d",
    53: "09d",
    55: "09d",
    61: "10d",
    63: "10d",
    65: "10d",
    71: "13d",
    73: "13d",
    75: "13d",
    77: "13d",
    80: "10d",
    81: "10d",
    82: "10d",
    85: "13d",
    86: "13d",
    95: "11d",
    96: "11d",
    99: "11d"
  };


export async function fetchOpenMeteoWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&temperature_unit=fahrenheit&windspeed_unit=mph`;
  
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch Open-Meteo");
  
    const data = await res.json();
    const current = data.current;
    const code = current.weather_code;
    const iconCode = iconMap[code] || "03d"; // fallback to partly cloudy
  
    return {
      temperature: current.temperature_2m,
      windSpeed: current.wind_speed_10m,
      humidity: current.relative_humidity_2m,
      condition: weatherCodeToText(code),
      iconURL: `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    };
  }
  
  // Translate Open-Meteo weather codes to readable text
  function weatherCodeToText(code) {
    const map = {
      0: "Clear Sky",
      1: "Mainly Clear",
      2: "Partly Cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing Rime Fog",
      51: "Light Drizzle",
      53: "Moderate Drizzle",
      55: "Dense Drizzle",
      61: "Slight Rain",
      63: "Moderate Rain",
      65: "Heavy Rain",
      71: "Slight Snowfall",
      73: "Moderate Snowfall",
      75: "Heavy Snowfall",
      77: "Snow Grains",
      80: "Rain Showers",
      81: "Moderate Showers",
      82: "Violent Showers",
      85: "Snow Showers",
      86: "Heavy Snow Showers",
      95: "Thunderstorm",
      96: "Thunderstorm with Light Hail",
      99: "Thunderstorm with Heavy Hail",
    };
  
    return map[code] || "Unknown";
  }
  