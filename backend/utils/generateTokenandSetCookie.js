import jwt from "jsonwebtoken";

export default function generateTokenandCookie(res, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 1000,
  });
}
