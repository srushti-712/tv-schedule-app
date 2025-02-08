import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const TimeRibbon = ({ scrollRef }) => {
  const { date } = useContext(AppContext);
  const [times, setTimes] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervals = [];
    let time = new Date(date.setHours(0, 0, 0, 0));
    for (let i = 0; i < 96; i++) {
      intervals.push(new Date(time));
      time = new Date(time.getTime() + 15 * 60000);
    }
    setTimes(intervals);
  }, [date]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex flex-row space-x-4 overflow-x-auto py-2 bg-black text-white scrollbar-hide"
    >
      {times.map((time, index) => (
        <div
          key={index}
          className="relative flex-shrink-0 flex flex-col items-center w-[60px]"
        >
          <span
            className={`text-sm ${
              currentTime.getHours() === time.getHours() &&
              currentTime.getMinutes() === time.getMinutes()
                ? "text-red-600"
                : "text-gray-400"
            }`}
          >
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TimeRibbon;
