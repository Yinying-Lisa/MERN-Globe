if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  
// const bodyParser = require("body-parser");
  // Adds all dependencies
  const express = require("express");
  const app = express();
  const mongoose = require("mongoose");

  // app.use(bodyParser.json());
  
  // Loads the schema
  const Pic = require("./models/pic");
  
  // Connects to MongoDB
  const dbUrl = process.env.DB_URL;
  mongoose.connect(dbUrl, { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => {
      console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
      console.error("MONGO CONNECTION ERROR:", err)
    });

  
  async function getAllPics() {
    const allPics = await Pic.find();

    // allPics.forEach(pic => console.log(pic.postID))

    console.log("allPics triggered");

    return allPics;
  };
  
  app.get("/", async (req, res) => {
    console.log("anything");
    res.send(await getAllPics());
  });
  
  // Checks if the port is open
  const port = process.env.PORT || 8080;
  
  app.listen(port, () => {
    console.log(`APP IS LISTENING ON PORT ${port}!`)
  })