import React, { useState } from "react";
import { Container, Box, Typography, CircularProgress } from "@mui/material";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_BASE_URL = "https://api.weatherapi.com/v1";

console.log("API KEY ->", API_KEY);

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${API_BASE_URL}/current.json`, {  // ✅ Correct endpoint
        params: {
          key: API_KEY,
          q: city,
        },
      });
      console.log(response.data);
      setWeather(response.data); // ✅ Store the data
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        setError("City not found. Please try again.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundStyle = (conditionText) => {
    if (!conditionText) return "linear-gradient(135deg, #00b4db 0%, #0083b0 100%)";
    conditionText = conditionText.toLowerCase();
    if (conditionText.includes("sunny")) return "linear-gradient(135deg, #f6d365 0%, #fda085 100%)";
    if (conditionText.includes("cloud")) return "linear-gradient(135deg, #d7d2cc 0%, #304352 100%)";
    if (conditionText.includes("rain") || conditionText.includes("drizzle")) return "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)";
    if (conditionText.includes("snow")) return "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)";
    return "linear-gradient(135deg, #00b4db 0%, #0083b0 100%)"; // Default
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: weather
          ? getBackgroundStyle(weather.current.condition.text) // ✅ Correct usage
          : "linear-gradient(135deg, #00b4db 0%, #0083b0 100%)",
        py: 4,
        transition: "background 0.5s ease",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          sx={{ textAlign: "center", color: "white", mb: 6, fontSize: { xs: '2.75rem', sm: '3.75rem', md: '4.5rem' } }}
        >
          Weather App
        </Typography>

        <SearchBar onSearch={fetchWeather} />

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress sx={{ color: "white" }} />
          </Box>
        )}

        {error && (
          <Typography 
            sx={{ 
              textAlign: "center", 
              color: "white", 
              mt: 3,
              fontSize: { xs: '1.25rem', sm: '1.5rem' } 
            }}
          >
            {error}
          </Typography>
        )}

        {weather && !loading && <WeatherCard weather={weather} />}
      </Container>
      {!weather && !loading && !error && (
  <Typography
    variant="body1"
    sx={{
      mt: 4,
      textAlign: "center",
      color: "#f0f0f0",         // Light soft color
      fontSize: "28px",         // Direct px unit (easy to control)
      fontWeight: 400,          // Normal readable weight
      lineHeight: "1.6",        // Good line height
      maxWidth: "800px",        // Limit width
      margin: "20px auto",      // Center and spacing
      padding: "0 16px",        // Left-right space on small screens
    }}
  >
    A clean and responsive weather application that allows users to search for any city and instantly view real-time weather details. It fetches live weather data such as temperature, humidity, wind speed, and condition (like sunny, rainy, mist) using the WeatherAPI service. The app features a dynamic background that changes based on the weather condition and an intuitive, mobile-friendly UI designed with Material-UI. It also includes features like loading indicators, error handling for invalid city names, and weather icons for better user experience.
  </Typography>
)}

    </Box>
  );
}

export default App;
