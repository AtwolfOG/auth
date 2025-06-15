import User from "../models/userSchema.js";
import generateTokenandCookie from "../utils/generateTokenandSetCookie.js";

export default async function verifyEmail(req, res) {
  try {
    const { code } = req.body;
    const user = await User.findOne({ verificationtoken: code });
    if (!user) {
      res.status(401).json({
        message: "This is the wrong verification code",
      });
    }
    if (Date.now() > user.verificationtokenexp) {
      res.status(403).json({
        message: "This verification is no longer valid",
      });
    }
    user.verificationtoken = undefined;
    user.verificationtokenexp = undefined;
    user.isverified = true;
    await user.save();
    generateTokenandCookie(res, user._id);

    res.status(200).json({
      message: "Your email has been verified",
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
      message: "An error occurred during email verification",
    });
  }
}
