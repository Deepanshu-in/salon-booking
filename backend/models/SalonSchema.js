import mongoose from "mongoose";

const SalonSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  coordinates: { type: Array },
  role: {
    type: String,
  },

  speciality: {
    type: String,
    enum: ["male", "female", "unisex"],
    default: "male",
  },

  services: {
    type: Array,
  },

  bio: {
    type: String,
    maxLength: 250,
    default: "No information provided by salon.",
  },
  about: { type: String },
  location: { type: String },
  address: { type: String },
  timeSlots: { type: Array },
  totalCustomers: { type: Number },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("Salon", SalonSchema);
