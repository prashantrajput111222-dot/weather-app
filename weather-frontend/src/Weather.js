import React, { useState } from "react";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiStrongWind,
  WiHumidity,
} from "react-icons/wi";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/weather/${city}`);
      if (!res.ok) {
        throw new Error("City not found or server error");
      }
      const data = await res.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return <WiDaySunny size={100} color="#f39c12" />;
      case "Clouds":
        return <WiCloud size={100} color="#95a5a6" />;
      case "Rain":
        return <WiRain size={100} color="#3498db" />;
      case "Snow":
        return <WiSnow size={100} color="#5dade2" />;
      default:
        return <WiDaySunny size={100} color="#f1c40f" />;
    }
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(15px)",
          padding: "35px",
          borderRadius: "25px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
          width: "420px",
          maxWidth: "100%",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1
          style={{
            marginBottom: "25px",
            fontSize: "30px",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          🌍 Weather Forecast
        </h1>

        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "12px",
            fontSize: "16px",
            borderRadius: "12px",
            border: "none",
            marginBottom: "15px",
            width: "100%",
            outline: "none",
          }}
        />

        <button
          onClick={getWeather}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            borderRadius: "12px",
            background: "linear-gradient(45deg, #00c6ff, #0072ff)",
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%",
            fontWeight: "bold",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.target.style.background =
              "linear-gradient(45deg, #0072ff, #00c6ff)")
          }
          onMouseOut={(e) =>
            (e.target.style.background =
              "linear-gradient(45deg, #00c6ff, #0072ff)")
          }
        >
          🔍 Search
        </button>

        {loading && (
          <p style={{ marginTop: "20px", fontSize: "18px" }}>⏳ Fetching...</p>
        )}

        {error && (
          <p style={{ color: "red", marginTop: "20px", fontSize: "16px" }}>
            {error}
          </p>
        )}

        {weather && !loading && (
          <div
            style={{
              marginTop: "25px",
              padding: "25px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "18px",
              boxShadow: "inset 0px 3px 8px rgba(0,0,0,0.2)",
            }}
          >
            {getWeatherIcon(weather.weather[0].main)}
            <h2
              style={{
                margin: "15px 0",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              {weather.name}, {weather.sys.country}
            </h2>
            <p style={{ fontSize: "22px", margin: "8px 0" }}>
              🌡 {weather.main.temp}°C
            </p>
            <p
              style={{
                fontSize: "18px",
                margin: "5px 0",
                textTransform: "capitalize",
              }}
            >
              ☁ {weather.weather[0].description}
            </p>
            <p
              style={{
                fontSize: "16px",
                margin: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <WiStrongWind size={28} /> Wind: {weather.wind.speed} m/s
            </p>
            <p
              style={{
                fontSize: "16px",
                margin: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <WiHumidity size={28} /> Humidity: {weather.main.humidity}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
