import React, { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext();

const useAppContext = () => useContext(AppContext);
const currDate = import.meta.env.VITE_APP_CURRENT_DATE; // using the date which is returning date

// Get this from an API at first, here putting manually
const predefinedChannels = [
  "DisneyNOW",
  "Max",
  "Rooster Teeth",
  "Hulu",
  "bon appétit video",
  "CC: Studios",
  "Peacock",
  "Great American Pure Flix",
  "UFC Fight Pass",
  "Shudder",
  "ALTT",
  "ZEE5",
];

console.log("currDate : ", currDate);

const AppProvider = ({ children }) => {
  const [country, setCountry] = useState(
    localStorage.getItem("country") || "IN" // Default country is India
  );

  const [date, setDate] = useState(new Date(currDate)); // Selected date
  const [schedule, setSchedule] = useState([]);
  const [channels, setChannels] = useState(() => {
    const storedChannels = localStorage.getItem("channels");
    return storedChannels
      ? JSON.parse(storedChannels)
      : [...predefinedChannels];
  });

  const addNewChannels = (newChannels) => {
    setChannels((prevChannels) => {
      const updatedChannels = new Set([...prevChannels, ...newChannels]);

      // if no new channels return existing channels
      if (updatedChannels.size === prevChannels.length) {
        return prevChannels;
      }

      return Array.from(updatedChannels);
    });
  };

  useEffect(() => {
    localStorage.setItem("country", country);
  }, [country]);

  useEffect(() => {
    localStorage.setItem("channels", JSON.stringify(channels));
  }, [channels]);

  return (
    <AppContext.Provider
      value={{
        country,
        setCountry,
        date,
        setDate,
        schedule,
        setSchedule,
        channels,
        addNewChannels,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, useAppContext, AppProvider };
