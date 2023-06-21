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
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isError, setIsError] = useState(false);

  function getCurrentDate() {
    const today = new Date();
    return today.toLocaleDateString();
  }

  const date = getCurrentDate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCountries = await getCountries();
        const sortedCountries = [...fetchedCountries].sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  const countryHandler = async (e) => {
    const selectedCountryCode = e.currentTarget.value;
    setSelectedCountry(selectedCountryCode);
    setSelectedCity("");
    setIsError(false);
    try {
      if (selectedCountryCode) {
        const fetchedCities = await getCities(selectedCountryCode);
        const sortedCities = [...fetchedCities].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCities(sortedCities);
      } else {
        setCities([]);
      }
      setWeather(null);
    } catch (error) {
      setIsError(true);
    }
  };

  const cityHandler = async (e) => {
    const selectedCityName = e.currentTarget.value;
    setSelectedCity(selectedCityName);
    setIsLoadingWeather(true);
    setIsError(false);
    try {
      if (selectedCityName) {
        const cityWeather = await getCityWeather(selectedCityName);
        setWeather(cityWeather);
      } else {
        setWeather(null);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Clima Hoy</h1>
      {isError && <p>Error al cargar los datos. Inténtalo de nuevo más tarde.</p>}
      <div className={styles.content}>
        <label className={styles.selec_pais}>Seleccione un País:</label>
        <select
          className={styles.select}
          onChange={countryHandler}
          value={selectedCountry}
        >
          <option value="">Selecciona...</option>
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
          <select
            className={styles.select}
            onChange={cityHandler}
            value={selectedCity}
          >
            <option value="">Selecciona...</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
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
              <h2 className={styles.text}>Pronóstico para hoy: {date} </h2>
              <h2 className={styles.text1}>Actual: {weather.main.temp.toFixed(1)}°C</h2>
              <p className={styles.data}>
                Sensación térmica: {weather.main.feels_like.toFixed(1)}°C
              </p>
              <p className={styles.data}>Mínima: {weather.main.temp_min.toFixed(1)}°C</p>
              <p className={styles.data}>Máxima: {weather.main.temp_max.toFixed(1)}°C</p>
              <p className={styles.data}>Humedad: {weather.main.humidity}% 💧</p>
              <p className={styles.data}>Viento: {weather.wind.speed} m/s 🌫🌫</p>
              <p className={styles.data}>Nubosidad: {weather.clouds.all}% ⛅</p>
              <div className={styles.imgcontainer}>
                <img
                  className={styles.img}
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="weather icon"
                />
                <div className={styles.icon_info}>
                  {weather.weather[0].description}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
