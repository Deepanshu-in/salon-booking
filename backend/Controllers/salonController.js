import Booking from "../models/BookingSchema.js";
import Salon from "../models/SalonSchema.js";

export const updateSalon = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedSalon = await Salon.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedSalon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to updated",
    });
  }
};

export const deleteSalon = async (req, res) => {
  const id = req.params.id;
  try {
    await Salon.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

export const getSingleSalon = async (req, res) => {
  const id = req.params.id;
  try {
    const salon = await Salon.findById(id)
      .populate("reviews")
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Salon found",
      data: salon,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Salon not found",
    });
  }
};

export const getAllSalon = async (req, res) => {
  try {
    const { query } = req.query;
    let salons;

    if (query) {
      salons = await Salon.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { speciality: { $regex: query, $options: "i" } },
          { location: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      salons = await Salon.find({ isApproved: "approved" }).select("-password");
    }

    res.status(200).json({
      success: true,
      message: "Salons found",
      data: salons,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

export const getSalonProfile = async (req, res) => {
  const salonId = req.userId;

  try {
    const salon = await Salon.findById(salonId);
    if (!salon) {
      res.status(404).json({
        success: false,
        message: "Salon Not found",
      });
    }
    const { password, ...rest } = salon._doc;
    const appointments = await Booking.find({ salon: salonId });
    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest, appointments },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
