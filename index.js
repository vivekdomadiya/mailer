const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const mailer = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

app.get("/", (req, res) => {
  res.send({ "/send-email": "POST - to send email" });
});

app.post("/send-email", async (req, res) => {
  if (!req.body.to) {
    return res.status(400).send({ error: "Recipients is required...!" });
  }
  try {
    const info = await mailer.sendMail(req.body);
    res.send("Email Sent");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.listen(
  process.env.PORT,
  console.log(`Server started port ${process.env.PORT}`)
);
