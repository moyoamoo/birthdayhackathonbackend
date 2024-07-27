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

const emailHTML = render(Email({ url: "https://example.com" }));


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
