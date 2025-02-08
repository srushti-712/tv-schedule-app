import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ScheduleShowCard from "./ScheduleShowCard";

const ScheduleGrid = ({ schedule, scrollRef }) => {
  const { date } = useContext(AppContext);
  console.log("schedule : ", schedule);

  const groupByChannel = () => {
    return schedule.reduce((acc, show) => {
      let channelName = show?._embedded?.show?.webChannel?.name
        ? show._embedded.show.webChannel.name
        : " ";
      if (!acc[channelName]) acc[channelName] = [];
      acc[channelName].push(show);
      return acc;
    }, {});
  };

  const groupedShows = groupByChannel();

  console.log("grouped shows: ", groupedShows);

  // Function to calculate grid column start and span based on time
  const getGridPosition = (startTime, duration) => {
    const start = new Date(startTime);
    const startMinutes = start.getHours() * 60 + start.getMinutes();
    const endMinutes = startMinutes + duration;

    const startCol = Math.floor(startMinutes / 15) + 2;
    const span = Math.max(duration / 15, 1);

    return { startCol, span };
  };

  if (
    groupedShows == null ||
    groupedShows === undefined ||
    Object.keys(groupedShows).length === 0
  )
    return (
      <div className="flex justify-center p-4 mx-10 m-8 bg-slate-700 rounded-xl">
        <h1>Oop, No scheduled shows..</h1>
      </div>
    );

  return (
    <div
      ref={scrollRef}
      className="relative w-full overflow-x-auto bg-black text-white"
    >
      <div className="grid grid-cols-[150px_repeat(96,_1fr)] border-b border-gray-700">
        <div className="bg-black"></div>

        {[...Array(96)].map((_, index) => (
          <div
            key={index}
            className="text-center text-sm text-gray-400 border-l border-gray-600"
          >
            {index % 4 === 0 ? `${Math.floor(index / 4)}:00` : ""}
          </div>
        ))}
      </div>

      {Object.keys(groupedShows).map((channel, channelIndex) => (
        <div
          key={channelIndex}
          className="grid grid-cols-[150px_repeat(96,_1fr)] border-b border-gray-700"
        >
          <div className="font-bold text-white bg-gray-900 flex items-center px-2">
            {channel}
          </div>

          <div className="relative flex">
            {groupedShows[channel].map((show, index) => {
              const { startCol, span } = getGridPosition(
                show.airstamp,
                show.runtime
              );
              return (
                <div
                  key={index}
                  className="px-2 py-1 text-sm text-black bg-red-500 rounded"
                  style={{
                    gridColumnStart: startCol,
                    gridColumnEnd: `span ${span}`,
                  }}
                >
                  <ScheduleShowCard show={show} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleGrid;
