import { MailtrapClient } from "mailtrap";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailtemplate.js";
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailtemplate.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE } from "./emailtemplate.js";
import nodemailer from "nodemailer";

const sender = process.env.SENDER_EMAIL;
const password = process.env.APP_PASSWORD;

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: sender,
    pass: password,
  },
});

// Wrap in an async IIFE so we can use await.
// (async () => {
//   const info = await transporter.sendMail({
//     from: "nodemailer test",
//     to: ["ayokunletestimony702@gmail.com"],
//     subject: "Hello ✔",
//     text: "Hello world?", // plain‑text body
//     html: "<b>Hello world?</b>", // HTML body
//   });

//   console.log("Message sent:", info.messageId);
// })();

export async function sendverification(verificationToken, email) {
  await transporter.sendMail({
    from: "nodemailer test",
    to: [email],
    subject: "VERIFICATION CODE!",
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    ), // HTML body
  });
}

export async function sendResetPasswordLink(resetUrl, email) {
  const request_url = process.env.REQUEST_URL || "http://localhost:5173";

  await transporter.sendMail({
    from: "nodemailer test",
    to: [email],
    subject: "RESET PASSWORD LINK",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{resetURL}",
      [request_url, resetUrl].join("/")
    ),
    // HTML body
  });
}

export async function passwordResetSucces() {
  await transporter.sendMail({
    from: "nodemailer test",
    to: [email],
    subject: "RESET PASSWORD SUCCESSFUL",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    // HTML body
  });

  
}
