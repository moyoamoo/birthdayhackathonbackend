const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const exec = require("child_process").exec;

app.use(cors());
app.use(express.json());

app.use(helmet());

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

//hello
