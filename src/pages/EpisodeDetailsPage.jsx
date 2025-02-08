import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EpisodeDetailsPage = () => {
  const params = useParams();
  console.log("params : ", params);
  const episodeId = params.id;
  const [episodeDetails, setEpisodeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}/episodes/${episodeId}`);
        const data = await response.json();
        setEpisodeDetails(data);
      } catch (error) {
        console.error("Error fetching episode details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodeDetails();
  }, [episodeId]);

  if (loading) return <div className="text-white">Loading...</div>;

  if (!episodeDetails)
    return <div className="text-white">Episode details not available.</div>;

  return (
    <div className="bg-black text-white p-6 min-h-screen">
      <button
        className="text-red-600 font-bold mb-4 hover:underline"
        onClick={() => window.history.back()}
      >
        {"< Back to Show"}
      </button>

      <div className="flex flex-col items-center md:flex-row md:space-x-6">
        {/* Episode Image */}
        <div className="w-1/2 mb-6 md:mb-0">
          <img
            src={
              episodeDetails.image?.original ||
              "https://via.placeholder.com/200x300"
            }
            alt={episodeDetails.name}
            className="w-full max-h-[60vh] object-cover rounded-lg"
          />
        </div>

        {/* Episode Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{episodeDetails.name}</h1>

          {/* Air Date */}
          <div className="mb-4">
            <strong>Air Date: </strong> {episodeDetails.airdate || "Unknown"}
          </div>

          {/* Summary */}
          <p className="text-lg text-gray-300 mb-4">
            {episodeDetails.summary
              ? episodeDetails.summary.replace(/<[^>]+>/g, "")
              : "No summary available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetailsPage;
