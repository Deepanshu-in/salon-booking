import { instance } from "../index.js";
import User from "../models/UserSchema.js";
import Salon from "../models/SalonSchema.js";
import Booking from "../models/BookingSchema.js";
import crypto from "crypto";
import { Payment } from "../models/PaymentModel.js";

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
      notes: {
        salonId: req.params.salonId,
        user: req.userId,
        amount: Number(req.body.amount),
      },
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, message: "Successful", order });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
    console.log(error);
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const orderId = await instance.orders.fetch(razorpay_order_id);
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database comes here
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      //if payment is successfully paid
      const salon = await Salon.findById(orderId.notes.salonId);
      const user = await User.findById(orderId.notes.user);
      console.log(user, "user");
      const booking = new Booking({
        salon: salon._id,
        user: user._id,
        appointmentDate: new Date(),
        amount: orderId.notes.amount,
        // session: order._id,
      });
      await booking.save();

      res.redirect(
        `https://www.stylesatease.tech/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};
