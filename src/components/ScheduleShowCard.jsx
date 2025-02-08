import React from "react";
import { useNavigate } from "react-router-dom";

const ScheduleShowCard = ({ show }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/show/${show._embedded.show.id}`); // Navigate to show details
  };

  return (
    <div
      className="bg-white text-black p-2 rounded-md mb-2 cursor-pointer hover:bg-gray-300"
      onClick={handleClick}
    >
      <strong>{show.name}</strong>-{show._embedded.show.name}
    </div>
  );
};

export default ScheduleShowCard;
