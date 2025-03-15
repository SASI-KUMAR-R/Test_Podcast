import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/AddPodcast.css";

function AddPodcast() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);

    try {
      const response = await fetch("https://test-podcast.onrender.com/addpodcast", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setLoading(false);

      if (result.success) {
        alert("Podcast added successfully!");
        event.target.reset(); 
      } else {
        alert("Failed to add podcast!");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading podcast:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="Maindiv">
      <div className="maindiv">
        <h1 className="font">ADD YOUR PODCAST</h1>

        <form onSubmit={handleSubmit}>
          <div className="inputdiv">
            <label htmlFor="title">Name Of Podcast:</label>
            <input type="text" name="title" placeholder="Enter the Name..." required />

            <label htmlFor="description">Description:</label>
            <input type="text" name="description" placeholder="Enter Description Of Podcast.." required />

            <label htmlFor="image">Upload Image:</label>
            <input type="file" accept="image/*" name="image" required />

            <label htmlFor="audio">Upload Audio:</label>
            <input type="file" name="audio" accept="audio/*" required />

            <br />
            <button type="submit" className="signuptag" disabled={loading}>
              {loading ? "Uploading..." : "ADD PODCAST"}
            </button>
          </div>
        </form>

        <div className="logindiv">
          <Link to="/libhome" className="Linktag">
            Go To Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddPodcast;
