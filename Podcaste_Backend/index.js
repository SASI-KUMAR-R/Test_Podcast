const express = require("express");
const mdb = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require('cors');
const Signup = require("./Models/SignUpSchema");
const app = express();
const port = 3001;
app.use(cors());
dotenv.config();

app.use(express.json());

mdb
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("SERVER STARTED AND CONNECTED WITH BACKEND");
  })
  .catch((error) => {
    console.log("SERVER GOT ERROR WITH BACKEND:", error);
  });

app.post("/signup", async (req, res) => {
  try {
    const { username, emailid, password, phonenumber } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const newsignup = new Signup({
      username: username,
      emailid: emailid,
      password: hashedPass,
      phonenumber: phonenumber,
    });
    await newsignup.save();
    console.log("SIGNUP SUCCESS");
    res.status(201).json({ message: "SIGNUP DONE", isSignup: true });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(400).json({ message: "SIGNUP FAILED", isSignup: false });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailid, password } = req.body;
    const user = await Signup.findOne({ emailid: emailid });
    if (!user) {
      return res
        .status(400)
        .json({ message: "USER NOT EXIST IN DB", isLogin: false });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (ismatch) {
      console.log("LOGIN SUCCESS");
      return res
        .status(200)
        .json({ message: "USER EXIST IN DB", isLogin: true });
    } else {
      return res
        .status(400)
        .json({ message: "PASSWORD WRONG", isLogin: false });
    }
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res
      .status(500)
      .json({ message: "INTERNAL SERVER ERROR", isLogin: false });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
