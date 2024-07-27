const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let {
    username,
    email,
    partnerName,
    emailFrequency,
    birthday,
    productInterests,
  } = req.body;
});
if (
  !email ||
  !partnerName ||
  !emailFrequency ||
  !birthday ||
  !productInterests
) {
  res.send({ status: 0, reason: "Missing data" });
}
