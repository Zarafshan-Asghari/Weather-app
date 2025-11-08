import WeatherIcon from "../weatherIcon/WeatherIcon";

export default function ForcastDay({ data, loading }) {
  console.log(data, "forcast hour component");

  return (
    <>
      <h2 className="capitalize">daily forecast</h2>
      <div className="flex items-center gap-4 w-full overflow-x-auto">
        {data.daily?.time.slice(0, 7).map((eachDay, i) => (
          <div className="w-full flex flex-col justify-center px-2 py-4 gap-1.5 rounded-md bg-neutral-600/60 ">
            {loading ? (
              <span className="px-2 py-4" />
            ) : (
              <>
                <span className="capitalize text-sm text-center">
                  {new Date(eachDay).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </span>
                <WeatherIcon
                  weatherCode={data.daily.weather_code[i]}
                  className="size-8"
                />
                <span className="font-semibold flex items-center justify-between">
                  <span className="text-neutral-400 text-xs ml-1">
                    {Math.round(data.daily.temperature_2m_max[i])}°
                  </span>
                  <span className="text-neutral-400 text-xs ml-1">
                    {Math.round(data.daily.temperature_2m_min[i])}°
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
