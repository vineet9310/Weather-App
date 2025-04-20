import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
} from "@mui/material";
import { Opacity, Air } from "@mui/icons-material";

const WeatherCard = ({ weather }) => {
  const getWeatherEmoji = (conditionText) => {
    if (!conditionText) return "";
    conditionText = conditionText.toLowerCase();
    if (conditionText.includes("sunny")) return "☀️";
    if (conditionText.includes("cloud")) return "☁️";
    if (conditionText.includes("rain") || conditionText.includes("drizzle"))
      return "🌧️";
    if (conditionText.includes("thunderstorm")) return "⛈️";
    if (conditionText.includes("snow")) return "❄️";
    return "";
  };

  return (
    <Card
      sx={{
        mt: 4,
        mx: "auto", // center horizontally
        width: { xs: "100%", sm: "85%", md: "70%" }, // responsive width
        borderRadius: 3,
        boxShadow: 4,
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        p: 3, // padding inside
      }}
    >
      <CardContent>
        <Typography
          variant="h3"
          component="div"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
        >
          {getWeatherEmoji(weather.current.condition.text)}{" "}
          {weather.location.name}, {weather.location.country}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Avatar
            src={`https:${weather.current.condition.icon}`}
            alt="Weather Icon"
            sx={{ width: 96, height: 96 }} // bigger icon
          />
          <Typography
            variant="h1"
            component="span"
            sx={{ ml: 3, fontWeight: "bold", fontSize: { xs: '3.5rem', sm: '4rem', md: '4.5rem' } }}
          >
            {Math.round(weather.current.temp_c)}°C
          </Typography>
        </Box>

        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 4, fontWeight: "medium", fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' } }}
        >
          {weather.current.condition.text}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Opacity sx={{ mr: 1, color: "#1976D2" }} />
              <Typography variant="body1" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem' } }}>
                Humidity: {weather.current.humidity}%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Air sx={{ mr: 1, color: "#78909C" }} />
              <Typography variant="body1" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem' } }}>
                Wind: {Math.round(weather.current.wind_kph)} km/h
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
