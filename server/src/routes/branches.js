import express from "express";
import branchesController from "../controllers/branches.js";
import { validateBranch } from "../validators/branches.js";

const router = express.Router();

// CREATE BRANCH
router.post("/create", validateBranch, branchesController.create)

export default router;
