import responseHelper from "../helpers/response.helper.js";
import passwordResetTokenModel from "../models/PasswordResetToken.js";
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
const signup = async ({ name, dni, email, password, role }) => {
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
  role ? (user.role = role) : null;
  user.setPassword(password);

  await user.save();

  return user;
};

// SIGNIN
const signin = async (email, password) => {
  const user = await userModel
    .findOne({ email })
    .select("name dni email phone password role branch salt id");

  if (!user) return responseHelper.badrequest(res, "El usuario no existe.");

  if (!user.validPassword(password))
    return responseHelper.badrequest(res, "La contraseña es incorrecta.");

  return user;
};

// FIND USER BY EMAIL
const findUserByEmail = async (email) => {
  const user = await userModel.findOne({ email });

  if (!user) return responseHelper.badrequest(res, "User does not exist");

  return user;
};

// VERIFY TOKEN
const verifyToken = async (token) => {
  const resetToken = await passwordResetTokenModel
    .findOne({ token: token })
    .exec();

  if (!resetToken) return responseHelper.badrequest(res, "Invalid token");

  return resetToken;
};

// RESET PASSWORD
const resetPassword = async (id, newPassword) => {
  const user = await userModel.findOne({ _id: id });

  if (!user) return responseHelper.badrequest(res, "User does not exist");

  user.setPassword(newPassword);

  await user.save();

  return user;
};

// DELETE TOKEN
const deleteToken = async (token) => {
  const resetToken = await passwordResetTokenModel.findOne({ token: token });

  await resetToken.deleteOne();
};

// UPDATE USER
const update = async (id, name, email, dni, phone) => {
  const user = await userModel.findById(id);

  if (!user) return responseHelper.notFound(res);

  user.name = name || user.name;
  user.email = email || user.email;
  user.dni = dni || user.dni;
  user.phone = phone || user.phone;

  return await user.save();
};

// CHANGE PASSWORD
const changePassword = async (currentPassword, newPassword, id) => {
  const user = await userModel.findById(id).select("password salt");

  if (!user) return responseHelper.badrequest(res, "El usuario no existe.");

  if (!user.validPassword(currentPassword, user.salt))
    return responseHelper.badrequest(res, "La contraseña es incorrecta.");

  user.setPassword(newPassword);

  await user.save();

  return user;
};

export default {
  admin,
  create,
  signin,
  signup,
  findUserByEmail,
  verifyToken,
  resetPassword,
  deleteToken,
  update,
  changePassword,
};
