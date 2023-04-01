import responseHelper from "../helpers/response.helper.js";
import userModel from "../models/User.js";

// CREATE ADMIN
const admin = async ({ name, dni, email, password }) => {
  const checkDni = await userModel.findOne({ dni });

  if (checkDni)
    return responseHelper.badrequest(
      res,
      "This person already has an account."
    );

  const checkEmail = await userModel.findOne({ email });

  if (checkEmail)
    return responseHelper.badrequest(res, "This email is already registered.");

  const admin = new userModel();

  admin.name = name;
  admin.dni = dni;
  admin.email = email;
  admin.setPassword(password);
  admin.role = "admin";

  await admin.save();

  return admin;
};

// CREATE USER / OPERATOR
const create = async ({ name, dni, email, password, branch }) => {
  const checkDni = await userModel.findOne({ dni });

  if (checkDni)
    return responseHelper.badrequest(
      res,
      "This person already has an account."
    );

  const checkEmail = await userModel.findOne({ email });

  if (checkEmail)
    return responseHelper.badrequest(res, "This email is already registered.");

  const user = new userModel();

  user.name = name;
  user.dni = dni;
  user.email = email;
  user.setPassword(password);
  branch ? ((user.branch = branch), (user.role = "operator")) : null;

  await user.save();

  return user;
};

// SIGNUP
const signup = async ({ name, dni, email, password }) => {
  const checkDni = await userModel.findOne({ dni });

  if (checkDni)
    return responseHelper.badrequest(
      res,
      "This person already has an account."
    );

  const checkEmail = await userModel.findOne({ email });

  if (checkEmail)
    return responseHelper.badrequest(res, "This email is already registered.");

  const user = new userModel();

  user.name = name;
  user.dni = dni;
  user.email = email;
  user.setPassword(password);

  await user.save();

  return user;
};

// SIGNIN
const signin = async (email, password) => {
  const user = await userModel
    .findOne({ email })
    .select("name dni email password role branch salt id");

  if (!user) return responseHelper.badrequest(res, "User not exist");

  if (!user.validPassword(password))
    return responseHelper.badrequest(res, "Wrong password");

  return user;
};

export default { admin, create, signin, signup };
