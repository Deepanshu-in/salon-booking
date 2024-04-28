import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    salon: {
      type: mongoose.Types.ObjectId,
      ref: "Salon",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    appointmentDate: {
      type: Date,
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

bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "salon",
    select: "name",
  });
  next();
});

export default mongoose.model("Booking", bookingSchema);
