import express from "express";
import BranchController from "../controllers/branch.js";

const router = express.Router();

router.get("/", BranchController.getAll);
router.get("/:id", BranchController.getById);
router.post("/", BranchController.create);
router.put("/:id", BranchController.update);

export default router;
