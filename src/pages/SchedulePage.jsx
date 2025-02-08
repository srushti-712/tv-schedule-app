import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import ScheduleGrid from "../components/ScheduleGrid";
import { openDB } from "idb";

const SchedulePage = () => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const { country, date, schedule, setSchedule, addNewChannels } =
    useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const dateForAPICall = date.toISOString().split("T")[0]; // date in required format
  // Open indexes db
  const initDB = async () => {
    return await openDB("scheduleDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("schedules")) {
          db.createObjectStore("schedules", { keyPath: "id" });
        }
      },
    });
  };

  // Get cached Schedule
  const getCachedSchedule = async (date, country) => {
    const db = await initDB();
    const tx = db.transaction("schedules", "readonly");
    const store = tx.objectStore("schedules");
    return await store.get(`${country}-${date}`);
  };

  // Save schedule to indexDB
  const cacheSchedule = async (date, country, data) => {
    const db = await initDB();
    const tx = db.transaction("schedules", "readwrite");
    const store = tx.objectStore("schedules");
    await store.put({
      id: `${country}-${date}`,
      data,
      timestamp: new Date().getTime(), // Save timestamp for expiration logic
    });
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);

      // Check cache first
      const cachedData = await getCachedSchedule(date, country);
      if (
        cachedData &&
        new Date().getTime() - cachedData.timestamp < 86400000
      ) {
        console.log("data from cache", cachedData);

        // If cache is less than 24 hours old, use it
        setSchedule(cachedData.data);
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `${baseUrl}/schedule/web?date=${dateForAPICall}&country=${country}`
        );

        setSchedule(response.data);
        await cacheSchedule(date, country, response.data); // Cache the new data
        const currentChannels = response.data.map((show) => show.channel);
        addNewChannels(currentChannels);
      } catch (error) {
        console.error("Error fetching TV schedule", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [country, date]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-black text-white min-h-screen">
      <ScheduleGrid schedule={schedule} />
    </div>
  );
};

export default SchedulePage;
