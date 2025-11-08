import WeatherIcon from "../weatherIcon/WeatherIcon";

export default function ForecastHour({data,loading}){
   
    return(
        <>
           <div className="flex flex-col gap-3 md:w-1/3 w-full rounded-md bg-neutral-600/60 p-6">
                <h2 className="font-semibold text-sm tracking-wide">
                  Hourly forecast
                </h2>

                {data.hourly?.time.slice(0, 8).map((eachHour, index) => (
                    <div className="flex items-center justify-between bg-neutral-600/80 border border-neutral-600/15 p-2 py-1 rounded-sm">
          {loading ? <span className="p-2"/> : <>
            <span className="flex items-center gap-2">
                <WeatherIcon weatherCode={data.hourly.weather_code[0]}  className='size-6' />
                <span className="md:text-sm text-xs">{new Date(eachHour).toLocaleTimeString([], {
                      hour: "2-digit",
                      hour12: true,
                    })}</span>
            </span>
            <span className='text-sm'>{Math.round(data.hourly.temperature_2m[index])}°</span>
          </>}
        </div>
                ))}
              </div>
       
        </>

       
    )
}