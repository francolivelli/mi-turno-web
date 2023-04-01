import jwt from "jsonwebtoken";
const SECRET = process.env.TOKEN_SECRET;

function generateToken(payload) {
  return jwt.sign({ user: payload }, SECRET, { expiresIn: "1d" });
}

function validateToken(token) {
  return jwt.verify(token, SECRET);
}

export { generateToken, validateToken };
