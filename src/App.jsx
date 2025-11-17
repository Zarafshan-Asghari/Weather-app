import "./App.css";
import Searchbar from "./components/searchbar/Searchbar";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import ForcastDay from "./components/forcastDay/ForcastDay";
import ForecastHour from "./components/forcastHour/ForcastHour";
import Header from "./components/header/Header";
import NotFound from "./components/notFound/NotFound";
import WeatherStates from "./components/weatherStates/WeatherStates";
import { useState } from "react";
import { weatherCodes } from "./contents";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [weatherStates, setWeatherStates] = useState([]);
  const [dailyforecastData, setDailyforecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [units, setUnits] = useState({
    temp: ["c",'f'],
    feelLike: ["c",'f'],
    wind: ["kmh",'mph'],
    precip: ["in",'mph'],
  });
  console.log(units.temp)
  const getWeatherDetails = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setLoading(false);
      console.log(data);
      const forecastHourlyData = [...data.forecast.forecastday[0].hour];
      filterHourlyForecast(forecastHourlyData);
      const temperature = Math.round(data.current.temp_c);
      const description = data.current.condition.text;
      const stateIcon = data.current.condition.icon;
      const city = data.location.name;
      const country = data.location.country;
      // const timeZone = data.location.tz_id;
      const feelLike = Math.floor(`${data.current.feelslike_c}`);
      const humitidy = data.current.humidity;
      const precep = Math.floor(data.current.precip_in);
      const windSpeed = data.current.wind_kph;
      setDailyforecastData(data.forecast.forecastday);
      const weatherIcon = Object.keys(weatherCodes).find((icon) =>
        weatherCodes[icon].includes(data.current.condition.code)
      );
      const date = new Date(data.current.last_updated).toLocaleDateString(
        "en-US",
        {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      );
      setCurrentWeather({
        temperature,
        description,
        weatherIcon,
        city,
        country,
        date,
        stateIcon,
      });
      setWeatherStates([
        {
          title: "feel like",
          value: feelLike,
          unit: "c",
        },
        {
          value: humitidy,
          title: "Humidity",
          unit: "%",
        },
        {
          value: windSpeed,
          title: "wind",
          unit: "kmh",
        },
        {
          value: precep,
          title: "precipitation",
          unit: "mm",
        },
      ]);
    } catch {
      setError(true);
    }
  };

  const filterHourlyForecast = (hourlyDate) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;
    const next24HoursDate = hourlyDate.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });
    setHourlyForecast(next24HoursDate);
  };

  return (
    <>
      {error ? (
        <NotFound />
      ) : (
        <div className="bg-neutral-800 text-white h-full bg-cover flex flex-col items-center gap-8 py-10">
          <div className="container">
            {/* <Header units={units} setUnits={setUnits}/> */}

            <Searchbar getWeatherDetails={getWeatherDetails} />
          </div>

          <section className="p-6 container flex md:flex-row flex-col items-start justify-center gap-12 md:px-10">
            <div className="flex flex-col gap-4 md:w-2/3 w-full">
              <CurrentWeather
                currentWeather={currentWeather}
                loading={loading}
              />
              {/* current satates */}
              <WeatherStates loading={loading} weatherStates={weatherStates} />
              {/*  dayly forcast  */}
              <ForcastDay
                loading={loading}
                dailyforecastData={dailyforecastData}
              />
            </div>

            {/*  Hourly forecast */}
            <div className="flex flex-col gap-3 md:w-1/3 w-full  rounded-md bg-neutral-600/60 p-6">
              <h2 className="font-semibold text-sm tracking-wide">
                Hourly forecast
              </h2>
              {hourlyForecast.slice(0, 12).map((hourlyWeather) => (
                <ForecastHour
                  key={hourlyWeather.time_epoch}
                  hourlyWeather={hourlyWeather}
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
