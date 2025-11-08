import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { locationContext } from "../../App";

export default function Searchbar({setError}) {
  const [city, setCity] = useState('Herat');
  // const [err,setErr]=useState(false)
  const { setLocationData} = useContext(locationContext);

  async function getCityName() {
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();
      const result = geoData.results[0];
      setLocationData((pre) => ({
        ...pre,
        city: result.name,
        country: result.country,
        latitude: result.latitude,
        longitude: result.longitude,
      }));
    } catch (err) {
      setError(true)
      console.error("Error fetching city data:", err);
    }
  }

  return (
<>
   <div className="flex items-center justify-center gap-4">
    
      <span className="flex items-center gap-2 bg-neutral-600 px-4 py-2 rounded-md  ">
        <FaSearch className="text-neutral-400" />
        <input
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="search a place..."
          className="outline-none"
        />
      </span>
      <button
        onClick={getCityName}
        className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md text-neutral-200 hover:text-neutral-100"
      >
        search
      </button>
    </div> 
    
</>

  );
}
