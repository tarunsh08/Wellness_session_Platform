import { verifyToken } from "../utils/jwt.js";

export const requireAuth = (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ error: "Missing token" });
    }

    const decoded = verifyToken(token);
    
    if (!decoded.id) {
      return res.status(401).json({ error: "Invalid token format" });
    }
    
    // We only store the user ID in the token, so we'll need to fetch the full user
    // from the database if we need email/name
    req.user = { _id: decoded.id };
    next();
  } catch (e) {
    console.error('Auth error:', e.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
