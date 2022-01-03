import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';

const App = () => {
  const [apiData, setApiData] = useState({
    name: '',
    main: {
      temp: '',
      pressure: '',
    },
    sys: {
      country: '',
    },
    weather: [
      {
        description: '',
        icon: '',
      },
    ],
    wind: {
      speed: '',
    },
    clouds: {
      all: '',
    },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succes);
    async function succes(coordsPosition) {
      let coord = coordsPosition.coords;
      const apiKey = '4cc25c0ed0bbfaad5d54d4f945b88f1f';
      const Api = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.latitude}&lon=${coord.longitude}&appid=${apiKey}`;
      try {
        let getApi = await fetch(Api);
        let data = await getApi.json();
        setApiData(data);
      } catch (error) {}
    }
  }, []);

  const gradosK = apiData.main.temp;
  const gradosC = (gradosK - 273.15).toFixed(2);
  const gradosF = (9 * (gradosC / 5) + 32).toFixed(2);

  const [degrees, setDegrees] = useState(true);

  const change = () => {
    setDegrees(!degrees);
  };

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return (
    <div className='container'>
      <div className='location'>
        <p className='date-info'>
          {new Date().toLocaleDateString('en-US', options)}
        </p>
        <p className='city'>
          {apiData.name}, {apiData.sys.country}
        </p>
        <p className='date-info'>{apiData.weather[0].description}</p>
      </div>
      <div className='weather'>
        <div className='icon-weather'>
          <img src={`/images/${apiData.weather[0].icon}.svg`} />
        </div>
        <div className='tem-btn'>
          <p>{degrees ? gradosC + ' °C' : gradosF + ' °F'}</p>
          <div>
            <button onClick={change}>{degrees ? ' °C' : ' °F'}</button>
          </div>
        </div>
      </div>
      <div className='description'>
        <p>Wind Speed: {apiData.wind.speed}m/s</p>
        <p>Clouds: {apiData.clouds.all}%</p>
        <p>Presure: {apiData.main.pressure}mb</p>
      </div>
    </div>
  );
};

export default App;
