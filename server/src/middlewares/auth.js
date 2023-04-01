import { validateToken } from "../helpers/token.helper.js";
import unauthorized  from "../helpers/response.helper.js";

export function validateAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return unauthorized(res);

  const { user } = validateToken(token);
  if (!user) return unauthorized(res);

  req.user = user;
  next();
}

export function validateAdmin(req, res, next) {
  validateAuth(req, res, next);
  console.log(req.user)
  if (req.user !== "admin") return unauthorized(res);
  next();
}

export function validateOperator(req, res, next) {
  validateAuth(req, res, next);
  if (req.user !== "operator") return unauthorized(res);
  next();
}

export function validateClient(req, res, next) {
  validateAuth(req, res, next);
  if (req.user !== "client") return unauthorized(res);
  next();
}
