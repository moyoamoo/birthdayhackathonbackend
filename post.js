const express = require("express");
const router = express.Router();
const connectMySQL = require("./mysql/driver");
const addBirthday = require("./mysql/queries");

router.post("/", async (req, res) => {
  let {
    userName,
    userEmail,
    emailFrequency,
    partnersName,
    bdayDate,
    products,
  } = req.body.formDetails;

  if (
    !userName ||
    !userEmail ||
    !emailFrequency ||
    !bdayDate ||
    !partnersName ||
    !products
  ) {
    res.send({ status: 0, reason: "Missing data" });
    return;
  }
  const birthday = formatBirthday(bdayDate);

  const productsStr = products.toString();

  try {
    const result = await connectMySQL(addBirthday, [
      userName,
      userEmail,
      emailFrequency,
      partnersName,
      birthday,
      productsStr,
    ]);
    res.send({ status: 1, reason: "information added", bdayDate });
  } catch (error) {
    res.send({ status: 0, reason: "duplicate user" });
    console.log(error);
  }
});

module.exports = router;
