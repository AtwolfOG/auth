import { sendverification } from "../mailtrap/mailtrap.js";
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export default async function createUser(req, res) {
  try {
    const { email, username, password } = req.body;
    const userexist = await User.findOne({ $or: [{ email }, { username }] });
    if (userexist) {
      throw new Error(
        "User with this email or username already exists"
      );
    }
    const verificationtoken = String(
      100000 + Math.floor(Math.random() * 100000)
    );
    const verificationtokenexp = Date.now() + 1 * 60 * 1000;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      verificationtoken,
      verificationtokenexp,
    });
    await newUser.save();
    sendverification(verificationtoken);

    res.status(200).json({
      message: "user created successfully",
      user: {
        ...newUser._doc,
        password: undefined,
        verificationtoken: undefined,
        verificationtokenexp: undefined,
      },
    });
  } catch (err) {
    // console.error(err);
    res.status(400).json({
        sucess: false,
        error: "user already exists",
        message: "user already exists",
      });
    // process.exit(1);
  }
}
