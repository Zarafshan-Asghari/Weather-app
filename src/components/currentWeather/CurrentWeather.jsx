import Loading from "../loading/Loading";
import WeatherIcon from "../weatherIcon/WeatherIcon";
export default function CurrentWeather({ locationData, data ,loading}) {
  
  return (
<div className="bg-neutral-600/60 rounded-2xl  w-full h-[300px] ">
{  loading ? <span className="flex items-center justify-center py-10"><Loading/></span> :    <div
      className="flex justify-between items-center bg-cover rounded-2xl
                     md:bg-[url('/assets/images/bg-today-large.svg')] 
                     bg-[url('/assets/images/bg-today-small.svg')] 
                      bg-no-repeat bg-center 
                     md:p-10 p-20 size-full"
    > 
      <span className="flex flex-col ">
        {" "}
        <span className="font-semibold md:text-2xl text-lg font-bricolageGrotesque">
          {locationData.city}, {locationData.country}
        </span>
        <span className='md:text-md text-sm font-medium'>
          {new Date(data.current.time).toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </span>
   <div className='flex gap-6'>
       <WeatherIcon weatherCode={(data.current.weather_code)} className='md:size-15 size-12' />
      <span className="font-bold text-5xl font-dmSans">
        {Math.round(data.current.temperature_2m)} {data.hourly_units.temperature_2m}
      </span>
   </div>
    </div>}


</div>
  );
}
