const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASS,
  },
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
