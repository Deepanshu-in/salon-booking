import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import salonRoute from "./Routes/salon.js";
import reviewRoute from "./Routes/review.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: "https://salon-booking-wheat.vercel.app",
};

app.get("/", (req, res) => {
  res.send("Api is working...");
});

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb database is connected ");
  } catch (error) {
    console.log(
      "MongoDb databse connection failed with error : ",
      error.message
    );
  }
};
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/salons", salonRoute);
app.use("/api/v1/reviews", reviewRoute);

app.listen(port, () => {
  connectDB();
  // console.log("App server running at port : " + port);
});

// app.listen(() => {
//   connectDB();
// });
