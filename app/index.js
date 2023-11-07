const dotenv = require("dotenv");
dotenv.config();

const config = require("./config");
const express = require("express");
const morgan = require("morgan");

const Joi = require("joi");
const {
  getAllBooks,
  addBook,
  addRating,
  getBook,
  updateBookTitle,
  deleteBook,
  updateRating,
  deleteRating,
  getRating,
  searchBook,
} = require("./db");

const { validate } = require("./middlewares/validate.middleware");
const { ratingSchema } = require("./validations/rating.schema");
const { bookSchema } = require("./validations/book.schema");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//READ
app.get("/books", (req, res) => {
  const books = getAllBooks();
  const searchedBook = searchBook(req.query.search);
  if (searchedBook) return res.json(searchedBook);
  res.send(books);
});

//CREATE
app.post("/books", validate(bookSchema), (req, res, next) => {
  const book = addBook({
    title: req.body.title,
    isbn: req.body.isbn,
  });
  if (!book) {
    next({ code: 400, message: "invalid isbn" });
  }
  return res.json(book);
});

//CREATE rating
app.post("/books/:id/rating", validate(ratingSchema), (req, res, next) => {
  const rating = addRating(req.xop.rating, req.params.id);

  if (!rating) {
    return next({
      status: 400,
      message: "rating is added already",
    });
  }
  return res.json(rating);
});

//READ - to get one book
app.get("/books/:id", (req, res, next) => {
  const book = getBook({ id: req.params.id });
  if (!book) {
    return next({
      status: 400,
      message: "Book not found",
    });
  }
  res.send(book);
});

//Update - the book title
app.put("/books/:id", (req, res, next) => {
  const book = updateBookTitle({ id: req.params.id, title: req.body.title });
  if (!book) {
    return next({
      status: 400,
      message: "book not found",
    });
  }
  res.send(book);
});

//DELETE - book
app.delete("/books/:id", (req, res, next) => {
  const book = deleteBook({ id: req.params.id });
  if (!book) {
    return next({
      status: 400,
      message: "book not found",
    });
  }
  res.send(book);
});

//update rating
app.put("/books/:id/rating", validate(ratingSchema), (req, res, next) => {
  const rating = updateRating(req.xop.rating, req.params.id);

  if (!rating) {
    return next({
      status: 400,
      message: "no rating found for the book",
    });
  }
  return res.json(rating);
});

//Get rating with book
app.get("/rating/:id", (req, res, next) => {
  const ratedBook = getRating({ id: req.params.id });
  if (!ratedBook) {
    return next({
      status: 400,
      message: "rating not found",
    });
  }
  res.send(ratedBook);
});

//DELETE -rating
app.delete("/rating/:id", (req, res, next) => {
  const rate = deleteRating({ id: req.params.id });
  if (!rate) {
    return next({
      status: 400,
      message: "rating not found",
    });
  }
  res.send(rate);
});

//errorHandler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || ["An unkown error"],
  });
});

//PORT
app.listen(config.appPort, () => {
  console.log(`Server running in the port ${config.appPort}`);
});
