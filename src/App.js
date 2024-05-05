import React, { useEffect, useState } from "react";
import Highlights from "./components/Highlight";
import Temperature from "./components/Temperature";
require("dotenv").config();

function App() {
  const [city, setCity] = useState("Lucknow");
  const [weatherData, setWeatherData] = useState(null);

  const apiURL = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}&aqi=no`;

  useEffect(() => {
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, [apiURL, city]);

  return (
    <div className="h-screen flex justify-center align-top">
      {weatherData && (
        <div className="mt-40 w-1/5 h-1/3">
          {weatherData && (
            <Temperature
              setCity={setCity}
              stats={{
                isDay: weatherData.current.is_day,
                temp: weatherData.current.temp_c,
                condition: weatherData.current.condition.text,
                location: weatherData.location.name,
                country: weatherData.location.country,
                time: weatherData.location.localtime,
              }}
            />
          )}
        </div>
      )}
      <div className="mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6">
        <h2 className="text-slate-200 text-3xl mb-6 font-semibold col-span-2">
          Today's Highlights
        </h2>
        {weatherData && (
          <>
            <Highlights
              stats={{
                title: "Wind Status",
                value: weatherData.current.wind_mph,
                unit: "mph",
                direction: weatherData.current.wind_dir,
              }}
            />
            <Highlights
              stats={{
                title: "Humidity",
                value: weatherData.current.humidity,
                unit: "%",
              }}
            />
            <Highlights
              stats={{
                title: "Visibility",
                value: weatherData.current.vis_miles,
                unit: "miles",
              }}
            />
            <Highlights
              stats={{
                title: "Air Pressure",
                value: weatherData.current.pressure_mb,
                unit: "mb",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
