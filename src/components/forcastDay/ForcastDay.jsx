import { useContext } from "react";
import { UnitsContext } from "../../App";

export default function ForcastDay({ dailyforecastData, loading }) {
const {defaultUnits}=useContext(UnitsContext);
  return (
    <>
      <h2 className="capitalize">daily forecast</h2>
    <div className="grid grid-cols-3 md:grid-cols-7 items-center gap-4 w-full overflow-x-auto">
        {dailyforecastData.map((day, i) => (
       <div
  key={i}
  className="w-full flex flex-col items-center px-2 py-4 gap-1.5 rounded-md bg-neutral-600/60"
>
  {loading ? (
    <span className="px-2 py-4 w-4" />
  ) : (
    <>
      <span className="capitalize text-sm text-center">
        {new Date(day.date).toLocaleDateString("en-US", {
          weekday: "short",
        })}
      </span>

      <img
        src={day.day.condition.icon}
        alt="weather icon"
        className="size-8"
      />


      <span className="font-semibold flex w-full justify-between px-1">
        <span className="text-xs">
          {defaultUnits.temperature==='Celsius(°C)'
            ? Math.round(day.day.mintemp_c)
            : Math.round(day.day.mintemp_f)}
          °
        </span>

        <span className="text-xs">
          {defaultUnits.temperature==='Celsius(°C)'
            ? Math.round(day.day.maxtemp_c)
            : Math.round(day.day.maxtemp_f)}
          °
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
