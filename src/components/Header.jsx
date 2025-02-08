import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { country, setCountry } = useContext(AppContext);

  return (
    <header className="flex justify-between items-center p-4 bg-black text-white">
      <div className="flex items-center space-x-4">
        <img
          src="tv-logo.jpg"
          alt="TV logo"
          className="w-12 h-12 rounded-full"
        />
        <Link to="/" className="text-lg font-bold text-primary hover:underline">
          TV Schedule
        </Link>
      </div>
      {/** for now setting this manually can get this from an API  */}
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="p-2 bg-black border border-white text-white"
      >
        <option value="IN">India</option> {/* the value is the country code */}
        <option value="US">United States</option>
      </select>
    </header>
  );
};

export default Header;
