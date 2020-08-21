const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 1000;
const GMAIL = "dvking781@gmail.com";
const GMAIL_PASS = "abc.12345678";

const app = express();
app.use(cors());
app.use(express.json());

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL,
    pass: GMAIL_PASS,
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

app.listen(PORT, console.log(`Server started port ${PORT}`));
