import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { restrict } from "../auth/verifyToken.js";
import {
  checkout,
  paymentVerification,
} from "../Controllers/paymentController.js";

const router = express.Router();

router
  .route("/checkout/:salonId")
  .post(authenticate, restrict(["customer"]), checkout);
// router.route("/checkout").post(checkout);

router.route("/paymentVerification").post(paymentVerification);
// router.route("/paymentVerification").post(paymentVerification);

export default router;
