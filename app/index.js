const dotenv = require("dotenv");
dotenv.config();

const config = require("./config");
const express = require("express");
const morgan = require("morgan");

const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

const bookId = uuidv4();
const rating = [
  {
    id: uuidv4(),
    ratng: 5,
    books: bookId,
  },
];
const books = [
  {
    id: uuidv4(),
    title: "Storywallah",
    isbn: "0143445774",
  },
  {
    id: uuidv4(),
    title: "The Gold Crew",
    isbn: "0446512028",
  },
];

//get
app.get("/books", (req, res) => {
  res.send(books);
});

//port
app.listen(config.appPort, () => {
  console.log(`Server running in the port ${config.appPort}`);
});
