const express = require("express");
const router = express.Router();
const connectMySQL = require("./mysql/driver");
router.get("/", async (req, res) => {
  const getHourly = `SELECT * FROM users
                      WHERE email_frequency LIKE ?`;

  //hourly/daily/weekly

  try {
    const result = await connectMySQL(getHourly, ["hourly"]);
    res.send({ status: 1, result });
  } catch (e) {
    res.send({ status: 0, reason: "no hourly users" });
  }
});

module.exports = router;
