import jwt from "jsonwebtoken";

export const signAccessToken = (payload, expiresIn = "30m") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
