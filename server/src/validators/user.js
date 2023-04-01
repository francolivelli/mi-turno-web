import { check } from "express-validator";
import validate from "../helpers/request.helper.js";

// SIGNUP
export const validateSignup = [
  check("name")
    .exists()
    .withMessage("A name is required.")
    .custom((value, { req }) => {
      const array = value.split(" ");
      if (array.length < 2) {
        throw new Error("Please, include your name and your lastname.");
      } else {
        return true;
      }
    }),
  check("dni")
    .exists()
    .isNumeric()
    .isLength({ min: 8 })
    .withMessage("DNI must have at least 8 digits."),
  check("email")
    .exists()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("A valid email is required."),
  check("password")
    .exists()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 characters.")
    .custom((value, { req }) => {
      let character = "";
      let numbers = 0;
      let upperletters = 0;
      let lowerletters = 0;
      for (let i = 0; i <= value.length - 1; i++) {
        character = value.charAt(i);
        if (!isNaN(character * 1)) {
          numbers++;
        } else {
          if (character === character.toUpperCase()) {
            upperletters++;
          }
          if (character === character.toLowerCase()) {
            lowerletters++;
          }
        }
      }
      if (numbers === 0 || upperletters === 0 || lowerletters === 0) {
        throw new Error(
          "Password must include at least one number, one uppercase letter and one lowercase letter."
        );
      } else {
        return true;
      }
    }),
  check("confirmPassword")
    .exists()
    .withMessage("Password confirmation is required.")
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 characters.")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Password confirmation does not match.");
      return true;
    }),
  (req, res, next) => {
    validate(req, res, next);
  },
];

// SIGNIN
export const validateSignin = [
  check("email")
    .exists()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("A valid email is required."),
  check("password")
    .exists()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 characters.")
    .custom((value, { req }) => {
      let character = "";
      let numbers = 0;
      let upperletters = 0;
      let lowerletters = 0;
      for (let i = 0; i <= value.length - 1; i++) {
        character = value.charAt(i);
        if (!isNaN(character * 1)) {
          numbers++;
        } else {
          if (character === character.toUpperCase()) {
            upperletters++;
          }
          if (character === character.toLowerCase()) {
            lowerletters++;
          }
        }
      }
      if (numbers === 0 || upperletters === 0 || lowerletters === 0) {
        throw new Error(
          "Password must include at least one number, one uppercase letter and one lowercase letter."
        );
      } else {
        return true;
      }
    }),
  (req, res, next) => {
    validate(req, res, next);
  },
];
