import jwt from "jsonwebtoken";
export default function checkAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(403).json({error: "User not logged in" , message: "User not logged in" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(401).json({ error: "Invalid token",message: "Invalid token" });
    }
    req.token = decoded;
    next();
  } catch (err) {
    // console.error(err);
    res.status(400).json({
      success: false,
      error: err.message || "Internal Server Error",
      message: "An error occurred during authentication",
    });
  }
}
