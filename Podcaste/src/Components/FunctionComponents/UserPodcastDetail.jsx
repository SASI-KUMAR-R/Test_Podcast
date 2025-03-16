import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Detail.css";
import Player from "./AudioPlayer";
import Navbar from "./Navbar";
import { useUser } from "../FunctionComponents/UserContext"; // Import UserContext

function UserPodcastDetail() {
  const { id } = useParams(); // This is the podcastId
  const { user } = useUser(); // Get user details
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPodcastDetail = async () => {
      const userId = user?.userid || JSON.parse(localStorage.getItem("user"))?.userid; // Get userId

      if (!userId) {
        setError("User not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://test-podcast.onrender.com/getUserPodcast/${userId}/${id}`
        );
        setPodcast(response.data);
      } catch (err) {
        console.error("Error fetching podcast details:", err);
        setError("Failed to fetch podcast details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastDetail();
  }, [id, user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!podcast) return <p>Podcast not found.</p>;

  return (
    <div>
      <Navbar />
      <div className="mainproject">
        <div className="project1">
          <img src={`data:image/png;base64,${podcast.image}`} alt={podcast.title} />
          <h1 className="h1tagdirect">{podcast.title}</h1>
          <p className="p1tagdirect">
            {podcast.description.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
        <Player src={podcast.audio} />
      </div>
    </div>
  );
}

export default UserPodcastDetail;
