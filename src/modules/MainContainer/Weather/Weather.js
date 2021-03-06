import React, { useEffect, useState } from "react";
import weatherServices from "modules/MainContainer/Weather/weatherServices";
import clsx from "clsx";
import classes from "./Weather.module.scss";

const Weather = (props) => {
  const [weatherData, setWeatherData] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const geoSuccess = async ({ coords: { latitude, longitude } }) => {
      const weather = await weatherServices.getCurrentWeather(
        latitude,
        longitude
      );
      const copyWeather = { ...weather };

      let { temp_max, temp_min, feels_like } = copyWeather.main;

      if (temp_max > 0) {
        temp_max = `+${temp_max.toFixed(0)}`;
      }
      if (temp_min > 0) {
        temp_min = `+${temp_min.toFixed(0)}`;
      }
      if (feels_like > 0) {
        feels_like = `+${feels_like.toFixed(0)}`;
      }

      copyWeather.temp = { temp_max, temp_min, feels_like };
      setWeatherData(copyWeather);
      setLoading(false);
    };

    const geoFail = () => {
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
  }, [setWeatherData]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className={classes.root}>
      {weatherData ? (
        <div>
          <div className={classes.title}>
            Погода в місті <b>{weatherData.name}</b>
          </div>
          <ul className={classes.body}>
            <li className={classes.icon}>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
                alt="icon"
              />
            </li>
            <li className={clsx(classes.item, classes.temp)}>
              {weatherData.temp.temp_max === weatherData.temp.temp_min ? (
                <span>{weatherData.temp.temp_min} &#176;</span>
              ) : (
                <span>
                  {weatherData.temp.temp_min}&#176; ...{" "}
                  {weatherData.temp.temp_max}
                  &#176;
                </span>
              )}
            </li>
            <li className={classes.item}>
              Відчувається як: <b>{weatherData.temp.feels_like} &#176;</b>
            </li>
            <li className={classes.item}>
              Вітер: <b>{weatherData.wind.speed} м/с</b>
            </li>
            <li className={classes.item}>
              Вологість: <b>{weatherData.main.humidity} %</b>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <div className="tac align-center mt-5">
            Будь ласка, дайте дозвiл цьому сайту до геоданих
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
