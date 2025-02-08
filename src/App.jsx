import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import DateRibbon from "./components/DateRibbon";
// import TimeRibbon from "./components/TimeRibbon";
// import ScheduleGrid from "./components/ScheduleGrid";
import SchedulePage from "./pages/SchedulePage";
import ShowDetailsPage from "./pages/ShowDetailsPage";
import { AppProvider } from "./context/AppContext"; // Import the context
import EpisodeDetailsPage from "./pages/EpisodeDetailsPage";

const App = () => {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen">
        <Header />
        <div className="flex justify-center p-2">
          <DateRibbon />
        </div>

        {/* <DateRibbon className="place-self-center" /> */}
        {/* <div className="flex flex-row space-x-4 overflow-x-auto py-2 bg-black text-white relative"> */}
        {/* <TimeRibbon /> */}
        {/* </div> */}

        <Routes>
          <Route path="/" element={<SchedulePage />} />
        </Routes>
        <Routes>
          <Route path="/show/:id" element={<ShowDetailsPage />} />
        </Routes>
        <Routes>
          <Route path="episode/:id" element={<EpisodeDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

const AppWrapper = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default AppWrapper;
