import { check } from "express-validator";
import validate from "../helpers/request.helper.js";

// CREATE BRANCH
export const validateBranch = [
  check("name").isString().withMessage("Name is required"),
  check("email")
    .isEmail()
    .withMessage("A valid email is required")
    .normalizeEmail(),
  check("phone").isInt().withMessage("A valid phone number is required"),
  check("maxCapacity")
    .isInt({ min: 1, max: 10 })
    .withMessage("Maximum capacity should be between 1 and 10"),
  check("startTime").isString().withMessage("Start time is required"),
  check("endTime").isString().withMessage("End time is required"),
  (req, res, next) => {
    validate(req, res, next);
  },
];
