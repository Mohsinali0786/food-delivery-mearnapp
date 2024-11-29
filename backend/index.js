const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const { v2: cloudinary } = require('cloudinary');
const mongoose = require("mongoose");
const userRoutes = require('./routes/index')
require('dotenv').config();
const app = express()
app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())
app.use(cors({
  origin:"https://food-delivery-f-mearnapp.vercel.app",
  methods:["POST","GET","PATCH"],
  credentials:true
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://food-delivery-f-mearnapp.vercel.app'); // Replace '*' with your allowed origin
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  })
app.use(cors())
  app.use("/api",userRoutes)


// error handler
// app.use((err, req, res, next) => {
//     console.log(err,'err')
//     const status = err.status || 500;
//     const message = err.message || "Something went wrong";
//     return res.status(status).json({
//       success: false,
//       status,
//       message,
//     });
//   });

// app.use("/images",express.static('uploads'))
app.get("/", async (req, res) => {
    res.status(200).json({
      message: "Hello developers from GFG",
    });
  });




  const connectDB = () => {
    mongoose.set("strictQuery", true);
    const uri="mongodb+srv://mohsin00786:mohsin00786@cluster0.9pujbap.mongodb.net/foodDelivery?retryWrites=true&w=majority&appName=Cluster0"

    mongoose
      .connect(uri)
      .then(() => console.log("Connected to Mongo DB"))
      .catch((err) => {
        console.error("failed to connect with mongo");
        console.error(err);
      });
  };

  const startServer = async () => {
    try {
      connectDB();
      app.listen(`${process.env.PORT}`, () => console.log("Server started on port" , `${process.env.PORT}`));
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();
