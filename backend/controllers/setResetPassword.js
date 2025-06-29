import { sendResetPasswordLink } from "../mailtrap/mailtrap.js";
import User from "../models/userSchema.js";
import crypto from "crypto";

export default async function setResetPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const resetUrl = crypto.randomBytes(20).toString("hex");
    const newpasswordtokenexp = Date.now() + 15 * 60 * 1000;
    user.passwordresettoken = resetUrl;
    user.passwordresettokenexp = newpasswordtokenexp;
    await user.save();
    sendResetPasswordLink(resetUrl,email);
    res.json({ resetUrl });
  } catch (error) {
    res.status(400).json({
        error: "User not found",
        message: "User not found",
      });
    console.error(error);
  }
}
