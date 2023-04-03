import express from "express";
import usersRoutes from "./users.js";
import branchesRoutes from "./branches.js";

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/branches", branchesRoutes);

export default router;
