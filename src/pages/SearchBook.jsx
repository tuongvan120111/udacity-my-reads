import React, { useEffect, useState } from "react";
import { getAll, search } from "../BooksAPI";
import { Link } from "react-router-dom";
import Book from "../components/Book";
import { convertBookArray, convertBookCategorized } from "../util/convertBook";
import dispatchLoading from "../util/loadingState";

export default function SearchBook() {
  const [bookSearch, setBookSearch] = useState([]);
  const [bookShelf, setBookShelf] = useState([]);

  const [inputValue, setInputValue] = useState();
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const getBookShelf = async () => {
    const bookShelf = await getAll();
    const bookCategorized = convertBookCategorized(bookShelf);
    setBookShelf(bookCategorized);
  };

  useEffect(() => {
    getBookShelf();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue, 500]);

  useEffect(() => {
    if (!inputValue) {
      if (bookSearch && bookSearch.length) {
        setBookSearch([]);
      }
      setIsEmpty(false);
      return;
    }

    searchBook();
  }, [debouncedInputValue]);

  const searchBook = async () => {
    dispatchLoading.loadingAction({ isloading: true });

    search(inputValue)
      .then((searchResult) => {
        const bookSearch = convertBookArray(searchResult);
        let bookSearchCategorized = convertBookCategorized(searchResult);

        const sameItem = bookShelf.filter((element) =>
          bookSearchCategorized.some((el) => element.id === el.id)
        );

        bookSearch.forEach((book) => {
          const sameBook = sameItem.find((item) => book.id === item.id);
          if (sameBook) {
            book.shelf = sameBook.shelf;
          }
        });

        setBookSearch(bookSearch);
        setIsEmpty(!bookSearch.length);
      })
      .finally(() => {
        dispatchLoading.loadingAction({ isloading: false });
      });
  };

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
          {bookSearch?.map((book) => {
            return <Book key={book.id} bookInfo={book}></Book>;
          })}
        </ol>

        {isEmpty && <div className="no-result">Opps! Book Not Be Found!!!</div>}
      </div>
    </div>
  );
}
