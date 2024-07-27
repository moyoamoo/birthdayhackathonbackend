const express = require("express");
const router = express.Router();

function filterData(categories, data) {
  return data.filter((item) => categories.includes(item.category));
}

router.post("/", (req, res) => {
  // req.body.categories = ["perfumeWomen", "flowers", "jewelsry"];

  console.log("you get here", req.body);

  try {
    newData = require("./fakeApi.json");
  } catch (error) {
    console.error("Error loading data:", error);
    return res.status(500).send({ status: 0, message: "Error loading data" });
  }

  // Filter data based on the categories in req.body.categories
  const filteredData = filterData(req.body.categories, newData);

  console.log("you get here", filteredData);

  // Send the filtered data as a response
  res.send({ status: 1, data: filteredData });
});

module.exports = router;
