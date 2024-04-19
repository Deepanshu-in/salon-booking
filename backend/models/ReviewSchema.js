import mongoose from "mongoose";
import Salon from "./SalonSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    salon: {
      type: mongoose.Types.ObjectId,
      ref: "Salon",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (salonId) {
  const stats = await this.aggregate([
    {
      $match: { salon: salonId },
    },
    {
      $group: {
        _id: "$salon",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  await Salon.findByIdAndUpdate(salonId, {
    totalRating: stats[0].numOfRating,
    averageRating: stats[0].avgRating,
  });
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.salon);
});

export default mongoose.model("Review", reviewSchema);
