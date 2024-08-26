const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
require('dotenv').config();
const app = express()

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); 


app.get("/", async (req, res) => {
    res.status(200).json({
      message: "Hello developers from GFG",
    });
  });



  const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("Connected to Mongo DB"))
      .catch((err) => {
        console.error("failed to connect with mongo");
        console.error(err);
      });
  };

  const startServer = async () => {
    try {
      connectDB();
      app.listen(8080, () => console.log("Server started on port" , process.env.PORT));
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();
