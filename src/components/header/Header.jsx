import logo from "../../../public/assets/images/logo.svg";
import settingIcon from "../../../public/assets/images/icon-units.svg";
import dropdownIcon from "../../../public/assets/images/dropdown.png";
import checkMarkIcon from "../../../public/assets/images/icon-checkmark.svg";
import { useContext, useEffect, useState } from "react";
import { UnitsContext } from "../../App";

const settings = [
  { title: "temperature", options: ["Celsius(°C)", "Fahrenhiet(°F)"] },
  { title: "wind", options: ["kmh", "mph"] },
  { title: "precip", options: ["mm", "in"] },
];

export default function Header() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const {defaultUnits, setDefaultUnits}=useContext(UnitsContext)

 

  const handleSelect = (settingTitle, option) => {
    setDefaultUnits((prev) => ({ ...prev, [settingTitle]: option }));
  };

  useEffect(() => {
    setIsDropDownOpen()
     console.log(defaultUnits)
  }, [defaultUnits]);
  
 



  return (
    <header className="">
      <div className="flex justify-between items-center">
        {" "}
        {/* Logo */}
       
          <img src={logo} alt="Logo" className="md:size-48 size-24"/>
       
        {/* Dropdown  */}
        <div
          onClick={() => setIsDropDownOpen(!isDropDownOpen)}
          className="relative flex items-center justify-center gap-2 cursor-pointer"
        >
          <img src={settingIcon} alt="Setting Icon" />
          <span>Unit</span>
          <img
            src={dropdownIcon}
            alt="Dropdown Icon"
            className={`size-4 ${!isDropDownOpen ? "rotate-0" : "rotate-180"}`}
          />
        </div>
        {/* Dropdown Content */}
        <div
          className={`${
            isDropDownOpen ? "block" : "hidden"
          } absolute right-10  top-20 rounded-sm p-4 bg-neutral-600 text-neutral-200 text-xs md:w-40 w-32`}
        >
          <div className="flex flex-col gap-3 w-full">
            {settings.map((item) => (
              <div
                key={item.title}
                className="border-b border-neutral-500 py-1 flex flex-col gap-1"
              >
                <span className="capitalize text-neutral-400  ">
                  {item.title}
                </span>
                <span
                  key={item}
                  className="flex flex-col  w-full gap-2 rounded-sm cursor-pointer"
                >
                  {item.options.map((option) => (
                    <div
                      onClick={() => handleSelect(item.title, option)}
                      key={option}
                      className={`flex items-center justify-between p-1 rounded-sm hover:bg-neutral-700 ${
                        defaultUnits[item.title] === option
                          ? "bg-neutral-700"
                          : ""
                      }`}
                    >
                      <span className="block">{option}</span>

                      <img
                        src={checkMarkIcon}
                        alt="check mark"
                        className={`${
                          defaultUnits[item.title] === option
                            ? "block"
                            : "hidden"
                        } `}
                      />
                    </div>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="font-dmSans text-center md:text-4xl text-2xl font-bold mb-8">
        How's the sky looking today?
      </h2>
    </header>
  );
}
