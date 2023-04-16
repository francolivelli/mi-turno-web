import express from "express";
import usersRoutes from "./users.js";
import branchesRoutes from "./branches.js";
import bookingsRoutes from "./bookings.js";

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/branches", branchesRoutes);
router.use("/bookings", bookingsRoutes);

export default router;
