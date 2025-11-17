// import WeatherIcon from "../weatherIcon/WeatherIcon";

export default function ForcastDay({ dailyforecastData, loading }) {
  return (
    <>
      <h2 className="capitalize">daily forecast</h2>
    <div className="grid grid-cols-3 md:grid-cols-7 items-center gap-4 w-full overflow-x-auto">
        {dailyforecastData.map((day, i) => (
          <div key={i} className="w-full flex flex-col justify-center px-2 py-4 gap-1.5 rounded-md bg-neutral-600/60 ">
            {loading ? (
              <span className="px-2 py-4" />
            ) : (
              <>
                <span className="capitalize text-sm text-center">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </span>
                {/* <span className="text-xs overflow-hidden ">{day.day.condition.text}</span> */}
             <img src={day.day.condition.icon} alt="weather icon"  className="size-8 text-center"/>
                <span className="font-semibold flex items-center justify-between">
                  <span className="text-neutral-400 text-xs ml-1">
                    {Math.round(day.day.mintemp_c)}°
                  </span>
                  <span className="text-neutral-400 text-xs ml-1">
                    {Math.round(day.day.maxtemp_c)}°
                  </span>
                </span>
              </>
            )}
          </div>
        ))}
      </div> 
    </>
  );
}
