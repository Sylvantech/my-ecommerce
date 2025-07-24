const express = require("express");
const app = express();
const port = 3000;
const jwt = require("../utils/jwtUtils");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on http://localhost:${port}`);
});
