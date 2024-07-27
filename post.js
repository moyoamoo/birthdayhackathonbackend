const express = require("express");
const router = express.Router();
const connectMySQL = require("./mysql/driver");
router.post("/", async (req, res) => {
  let { userName, userEmail, emailFrequency, partnerName, bdayDate, products } =
    req.body;
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
  const newDate = new Date(bdayDate * 1000);
  const bdayYear = newDate.getFullYear();
  const bdayMonth = newDate.getMonth() + 1;
  const bdayDay = newDate.getDate();
  const birthday = bdayYear + "-" + bdayMonth + "-" + bdayDay;

  const addBirthday = `INSERT INTO users
(username, email, email_frequency, partner_name, birthday)
  values
    (?, ?, ?, ?, ?)`;

  try {
    const result = await connectMySQL(addBirthday, [
      userName,
      userEmail,
      emailFrequency,
      partnerName,
      birthday,
    ]);
    res.send({ status: 1, reason: "information added" });
    console.log(result);
  } catch (error) {
    res.send({ status: 0, reason: "duplicate user" });
    console.log(error);
  }
});

module.exports = router;
