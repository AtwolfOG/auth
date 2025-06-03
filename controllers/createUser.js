import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export default async function createUser(req, res) {
  try {
    const { email, username, password } = req.body;
    const userexist = await User.findOne({ $or: [{ email }, { username }] });
    if (userexist) {
      res.status(400).json({
        message: "user already exists",
      });
      return;
    }
    const verifytoken = 100000 + Math.floor(Math.random() * 100000);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });
    await newUser.save();
    res.status(200).json({
      message: "user created successfully",
      user: {
        ...newUser._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.error(err);
  }
}
