const express = require("express");
const router = express.Router();
const connectMySQL = require("./mysql/driver");

router.post("/", async (req, res) => {
  let { userName, userEmail, emailFrequency, partnersName, bdayDate, products } =
    req.body.formDetails;

    console.log("i ran")
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



  const newDate = new Date(bdayDate * 1000);
  const bdayYear = newDate.getFullYear();
  const bdayMonth = newDate.getMonth() + 1;
  const bdayDay = newDate.getDate();
  const birthday = bdayYear + "-" + bdayMonth + "-" + bdayDay;

  const addBirthday = `INSERT INTO users
          (username, email, email_frequency, partner_name, birthday, product_interests)
            values
              (?, ?, ?, ?, ?, ?)`;

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
    res.send({ status: 1, reason: "information added", bdayDate});
    console.log(result);
    console.log("i ran")
  } catch (error) {
    res.send({ status: 0, reason: "duplicate user" });
    console.log(error);
  }
});

module.exports = router;
