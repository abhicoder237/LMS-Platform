 import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    // 1. Get token from cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    // 2. Verify token
    const validToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!validToken) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    // 3. Attach userId to request
    req.userId = validToken.userId;

    next(); // Proceed to next middleware/route
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
      error: error.message,
    });
  }
};

export default isAuth;
