
export default function WeatherStates({ data ,loading}) {

  const WeatherStates = [
    {
      title: "feel like",
      value: data.hourly.apparent_temperature[0],
      unit: data.current_units.apparent_temperature,
    },
    {
      value: data.hourly.relative_humidity_2m[0],
      title: "Humidity",
      unit: "%",
    },
    {
      value: data.hourly.wind_speed_10m[0],
      title: "wind",
      unit: data.current_units.wind_speed_10m,
    },
    {
      value: data.hourly.precipitation[0],
      title: "precipitation",
      unit: data.hourly_units.precipitation,
    },
  ];
  return (
    <>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
        {WeatherStates.map((item) => (
          <div className="flex flex-col p-2 rounded-md bg-neutral-600/60 ">
            <span className="capitalize text-sm font-thin">{item.title}</span>

            {loading ? (
              "-"
            ) : (
              <span className="font-semibold ">
                {item.value}

                <span className="text-neutral-400 text-xs ml-1">
                  {item.unit}
                </span>
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
