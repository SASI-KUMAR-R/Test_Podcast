import { useState } from "react";
import axios from "axios";
import "../CSS/AddPodcast.css";
function AddPodcast() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const userId = "USER_ID_HERE"; // Replace this with actual user ID (from login session)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("userId", userId);
    if (image) formData.append("image", image);
    if (audio) formData.append("audio", audio);

    try {
      const response = await axios.post("http://localhost:3001/api/podcasts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Podcast Added:", response.data);
      alert("Podcast added successfully!");
    } catch (error) {
      console.error("Error adding podcast:", error);
      alert("Failed to add podcast.");
    }
  };

  return (
    <div className="add-podcast-container">
      <h2>Add a New Podcast</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />

        <label>Upload Audio:</label>
        <input type="file" accept="audio/*" onChange={(e) => setAudio(e.target.files[0])} required />

        <button type="submit">Add Podcast</button>
      </form>
    </div>
  );
}

export default AddPodcast;
