import express from "express";
import userController from "../controllers/user.js";
import { validateSignup, validateSignin } from "../validators/user.js";

const router = express.Router();

// CREATE ADMIN
router.post("/admin", validateSignup, userController.admin);

// CREATE USER / OPERATOR
router.post("/create", validateSignup, userController.create);

// SIGNUP
router.post("/signup", validateSignup, userController.signup);

// SIGNIN
router.post("/signin", validateSignin, userController.signin);

// SIGNOUT
router.post("/signout", userController.signout);

export default router;
