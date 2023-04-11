import express from "express";
import branchesController from "../controllers/branches.js";
import { validateBranch } from "../validators/branches.js";

const router = express.Router();

// CREATE BRANCH
router.post("/create", validateBranch, branchesController.create)

// GET BRANCHES
router.get("/", branchesController.getAll)

// GET BRANCH
router.get("/:id", branchesController.getOne)

// UPDATE BRANCH
router.put("/update/:id", validateBranch, branchesController.update)

export default router;
