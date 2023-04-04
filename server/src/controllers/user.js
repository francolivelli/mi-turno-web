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

    user.password = undefined;
    user.salt = undefined;

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

    const cookieOptions = {
      expires: new Date(Date.now() + 6 * 60 * 60 * 1000), // Establece la fecha de caducidad a 6 horas a partir de la fecha actual
      httpOnly: true, // Establece la cookie como HTTP only para evitar ataques XSS
      sameSite: "strict", // Establece el atributo SameSite para prevenir ataques CSRF
    };

    res.cookie("token", token, cookieOptions);
    responseHelper.created(res, {
      user: { ...user._doc, id: user.id },
    });
  } catch {
    responseHelper.error(res);
  }
};

// SIGNOUT
const signout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

export default { admin, create, signup, signin,signout };
