const { v4: uuidv4 } = require("uuid");
const isValidISBN = require("./validation");

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

const getAllBooks = () => books;

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

module.exports = {
  getAllBooks,
  addBook,
};
