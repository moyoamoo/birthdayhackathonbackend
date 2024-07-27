const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const exec = require("child_process").exec;
const cron = require("node-cron");
const connectMySQL = require("./mysql/driver");

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/products", require("./products"));
app.use("/add_birthday", require("./post"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

//hourly cron job
// cron.schedule("* * * * *", async () => {
//   const getHourly = `SELECT * FROM users
//                       WHERE email_frequency LIKE ?`;
//   try {
//     const result = await connectMySQL(getHourly, ["hourly"]);
//     result.map((email) => {
//       sendEmail(htmlEmail, sender, email.email);
//     });
//   } catch (e) {
//     console.log("no hourly users");
//     console.log(e);
//   }
// });

// //daily cron job

// cron.schedule("0 0 * * *", async () => {
//   const getHourly = `SELECT * FROM users
//                       WHERE email_frequency LIKE ?`;
//   try {
//     const result = await connectMySQL(getHourly, ["daily"]);
//     console.log(result);
//   } catch (e) {
//     console.log("no daily users");
//   }
// });

// //weekly cron job
// cron.schedule("0 0 * * 0", async () => {
//   const getHourly = `SELECT * FROM users
//                       WHERE email_frequency LIKE ?`;
//   try {
//     const result = await connectMySQL(getHourly, ["weekly"]);
//     console.log(result);
//   } catch (e) {
//     console.log("no weekly users");
//   }
// });
//hello
