import { createContext, useEffect, useState } from "react";
import "./App.css";
import ForcastDay from "./components/forcastDay/ForcastDay";
import ForecastHour from "./components/forcastHour/ForcastHour";
import Header from "./components/header/Header";
import Searchbar from "./components/searchbar/Searchbar";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import NotFound from "./components/notFound/NotFound";
import WeatherStates from "./components/weatherStates/WeatherStates";

export const locationContext = createContext({});

function App() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationData, setLocationData] = useState({
    city: "Herat",
    country: "Afghanistan",
    latitude: 34.5281,
    longitude: 69.1723,
  });
  const [units, setUnits] = useState({
    temperature_2m: "°C",
    apparent_temperature: "°C",
    precipitation: "mm",
    wind_speed_10m: "km/h",
  });

  useEffect(() => {
    async function getData() {
      if (!locationData.latitude || !locationData.longitude) return;
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${locationData.latitude}&longitude=${locationData.longitude}&&current=weather_code&hourly=weather_code&daily=weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,wind_speed_10m`
        );

        if (!res.ok) throw new Error("Failed to fetch weather data");
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [locationData.latitude, locationData.longitude]);

  console.log("Weather data:", data);

  return (
    <>
      {error ?  <NotFound />  : <>    <locationContext.Provider value={{ locationData, setLocationData }}>
        <div className="bg-neutral-800 text-white h-full bg-cover flex flex-col items-center gap-8 py-10">
          <div className="container">
            <Header data={data} units={units} setUnits={setUnits} />
            <Searchbar error={err} setError={setErr} />
          </div>
          {err && <h2 className="capitalize">No search result found ! </h2>}

          {!err && data && (
            <section className="container flex md:flex-row flex-col items-start justify-center gap-12 md:px-10">
              <div className="flex flex-col gap-4 md:w-2/3 w-full">
                <CurrentWeather
                  data={data}
                  locationData={locationData}
                  loading={loading}
                />
                {/* current satates */}
                <WeatherStates data={data} loading={loading} />
                  {/*  dayly forcast  */}
                <ForcastDay data={data} loading={loading}/>
              </div>
              {/*  Hourly forecast */}
              <ForecastHour data={data} loading={loading}/>
        
            </section>
          )}

        </div>
      </locationContext.Provider></>}
  
    </>
  );
}

export default App;
