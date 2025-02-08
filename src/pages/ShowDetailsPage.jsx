import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowDetailsPage = () => {
  const params = useParams();
  console.log("params: ", params);

  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}/shows/${id}`);
        const data = await response.json();
        setShowDetails(data);
      } catch (error) {
        console.error("Error fetching show details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!showDetails) {
    return <div className="text-white">Show details not available.</div>;
  }

  return (
    <div className="bg-black text-white p-6 min-h-screen">
      <button
        className="text-red-600 font-bold mb-4 hover:underline"
        onClick={() => window.history.back()}
      >
        {"< Back to Schedule"}
      </button>

      {/* Show Info */}
      <div className="flex flex-col items-center md:flex-row md:space-x-6">
        {/* Show Image */}
        <div className="w-1/2 mb-6 md:mb-0">
          <img
            src={
              showDetails.image?.original ||
              "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081"
            }
            alt={showDetails.name}
            className="w-full max-h-[60vh] object-contain rounded-lg"
          />
        </div>

        {/* Show Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{showDetails.name}</h1>

          {/* Summary */}
          <p className="text-lg text-gray-300 mb-4">
            {showDetails.summary
              ? showDetails.summary.replace(/<[^>]+>/g, "")
              : "No summary available."}
          </p>

          {/* Genres */}
          {showDetails.genres.length > 0 && (
            <div className="mb-4">
              <strong>Genres: </strong> {showDetails.genres.join(", ")}
            </div>
          )}

          {/* Language */}
          <div className="mb-4">
            <strong>Language: </strong> {showDetails.language || "Unknown"}
          </div>

          {/* Runtime */}
          <div className="mb-4">
            <strong>Runtime: </strong>{" "}
            {showDetails.runtime ? `${showDetails.runtime} minutes` : "Unknown"}
          </div>

          {/* Schedule */}
          <div className="mb-4">
            <strong>Schedule: </strong>
            {showDetails.schedule?.days.length > 0
              ? `${showDetails.schedule.days.join(", ")} at ${
                  showDetails.schedule.time || "Not Scheduled"
                }`
              : "Not Scheduled"}
          </div>

          {/* Rating */}
          <div className="mb-4">
            <strong>Average Rating: </strong>
            {showDetails.rating?.average !== null
              ? showDetails.rating.average
              : "Not Rated"}
          </div>

          {/* Web Channel */}
          <div className="mb-4">
            <strong>Available on: </strong>
            {showDetails.webChannel ? (
              <a
                href={showDetails.webChannel.officialSite || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                {showDetails.webChannel.name}
              </a>
            ) : (
              "Not Available"
            )}
          </div>

          {/* Last Episode */}
          {showDetails._links?.previousepisode && (
            <div className="mt-4">
              <strong>Last Episode: </strong>
              <a
                href={`/episode/${showDetails._links.previousepisode.href
                  .split("/")
                  .pop()}`}
                className="text-blue-400 underline"
              >
                {showDetails._links.previousepisode.name || "View Episode"}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowDetailsPage;
