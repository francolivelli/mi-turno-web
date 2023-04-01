import responseHelper from "../helpers/response.helper.js";
import userService from "../services/user.js";
import { generateToken } from "../helpers/token.helper.js";

// CREATE ADMIN
const admin = async (req, res) => {
  try {
    const { name, dni, email, password } = req.body;

    const admin = await userService.admin({ name, dni, email, password });

    responseHelper.created(res, {
      ...admin._doc,
      id: admin.id,
    });
  } catch {
    responseHelper.error(res);
  }
};

// CREATE USER / OPERATOR
const create = async (req, res) => {
  try {
    const { name, dni, email, password, branch } = req.body;

    const user = await userService.create({
      name,
      dni,
      email,
      password,
      branch,
    });

    responseHelper.created(res, {
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHelper.error(res);
  }
};

// SIGNUP
const signup = async (req, res) => {
  try {
    const { name, dni, email, password } = req.body;

    const user = await userService.signup({ name, dni, email, password });

    const token = generateToken(user);

    user.password = undefined;
    user.salt = undefined;

    res.cookie("token", token);
    responseHelper.created(res, {
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHelper.error(res);
  }
};

// SIGNIN
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.signin(email, password);

    const token = generateToken(user);

    user.password = undefined;
    user.salt = undefined;

    res.cookie("token", token);
    responseHelper.created(res, {
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHelper.error(res);
  }
};

export default { admin, create, signup, signin };
