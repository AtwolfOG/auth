import User from "../models/userSchema.js";

export default async function verifyAuth(req, res) {
  try {
    const token = req.token;
    console.log(token);
    const user = await User.findById(token.userId).select("-password");
    console.log(user);
    res.status(200).json({
      message: "User verified",
      user: {
        ...user._doc,
      },
    });
  } catch (error) {
    // console.error(error);
    res.status(400).json({
      success: false,
      error: error.message || "Internal Server Error",
      message: "An error occurred during verification",
    });
  }
}
