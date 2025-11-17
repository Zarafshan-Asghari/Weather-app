
export default function ForecastHour({ loading, hourlyWeather }) {
  const temperature = Math.floor(hourlyWeather.temp_c);
  const icon = hourlyWeather.condition.icon;
  const time =new Date(hourlyWeather.time).getHours();
  return (
    <>
      <div className="flex items-center justify-between bg-neutral-600/80 border border-neutral-600/15 px-2 py-1 rounded-sm ">
        {loading ? (
          <span className="p-2 bg-neutral-600/80 border border-neutral-600/15" />
        ) : (
          <>
            <span className="flex items-center gap-2">
              <img src={icon} alt="weather icon state" className="size-8" />
              <span className="text-xs">{time}</span>
            </span>
            <span className="text-xs">{temperature}°</span>
          </>
        )}
      </div>
    </>
  );
}
