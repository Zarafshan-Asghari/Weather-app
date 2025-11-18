import { FaSearch } from "react-icons/fa";
import { FaCrosshairs } from "react-icons/fa";
import { useEffect } from "react";
import { UnitsContext } from "../../App";
import { useContext } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function Searchbar({ getWeatherDetails }) {
    const { defaultUnits } = useContext(UnitsContext);
  const handleCityName = (e) => {
    e.preventDefault();
    const cityName = e.target.querySelector(".searchInput").value;
    const apiUrl = `https://api.weatherapi.com/v1/search.json/forecast.json?key=${API_KEY}&q=${cityName}&days=7&pollen=yes`;
    getWeatherDetails(apiUrl);
  };
// get current location
  const handleLocationSearch = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude
 } = position.coords;
    
         const apiUrl = `https://api.weatherapi.com/v1/search.json/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=7&pollen=yes`;
    getWeatherDetails(apiUrl); 
      },
      () => {
        alert("please enable permission to use this feature .");
      }
    );
  };
    useEffect(() => {
    handleLocationSearch();
  }, [defaultUnits]);
  return (
    <>
      <form
        onSubmit={handleCityName}
        className="flex items-center justify-center gap-4"
      >
        <FaCrosshairs
          className="cursor-pointer"
          onClick={handleLocationSearch}
        />
        <span className="flex items-center md:gap-2 gap-1.5 bg-neutral-600 md:px-4 md:py-2  px-2 py-1 rounded-md  ">
          <FaSearch className="text-neutral-400"/>
          <input
            type="text"
            placeholder="search a place..."
            className="searchInput  outline-none"
          />
        </span>
        <button className="bg-blue-500 hover:bg-blue-700 md:px-4 md:py-2 px-2 py-1 rounded-md text-neutral-200 hover:text-neutral-100">
          search
        </button>
      </form>
    </>
  );
}
