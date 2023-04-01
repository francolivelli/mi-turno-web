import express from "express";
import userRoutes from "./user.js";
import branchRoutes from "./branch.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/branch", branchRoutes);

export default router;
