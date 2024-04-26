import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import salonRoute from "./Routes/salon.js";
import reviewRoute from "./Routes/review.js";
import paymentRoute from "./Routes/payment.js";
import Razorpay from "razorpay";

dotenv.config();
const app = express();
const port = process.env.PORT;

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const corsOptions = {
  origin: true,
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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/salons", salonRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/payments", paymentRoute);
app.get("/api/v1/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
app.listen(port, () => {
  connectDB();
  console.log("App server running at port : " + port);
});
