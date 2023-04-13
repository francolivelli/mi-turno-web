import express from "express";
import usersController from "../controllers/users.js";
import {
  validateSignup,
  validateSignin,
  validatePassword,
  validateUpdate,
} from "../validators/users.js";

const router = express.Router();

// CREATE ADMIN
router.post("/admin", validateSignup, usersController.admin);

// CREATE USER / OPERATOR
router.post("/create", validateSignup, usersController.create);

// SIGNUP
router.post("/signup", validateSignup, usersController.signup);

// SIGNIN
router.post("/signin", validateSignin, usersController.signin);

// SIGNOUT
router.post("/signout", usersController.signout);

//FORGOT PASSWORD
router.post("/forgot-password", usersController.forgotPassword);

// FIND USER BY EMAIL
router.get("/:email", usersController.findUserByEmail);

//VERIFY TOKEN
router.get("/verifyToken/:token", usersController.verifyToken);

// RESET PASSWORD
router.post("/reset-password", validatePassword, usersController.resetPassword);

// UPDATE USER
router.put("/update/:id", validateUpdate, usersController.update);

// CHANGE PASSWORD
router.post("/change-password", usersController.changePassword);

// GET OPERATORS
router.get("/", usersController.getOperators);

// GET OPERATOR
router.get("/operator/:id", usersController.getOperator);

export default router;
