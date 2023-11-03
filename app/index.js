const dotenv = require("dotenv");
dotenv.config();

const config = require("./config");
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const rating = [
  {
    id: "b1",
    ratng: 5,
    books: 1, //how to implete that uuid here
  },
];
const books = [
  {
    id: 1, // anna, here we will use the uuid
    title: "Storywallah",
    rating: rating,
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
