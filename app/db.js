const { v4: uuidv4 } = require("uuid");
const isValidISBN = require("./validation");

const ratings = [];
const books = [
  {
    id: 1234,
    title: "Storywallah",
    isbn: "0143445774",
  },
  {
    id: 5678,
    title: "The Gold Crew",
    isbn: "0446512028",
  },
];

//get all books in the api
const getAllBooks = () => books;

//Adding new book
const addBook = ({ title, isbn }) => {
  const bookId = uuidv4();
  if (isValidISBN(isbn)) {
    const book = {
      bookId,
      title,
      isbn,
    };
    books.push(book);
    return book;
  } else console.log("Invalid ");
};

//add rating for the book
const addRating = ({ rating, bookId }) => {
  const rateId = uuidv4();
  const ratingIdx = ratings.findIndex((r) => r.bookId === id);
  if (ratingIdx != -1) return null;
  const bookRating = {
    rateId,
    rating,
    bookId,
  };
  ratings.push(bookRating);
  return bookRating;
};

//get a single book with rating
const getBook = ({ id }) => {
  const idx = books.findIndex((b) => b.id == id);
  if (idx === -1) {
    return null;
  }
  const book = books[idx];
  const ratingIdx = ratings.findIndex((r) => r.bookId === id);
  if (ratingIdx === -1) {
    let singleBook = { ...book, ratings: 0 };
    return singleBook;
  } else {
    const rate = ratings[ratingIdx].rating;
    let singleBook = { ...book, ratings: rate };
    return singleBook;
  }
};

//updating book title
const updateBookTitle = ({ id, title }) => {
  const idx = books.findIndex((b) => b.id == id);
  if (idx == -1) {
    return null;
  }

  title && (books[idx]["title"] = title);
  return books[idx];
};

module.exports = {
  getAllBooks,
  addBook,
  addRating,
  getBook,
  updateBookTitle,
};
