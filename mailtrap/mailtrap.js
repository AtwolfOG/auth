import { MailtrapClient } from "mailtrap";
import { configDotenv } from "dotenv";
const TOKEN = "5be6eb2775c8a5e22a13f5924585c6bd";
export default function sendverification(verificationToken) {
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
      subject: "You are awesome!",
      text: verificationToken,
      category: "Integration Test",
    })
    .then(console.log, console.error);
}
sendverification("123233");
