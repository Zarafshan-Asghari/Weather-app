export default function WeatherStates({ weatherStates, loading }) {

  return (
    <>
      <div  className="grid md:grid-cols-4 grid-cols-2 gap-4">
        {weatherStates.map((item,i) => (
          <div key={i} className="flex flex-col p-2 rounded-md bg-neutral-600/60 ">
            <span className="capitalize text-sm font-thin">{item.title}</span>

            {loading ? (
            <span className="p-4">-</span>
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
