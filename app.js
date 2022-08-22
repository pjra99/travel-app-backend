const express = require("express");
const fs = require("fs");
const app = express();

const reviews = JSON.parse(fs.readFileSync(`${__dirname}/data/places-reviews`));
app.get("/reviews", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});
const port = 3000;
app.listen(port, () => {
  console.log("Aur paaji");
});
