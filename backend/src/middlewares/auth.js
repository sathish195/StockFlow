require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // No header
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided",
      });
    }

    // Format: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    // Invalid format
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    // ✅ Verify token (handles expiry automatically)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user
    req.user = decoded;

    next();

  } catch (err) {
    // Handle different JWT errors
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again",
      });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

module.exports = authMiddleware;