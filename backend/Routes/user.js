import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  getMyAppointments,
  getUserProfile,
} from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
const router = express.Router();

router.put("/:id", authenticate, restrict(["customer"]), updateUser);
router.get("/", authenticate, restrict(["admin"]), getAllUser);
router.get("/:id", authenticate, restrict(["customer"]), getSingleUser);
router.delete("/:id", authenticate, restrict(["customer"]), deleteUser);
router.get("/profile/me", authenticate, restrict(["customer"]), getUserProfile);
router.get(
  "/appointmets/my-appointments",
  authenticate,
  restrict(["customer"]),
  getMyAppointments
);

export default router;
