const express = require("express"); //import express to file
const cors = require("cors");
const app = express(); //application settings

app.use(cors());


app.use(express.json());

const port = process.env.PORT || 3000;

// DB Connection
const conn = require("./db/conn");

conn();

// Routes
const Routes = require("./routes/router");

app.use("/api-full", Routes);

app.listen(3000, function () {
  console.log("Servidor Oline!!"); //start server
});
