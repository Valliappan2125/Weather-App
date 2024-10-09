import "./weather.css";
import searchIcon from "../assets/search.png";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import humidityIcon from "../assets/humidity.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import { useEffect, useRef, useState } from "react";

const Weather = () => {

    const inputRef = useRef();

    const [weatherData,setWeatherData] = useState(false);

    const weatherIcons = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,
        "03d": cloudIcon,
        "03n": cloudIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon
    }
  const search = async (city) => {
    if(city === ""){
        alert("Enter City Name");
        return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

      const response = await fetch(url);

      const data = await response.json();

    //   console.log(data);

      if(!response.ok){
        alert(data.message);
        return;
      }

      const weatherIcon = weatherIcons[data.weather[0].icon] || clearIcon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        city: data.name,
        icon: weatherIcon
      })
    } catch (error) {
        setWeatherData(false);
        console.error(error);
        
    }
  };

  useEffect(() => {
    search("Chennai");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Enter City" ref={inputRef}/>
        <img src={searchIcon} alt="Search-Icon" onClick={() => search(inputRef.current.value)}/>
      </div>
      {weatherData ? <>
      <img src={weatherData.icon} alt="weather-icon" className="weather-icon" />
      <p className="temperature">{weatherData.temperature} °C</p>
      <p className="city">{weatherData.city}</p>
        <div className="weather-data">
        <div className="col">
          <img src={humidityIcon} alt="humidity-icon" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={windIcon} alt="wind-icon" />
          <div>
            <p>{weatherData.windSpeed} km/hr</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      </> : <></>}
    </div>
  );
};

export default Weather;
