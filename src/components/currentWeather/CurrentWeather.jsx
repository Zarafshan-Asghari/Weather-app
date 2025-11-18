import Loading from "../loading/Loading";
import { UnitsContext } from "../../App";
import { useContext } from "react";
export default function CurrentWeather({ currentWeather ,loading}) {
  const {defaultUnits}=useContext(UnitsContext)
  return (
   
    <div className="bg-neutral-600/60 rounded-2xl  w-full h-[300px] ">
      {
       loading?  <span className="flex items-center justify-center py-10"><Loading/></span>: 
        <div
          className="flex justify-between items-center bg-cover rounded-2xl
                     md:bg-[url('/assets/images/bg-today-large.svg')] 
                     bg-[url('/assets/images/bg-today-small.svg')] 
                      bg-no-repeat bg-center 
                     md:p-10 p-6 size-full"
        >
          <span className="flex flex-col ">
            {" "}
            <span className="font-semibold md:text-2xl text-lg font-bricolageGrotesque">
              {currentWeather.city}, {currentWeather.country}
            </span>
            <span>{currentWeather.description}</span>
            <span className='md:text-md text-sm font-medium'>
    {currentWeather.date}
        </span>
          </span>
          <div className="flex items-center  gap-2">
       
            <img src={currentWeather.stateIcon} alt="" />
            <span className="font-bold md:text-5xl text-2xl font-dmSans">
              {currentWeather.temperature}{defaultUnits.temperature==='Celsius(°C)' ? '°C' :'°F'}
            </span>
          </div>
        </div>
      }
    </div>
  );
}
