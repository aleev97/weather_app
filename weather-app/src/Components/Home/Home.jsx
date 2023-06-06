import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { getCountries } from "../../services/getCountries";
import { getCities } from "../../services/cities";
import { getCityWeather } from "../../services/weather";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCountries = await getCountries();
      const sortedCountries = fetchedCountries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(sortedCountries);
    };

    fetchData();
  }, []);

  const countryHandler = async (e) => {
    const selectedCountryCode = e.currentTarget.value;
    if (selectedCountryCode) {
      const fetchedCities = await getCities(selectedCountryCode);
      const sortedCities = fetchedCities.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCities(sortedCities);
    } else {
      setCities([]);
    }
    setWeather(null);
  };

  const cityHandler = async (e) => {
    const selectedCity = e.currentTarget.value;
    if (selectedCity) {
      setIsLoadingWeather(true);
      setWeather(await getCityWeather(selectedCity));
      setIsLoadingWeather(false);
    } else {
      setWeather(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Clima Hoy</h1>
      <div className={styles.content}>
        <label className={styles.selec_pais}>Seleccione un País:</label>
        <select className={styles.select} onChange={countryHandler}>
          <option value="">selecciona...</option>
          {countries.map((country) => (
            <option key={country.cca2} value={country.cca2}>
              {country.name.common}
            </option>
          ))}
        </select>
      </div>

      {cities.length > 0 && (
        <div className={styles.content2}>
          <label className={styles.selec_prov}>Seleccione Ciudad:</label>
          <select className={styles.select} onChange={cityHandler}>
            <option value="">selecciona...</option>
            {cities.map((city) => (
              <option key={city.id}>{city.name}</option>
            ))}
          </select>
        </div>
      )}

      {isLoadingWeather ? (
        <div className={styles.load}>
          <div className={styles.snow}>
            <span style={{ "--i": 11 }}></span>
            <span style={{ "--i": 12 }}></span>
            <span style={{ "--i": 15 }}></span>
            <span style={{ "--i": 17 }}></span>
            <span style={{ "--i": 18 }}></span>
            <span style={{ "--i": 13 }}></span>
            <span style={{ "--i": 14 }}></span>
            <span style={{ "--i": 19 }}></span>
            <span style={{ "--i": 20 }}></span>
            <span style={{ "--i": 10 }}></span>
            <span style={{ "--i": 18 }}></span>
            <span style={{ "--i": 13 }}></span>
            <span style={{ "--i": 14 }}></span>
            <span style={{ "--i": 19 }}></span>
            <span style={{ "--i": 20 }}></span>
            <span style={{ "--i": 10 }}></span>
            <span style={{ "--i": 18 }}></span>
            <span style={{ "--i": 13 }}></span>
            <span style={{ "--i": 14 }}></span>
            <span style={{ "--i": 19 }}></span>
            <span style={{ "--i": 20 }}></span>
            <span style={{ "--i": 10 }}></span>
          </div>
        </div>
      ) : (
        <div className={styles.container2}>
          {weather && (
            <div className={styles.data_weather}>
              <h2 className={styles.text}>Pronóstico para hoy:</h2>
              <h2 className={styles.text1}>
                Temperatura actual: {weather.main.temp}°
              </h2>
              <p className={styles.data}>Mínima: {weather.main.temp_min}°</p>
              <p className={styles.data}>Máxima: {weather.main.temp_max}°</p>
              <p className={styles.data}>Humedad: {weather.main.humidity}% 💧</p>
              <p className={styles.data}>Viento: {weather.wind.speed} Km/h 🌫🌫</p>
              <p className={styles.data}>Nubosidad: {weather.clouds.all} % ⛅</p>
              <div className={styles.imgcontainer}>
                <img
                  className={styles.img}
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="weather icon"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
