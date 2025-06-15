import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export default async function resetPassword(req, res) {
  try {
    const { token } = req.params;
    const user = await User.findOne({ passwordresettoken: token });
    if (!user) {
      res.status(400).json({error:"Invalid token", message: "Invalid token" });
    }
    if (Date.now() > user.passwordresettokenexp) {
      res.status(403).json({ error: "Expired token",message: "Expired token" });
    }
    const newPassword = req.body.password;
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    user.passwordresettoken = undefined;
    user.passwordresettokenexp = undefined;
    await user.save();

    res.status(200).json({
      message: "Password successfully changed",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    // console.error(error);
    res.status(400).json({
      success: false,
      error: error.message || "Internal Server Error",
      message: "An error occurred while resetting the password",
    });
  }
}
