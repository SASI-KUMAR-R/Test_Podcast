import React, { useState } from "react";
import "../CSS/Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [emailid, setemailid] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handlepage = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://podcaste-giuk.onrender.com/login", {
        emailid: emailid,
        password: password,
      });

      const message = response.data.message;
      const isLogin = response.data.isLogin;
      alert(message);
      if (isLogin) {
        navigate("/Home");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="Maindivuser">
      <h1 className="font">WELCOME TO PODCASTS</h1>
      <div className="User">
        <h3 className="font">Login</h3>
        <form onSubmit={handlepage}>
          <div className="FormInput">
            <label>Email:</label>
            <input
              id="Email"
              placeholder="Enter your Email"
              value={emailid}
              onChange={(e) => setemailid(e.target.value)}
            />

            <label>Password:</label>
            <input
              id="Password"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            <button type="submit" className="btn">Login</button>
          </div>
        </form>
        <div className="signup">
          <p>Don't have an account?</p>
          <br />
          <Link to="/signup" className="signupbtn">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
