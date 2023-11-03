const dotenv = require("dotenv");
dotenv.config();

const config = require("./config");
const express = require("express");
const morgan = require("morgan");

const { getAllBooks, addBook } = require("./db");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

//READ
app.get("/books", (req, res) => {
  res.send(getAllBooks());
});

//CREATE
app.post("/books", (req, res, next) => {
  if (!req.body.title || !req.body.isbn) {
    return next({ code: 400, message: "error" });
  }
  const book = addBook({
    title: req.body.title,
    isbn: req.body.isbn,
  });
  return res.json(book);
});

//PORT
app.listen(config.appPort, () => {
  console.log(`Server running in the port ${config.appPort}`);
});
