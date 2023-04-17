import express from "express";
import bookingsController from "../controllers/bookings.js";
import { validateBooking } from "../validators/bookings.js";

const router = express.Router();

// BOOK
router.post("/", validateBooking, bookingsController.create)

// GET BOOKINGS BY BRANCH AND DATE
router.get("/find/:branch/:date", bookingsController.getByBranchAndDate)

// // GET BOOKINGS BY USER
// router.get("/user/:userId", bookingsController.getAllOfUser)

// // GET BOOKING
// router.get("/:id", bookingsController.getOne)

// // UPDATE BOOKING
// router.put("/:id", validateBooking, bookingsController.update)

// // CANCEL BOOKING
// router.delete("/:id", bookingsController.cancel)

export default router;
