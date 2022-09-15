require("dotenv").config();
const express = require("express");
const connectToMongo = require("./database/connection");
const mainRoute = require("./routes/main");


const app = express();
const port = process.env.NODE_LOCAL_PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", mainRoute);

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Server listening on ${port}`);
    // connectToMongo();
  }
});

module.exports = app;
