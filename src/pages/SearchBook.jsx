import React, { useEffect, useState } from "react";
import { search } from "../BooksAPI";
import { Link } from "react-router-dom";
import Book from "../components/Book";
import { convertBookArray } from "../util/convertBook";

export default function SearchBook() {
  const [bookSearch, setBookSearch] = useState([]);

  const [inputValue, setInputValue] = useState();
  const [debouncedInputValue, setDebouncedInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  useEffect(() => {
    if (!inputValue) {
      if (bookSearch && bookSearch.length) {
        setBookSearch([]);
      }
      return;
    }

    search(inputValue).then((result) => {
      const books = convertBookArray(result);
      setBookSearch(books);
    });
  }, [debouncedInputValue]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={"/my-read"}>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {bookSearch.map((book) => {
            return <Book key={book.id} bookInfo={book}></Book>;
          })}
        </ol>
      </div>
    </div>
  );
}
