import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { useUser } from "../FunctionComponents/UserContext";
import "../CSS/YourLibraryHome.css";

function YourLibraryHome() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserPodcasts = async () => {
      if (!user?.userid) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://test-podcast.onrender.com/getUserPodcasts/${user.userid}`
        );
        setPodcasts(response.data);
      } catch (err) {
        console.error("Error fetching user podcasts:", err);
        setError("Failed to fetch your podcasts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPodcasts();
  }, [user]);

  const filteredPodcasts = podcasts.filter((podcast) =>
    podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handledetailpage = (id) => {
    navigate(`/userdetail/${id}`);
  };

  return (
    <div>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="MAINDIVOFPOD">
        <div className="addpodcast">
          <h1>
            <Link to="/addpod" className="lokshaa">
              ADD YOUR PODCAST
            </Link>
          </h1>
        </div>
        <div className="deletepodcast">
          <h1>
            <Link to="/deletepod" className="lokshaa2">
              DELETE YOUR PODCAST
            </Link>
          </h1>
        </div>
      </div>

      <div className="main">
        {loading ? (
          <p className="paralaimp">LOADING PLEASE WAIT...</p>
        ) : error ? (
          <p className="paralaimp">{error}</p>
        ) : filteredPodcasts.length === 0 ? (
          <p className="paralaimp">NO RESULTS FOUND....</p>
        ) : (
          filteredPodcasts.map((podcast) => (
            <div className="audio" key={podcast._id}>
              <img
                src={`data:image/png;base64,${podcast.image}`}
                alt={podcast.title}
                onClick={() => handledetailpage(podcast._id)}
              />
              <h2>{podcast.title}</h2>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default YourLibraryHome;
