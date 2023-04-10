import express from "express";
import userController from "../controllers/user.js";
import {
  validateSignup,
  validateSignin,
  validatePassword,
  validateUpdate,
} from "../validators/user.js";

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

//FORGOT PASSWORD
router.post("/forgot-password", userController.forgotPassword);

// FIND USER BY EMAIL
router.get("/:email", userController.findUserByEmail);

//VERIFY TOKEN
router.get("/verifyToken/:token", userController.verifyToken);

// RESET PASSWORD
router.post("/reset-password", validatePassword, userController.resetPassword);

// UPDATE USER
router.put("/update/:id", validateUpdate, userController.updateUser);

// CHANGE PASSWORD
router.post("/change-password", userController.changePassword)

export default router;
