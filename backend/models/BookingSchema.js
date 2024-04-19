import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    barber: {
      type: mongoose.Types.ObjectId,
      ref: "Salon",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: Array, required: true },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled", "fulfilled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
