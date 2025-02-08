import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const CountrySelector = () => {
  const { setCountry } = useContext(AppContext);
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const navigate = useNavigate();

  const handleSubmit = () => {
    setCountry(selectedCountry);
    navigate("/schedule");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Select Your Country
      </h1>
      <select
        className="p-3 bg-black border border-white text-white"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="IN">India</option>
        <option value="US">United States</option>
      </select>
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-primary text-white font-bold"
      >
        Continue
      </button>
    </div>
  );
};

export default CountrySelector;
