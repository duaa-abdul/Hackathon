import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ success: false, message: "Token not provided!" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // decoded._id ho sakta hai ya decoded.id, dono check karo
      const userId = decoded._id || decoded.id;

      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res.status(401).json({ success: false, message: "User not found!" });
      }

      req.user = user;
      next();
    } else {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ success: false, message: "Invalid / Expired token!" });
  }
};
