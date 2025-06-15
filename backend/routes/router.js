import express from "express";
import createUser from "../controllers/createUser.js";
import verifyEmail from "../controllers/verifyEmail.js";
import login from "../controllers/login.js";
import checkAuth from "../controllers/checkAuth.js";
import verifyAuth from "../controllers/verifyAuth.js";
import setResetPassword from "../controllers/setResetPassword.js";
import resetPassword from "../controllers/resetPassword.js";
import logout from "../controllers/logout.js";
import resetVerificationToken from "../controllers/resetverificationtoken.js";

const apiRouter = express.Router();

apiRouter
  .post("/signup", createUser)
  .post("/verify-email", verifyEmail)
  .post("/login", login)
  .get("/check-auth", [checkAuth, verifyAuth])
  .post("/reset-password", setResetPassword)
  .post("/reset-password/:token", resetPassword)
  .post("/logout", logout)
  .post("/reset-verification-token", resetVerificationToken);

export default apiRouter;
