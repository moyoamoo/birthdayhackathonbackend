const nodemailer = require("nodemailer");

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

function sendEmail(payload, sender, to) {
  const mailOptions = {
    from: `help@podlaunch.co.uk`,
    to: to,
    subject: payload.subject,
    html: payload.content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log(error, info);
  });
}

module.exports = { sendEmail, transporter };
