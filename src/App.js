import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL,WEATHER_API_KEY } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';


function App() {
  const [currentWeather,setCurrentWeather] = useState(null);
  const [forecast,setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
  
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
  
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
  
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (responses) => {
        const weatherResponse = await responses[0].json();
        const forecastResponse = await responses[1].json();
        console.log("Weather Response:", weatherResponse);
        console.log("Forecast Response:", forecastResponse);
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  };
  
  console.log(currentWeather);
  console.log(forecast);


  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather &&<CurrentWeather data={currentWeather}/>}    
      {forecast&&<Forecast data={forecast}/>}
      </div>
  );
}

export default App;
