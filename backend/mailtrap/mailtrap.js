import { MailtrapClient } from "mailtrap";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailtemplate.js";
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailtemplate.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE } from "./emailtemplate.js";

export function sendverification(verificationToken) {
  const TOKEN = process.env.MAILTRAP;
  const client = new MailtrapClient({
    token: TOKEN,
  });

  const sender = {
    email: "hello@demomailtrap.co",
    name: "Mailtrap Test",
  };
  const recipients = [
    {
      email: "ayokunletestimony702@gmail.com",
    },
  ];

  client
    .send({
      from: sender,
      to: recipients,
      subject: "VERIFICATION CODE!",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Integration Test",
    })
    .then(console.log, console.error);
}

export function sendResetPasswordLink(resetUrl) {
  const TOKEN = process.env.MAILTRAP;
  const client = new MailtrapClient({
    token: TOKEN,
  });
  const request_url = process.env.REQUEST_URL || "http://localhost:5173"; 

  const sender = {
    email: "hello@demomailtrap.co",
    name: "Mailtrap Test",
  };
  const recipients = [
    {
      email: "ayokunletestimony702@gmail.com",
    },
  ];

  client
    .send({
      from: sender,
      to: recipients,
      subject: "RESET PASSWORD LINK",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", [request_url,resetUrl].join("/")),
      category: "Integration Test",
    })
    .then(console.log, console.error);
}

export function passwordResetSucces() {
  const TOKEN = process.env.MAILTRAP;
  const client = new MailtrapClient({
    token: TOKEN,
  });

  const sender = {
    email: "hello@demomailtrap.co",
    name: "Mailtrap Test",
  };
  const recipients = [
    {
      email: "ayokunletestimony702@gmail.com",
    },
  ];

  client
    .send({
      from: sender,
      to: recipients,
      subject: "RESET PASSWORD SUCCESSFUL",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Integration Test",
    })
    .then(console.log, console.error);
}
