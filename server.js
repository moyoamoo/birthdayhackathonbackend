const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const exec = require("child_process").exec;
const cron = require("node-cron");
require("dotenv").config();
const connectMySQL = require("./mysql/driver");
const nodemailer = require("nodemailer");
const getEmailDetails = require("./mysql/queries")
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/products", require("./products"));
app.use("/add_birthday", require("./post"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

const transporter = nodemailer.createTransport({
  host: `mail.podlaunch.co.uk`,
  tls: { rejectUnauthorized: false }, 
  port: 587,
  secure: true, 
  auth: {
    user: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendEmail(userEmail, partner_name, birthday) {
  const mailOptions = {
    from: `help@podlaunch.co.uk`,
    to: userEmail,
    subject: "Birthday Remineder",
    html: `<h1>Email Reminder</h1>
                <p>Just reminding you that it is ${partner_name}'s birthday on ${birthday}<p/>`,
  };

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      console.log(error, info);
    });
  } catch (error) {
    console.log(error);
  }
}

//hourly cron job
cron.schedule("* * * * *", async () => {
  const getHourly = `SELECT * FROM users
                      WHERE email_frequency LIKE ?`;
  try {
    const result = await connectMySQL(getEmailDetails, ["hourly"]);
    result.map((email) => {
      sendEmail(email.email, email.partner_name, email.birthday);
    });
  } catch (e) {
    console.log("no hourly users");
  }
});

//daily cron job
cron.schedule("0 0 * * *", async () => {
  try {
    const result = await connectMySQL(getEmailDetails, ["daily"]);
    result.map((email) => {
      sendEmail(email.email, email.partner_name, email.birthday);
    });
  } catch (e) {
    console.log("no daily users");
  }
});

//weekly cron job
cron.schedule("0 0 * * 0", async () => {
  try {
    const result = await connectMySQL(getEmailDetails, ["weekly"]);
    result.map((email) => {
      sendEmail(email.email, email.partner_name, email.birthday);
    });
  } catch (e) {
    console.log("no weekly users");
  }
});
