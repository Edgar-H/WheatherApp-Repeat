/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getGeoIp } from './assets/getGeoIp';
import { showLoadingSwal } from './assets/showLoadingSwal';
import './style.scss';

const App = () => {
  const [apiData, setApiData] = useState({});
  const [loading, setLoading] = useState(true),
    [error, setError] = useState(''),
    [degrees, setDegrees] = useState(true);

  const apiKey = '4cc25c0ed0bbfaad5d54d4f945b88f1f';
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  useEffect(() => {
    getGeoIp().then(async (data) => {
      const { lat, lon } = data;
      const apiWheather = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      try {
        const { data } = await axios.get(apiWheather);
        const wheatherData = {
          name: data.name,
          temp: data.main.temp,
          pressure: data.main.pressure,
          country: data.sys.country,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          wind: data.wind.speed,
          clouds: data.clouds.all,
        };
        console.log(wheatherData);
        setApiData(wheatherData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err);
        setLoading(false);
      }
    });
  }, []);

  const gradosK = apiData.temp;
  const gradosC = (gradosK - 273.15).toFixed(2);
  const gradosF = (9 * (gradosC / 5) + 32).toFixed(2);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <div className='container'>
      {loading ? (
        showLoadingSwal()
      ) : error ? (
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      ) : (
        <>
          <div className='location'>
            <p className='date-info'>
              {new Date().toLocaleDateString('en-US', options)}
            </p>
            <p className='city'>
              {apiData.name}, {apiData.country}
            </p>
            <p className='date-info'>{apiData.description}</p>
          </div>
          <div className='weather'>
            <div className='icon-weather'>
              <img src={`/images/${apiData.icon}.svg`} />
            </div>
            <div className='tem-btn'>
              <p>{degrees ? gradosC + ' °F' : gradosF + ' °C'}</p>
              <div>
                <button onClick={() => setDegrees(!degrees)}>
                  {degrees ? ' °C' : ' °F'}
                </button>
              </div>
            </div>
          </div>
          <div className='description'>
            <p>Wind Speed: {apiData.wind}m/s</p>
            <p>Clouds: {apiData.all}%</p>
            <p>Presure: {apiData.pressure}mb</p>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
