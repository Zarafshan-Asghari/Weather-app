import snow from "../../../public/assets/images/icon-snow.webp";
import storm from "../../../public/assets/images/icon-storm.webp";
import sunny from "../../../public/assets/images/icon-sunny.webp";
import rain from "../../../public/assets/images/icon-rain.webp";
import drizzle from "../../../public/assets/images/icon-drizzle.webp";
import fog from "../../../public/assets/images/icon-fog.webp";
import overcast from "../../../public/assets/images/icon-overcast.webp";
import partlyCloudy from "../../../public/assets/images/icon-partly-cloudy.webp";

const weatherIcons = {
  0: sunny,
  1: partlyCloudy,
  2: partlyCloudy,
  3: overcast,
  45: fog,
  48: fog,
  51: drizzle,
  53: drizzle,
  55: drizzle,
  61: rain,
  63: rain,
  65: rain,
  71: snow,
  73: snow,
  75: snow,
  80: rain,
  85: rain,
  95: storm,
  96: storm,
  99: storm,
};
export default function WeatherIcon({ weatherCode ,className}) {
  const roundedCode = Math.round(weatherCode);
  const icon = weatherIcons[roundedCode] || "";
  return <img src={icon} alt="" className={className} />;
}
