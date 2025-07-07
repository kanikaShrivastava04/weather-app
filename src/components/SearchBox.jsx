import { useState } from 'react';
import TextField from '@mui/material/TextField'; 
import Button from '@mui/material/Button'; 
import './SearchBox.css';

export default function SearchBox() { 
    const [city , setCity] = useState(''); 
    const [weatherData, setWeatherData] = useState(null); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const trimmedCity = city.trim(); 
        if(!trimmedCity) 
           // alert("Please enter a city name.");
           return;
        
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      try { 
      setLoading(true);
      setError('');
      setWeatherData(null);
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
         setWeatherData(data); 
         setError('');
       // console.log("Weather Data:", data);
       // alert(`Temperature in ${data.name}: ${data.main.temp}°C`);
      } else { 
        setError('City not found!');
        //setWeatherData(null);
        //alert("City not found!");
      }
    } catch (error) {
      //alert("Error fetching data.");
      setError('Error fetching data.');
      console.error("Error:", error);
    } 
    finally {
      setLoading(false);
    }
  };
    
  return (
    <div className="SearchBox">
      <h3>Search for the weather</h3>
      <form onSubmit = {handleSubmit}>
        <TextField id="City" label="City Name" variant="outlined"  value= {city} onChange = {(e) => setCity(e.target.value)} required />
        <br /><br />
        <Button variant="contained" type="submit">Search</Button>
      </form>  

      {/* Loader */}
      {loading && <p>🔄 Loading...</p>}

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Weather Output */}
       {weatherData && (
        <div className="weather-result">
          <h4>Weather in {weatherData.name}</h4>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Condition: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};
