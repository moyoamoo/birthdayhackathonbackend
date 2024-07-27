const express = require("express");
const router = express.Router();
const connectMySQL = require("./mysql/driver");
router.post("/", async (req, res) => {
  let { userName, userEmail, emailFrequency, partnerName, bdayDate, products } =
    req.body;
});

if (
  !userName ||
  !userEmail ||
  !emailFrequency ||
  !bdayDate ||
  !partnerName ||
  !products
) {
  res.send({ status: 0, reason: "Missing data" });
  return;
}

const addBirthday = `INSERT INTO birthday_hackathon
                        (username, email, email_frequency, partner_name, birthday)
                          values
                            (?, ?, ?, ?, ?)`;

try {
  const result = await connectMySQL(addBirthday, [
    userName,
    userEmail,
    emailFrequency,
    partnerName,
    bdayDate,
  ]);
  res.send({ status: 1, reason: "information added" });
  console.log(result);
} catch (e) {
  res.send({ status: 0, reason: "duplicate user" });
}
