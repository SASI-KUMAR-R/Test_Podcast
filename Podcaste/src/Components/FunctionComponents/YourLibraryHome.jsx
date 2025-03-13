import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../CSS/YourLibraryHome.css";

function YourLibraryHome() {
  return (
    <div>
      <Navbar />
      <div className="MAINDIVOFPOD">
        <div className="addpodcast">
          <h1>
            <Link to="/addpod" className="lokshaa">ADD YOUR PODCAST</Link>
          </h1>
        </div>
        <div className="deletepodcast">
          <h1>
            <Link to="/addpod" className="lokshaa2">DELETE YOUR PODCAST</Link>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default YourLibraryHome;
