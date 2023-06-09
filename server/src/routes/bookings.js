import express from "express";
import bookingsController from "../controllers/bookings.js";
import { validateBooking } from "../validators/bookings.js";

const router = express.Router();

// BOOK
router.post("/", validateBooking, bookingsController.create)

// GET BOOKINGS BY BRANCH AND DATE
router.get("/find/:branch/:date", bookingsController.getByBranchAndDate)

// GET BOOKING
router.get("/:id", bookingsController.getOne)

// CANCEL BOOKING
router.put("/:id", bookingsController.cancel)

// GET BOOKINGS BY USER
router.get("/user/:userId", bookingsController.getAllOfUser)

// GET BOOKINGS BY BRANCH
router.get("/branch/:branch", bookingsController.getAllOfBranch)

// SET ATTENDANCE
router.put("/attendance/:id", bookingsController.setAttendance)

// // UPDATE BOOKING
// router.put("/:id", validateBooking, bookingsController.update)

export default router;
