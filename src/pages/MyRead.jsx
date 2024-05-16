import React, { useEffect, useState } from "react";
import BookShelf from "../components/BookShelf";
import { Link } from "react-router-dom";
import { getAll } from "../BooksAPI";
import { SHELF_VALUE } from "../constants";
import { convertBookArray } from "../util/convertBook";
import dispatchLoading from "../util/loadingState";

export default function MyRead() {
  const [books, setBooks] = useState({
    wantToRead: [],
    currentlyReading: [],
    read: [],
  });

  const loadBooks = () => {
    dispatchLoading.loadingAction({ isloading: true });
    getAll()
      .then((result) => {
        const books = convertBookArray(result);
        const currentlyReading = books.filter(
          (item) => item.shelf === SHELF_VALUE.CURRENLY_READING
        );
        const read = books.filter((item) => item.shelf === SHELF_VALUE.READ);
        const wantToRead = books.filter(
          (item) => item.shelf === SHELF_VALUE.WANT_TO_READ
        );

        setBooks({ currentlyReading, read, wantToRead });
      })
      .finally(() => {
        dispatchLoading.loadingAction({ isloading: false });
      });
  };

  useEffect(() => {
    dispatchLoading.loadingAction({ isloading: true });

    loadBooks();
  }, []);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            books={books.currentlyReading}
            title={"Currently Reading"}
            onChangeAction={loadBooks}
          />
          <BookShelf
            books={books.wantToRead}
            title={"Want to Read"}
            onChangeAction={loadBooks}
          />
          <BookShelf
            books={books.read}
            title={"Read"}
            onChangeAction={loadBooks}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to={"/search-book"} />
      </div>
    </div>
  );
}
