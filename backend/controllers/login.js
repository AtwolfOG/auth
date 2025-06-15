import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import generateTokenandCookie from "../utils/generateTokenandSetCookie.js";

export default async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        error: "Incorrect email ",
        message: "Invalid email",
      });
      return;
    }
    const confirmPassword = await bcrypt.compare(password, user.password);
    if (!confirmPassword) {
      res.status(403).json({
        error: "Incorrect password",
        message: "Incorrect password",
      });
    }
    generateTokenandCookie(res, user._id);
    res.status(200).json({
      message: "Login successful",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    // console.error(err);
    res.status(400).json({
      success: false,
      error: err.message || "Internal Server Error",
      message: "An error occurred during login",
    });
  }
}
