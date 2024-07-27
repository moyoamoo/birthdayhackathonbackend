const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const exec = require("child_process").exec;
const cron = require("node-cron");
const connectMySQL = require("./mysql/driver");
const { render } = require("@react-email/components");
const nodemailer = require("nodemailer");
const { BirthdayReminderEmail } = require("./emails/birthday-template");

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
  tls: { rejectUnauthorized: false }, //turns security of as cheap server
  port: 465,
  secure: true, //allow use of port 587 must be true if port 465
  auth: {
    // user: "mail.podlaunch.co.uk",
    // pass: "&T)pdp*^,A_[",
    user: process.env.EMAIL_HOST,
    password: process.env.EMAIL_PASSWORD,
  },
});

const emailHTML = render(BirthdayReminderEmail({ url: "https://example.com" }));

function sendEmail(userEmail) {
  const mailOptions = {
    from: `help@podlaunch.co.uk`,
    to: userEmail,
    subject: "Birthday Reminder",
    html: emailHTML,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log(error, info);
  });
}

module.exports = { sendEmail, transporter };

//hourly cron job
cron.schedule("* * * * *", async () => {
  const getHourly = `SELECT * FROM users
                      WHERE email_frequency LIKE ?`;
  try {
    const result = await connectMySQL(getHourly, ["hourly"]);
    result.map((email) => {
      sendEmail(email.email);
    });
  } catch (e) {
    console.log("no hourly users");
    console.log(e);
  }
});

//daily cron job

cron.schedule("0 0 * * *", async () => {
  const getHourly = `SELECT * FROM users
                      WHERE email_frequency LIKE ?`;
  try {
    const result = await connectMySQL(getHourly, ["daily"]);
    console.log(result);
  } catch (e) {
    console.log("no daily users");
  }
});

//weekly cron job
cron.schedule("0 0 * * 0", async () => {
  const getHourly = `SELECT * FROM users
                      WHERE email_frequency LIKE ?`;
  try {
    const result = await connectMySQL(getHourly, ["weekly"]);
    console.log(result);
  } catch (e) {
    console.log("no weekly users");
  }
});
