import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const DateRibbon = () => {
  const { date, setDate } = useContext(AppContext);
  const defaultDate = new Date(import.meta.env.VITE_APP_CURRENT_DATE.trim()); // Ensure it's a Date object
  const visibleCount = 7; // 3 past + 1 selected + 3 future
  const [dates, setDates] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  // Generate a range of dates around the default date
  const generateDates = (centerDate, range = 20) => {
    if (isNaN(centerDate)) return []; // Handle invalid date case
    const newDates = [];
    for (let i = -range; i <= range; i++) {
      const newDate = new Date(centerDate);
      newDate.setDate(centerDate.getDate() + i);
      newDates.push(newDate);
    }
    return newDates;
  };

  useEffect(() => {
    if (isNaN(defaultDate)) {
      console.error(
        "Invalid VITE_DEFAULT_DATE format. Ensure it's YYYY-MM-DD."
      );
      return;
    }

    const generatedDates = generateDates(defaultDate, 20);
    setDates(generatedDates);

    // Find index of the default date in the generated list and center it
    const defaultIndex = generatedDates.findIndex(
      (d) => d.toDateString() === defaultDate.toDateString()
    );
    setStartIndex(Math.max(0, defaultIndex - 3)); // Center with 3 past + 3 future
    setDate(defaultDate); // Set default date in context
  }, []);

  // Move left
  const handleLeftClick = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Move right
  const handleRightClick = () => {
    if (startIndex + visibleCount < dates.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(new Date(newDate));
  };

  return (
    <div className="flex items-center bg-black text-white p-2">
      {/* Left Arrow */}
      <button
        onClick={handleLeftClick}
        className="px-3 py-2 bg-gray-800 text-white rounded-md mr-2 disabled:opacity-50"
        disabled={startIndex === 0}
      >
        ◀
      </button>

      {/* Date Buttons */}
      <div className="flex space-x-4">
        {dates
          .slice(startIndex, startIndex + visibleCount)
          .map((day, index) => {
            const isSelected =
              date && new Date(date).toDateString() === day.toDateString();
            return (
              <button
                key={index}
                onClick={() => handleDateChange(day)}
                className={`py-2 px-4 rounded-md transition-all duration-300 ${
                  isSelected
                    ? "bg-red-700 text-white scale-110"
                    : "text-white hover:bg-gray-700"
                }`}
              >
                {day.toDateString()}
              </button>
            );
          })}
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleRightClick}
        className="px-3 py-2 bg-gray-800 text-white rounded-md ml-2 disabled:opacity-50"
        disabled={startIndex + visibleCount >= dates.length}
      >
        ▶
      </button>
    </div>
  );
};

export default DateRibbon;
