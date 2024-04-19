import express from "express";
import {
  updateSalon,
  deleteSalon,
  getAllSalon,
  getSingleSalon,
  getSalonProfile,
} from "../Controllers/salonController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";

const router = express.Router();

//nested route
router.use("/:salonId/reviews", reviewRouter);

router.get("/:id", getSingleSalon);
router.get("/", getAllSalon);
router.put("/:id", authenticate, restrict(["salon"]), updateSalon);
router.delete("/:id", authenticate, restrict(["salon"]), deleteSalon);
router.get("/profile/me", authenticate, restrict(["salon"]), getSalonProfile);

export default router;
