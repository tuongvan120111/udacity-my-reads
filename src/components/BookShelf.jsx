import React from "react";
import Book from "./Book";

export default function BookShelf({ books, title, onChangeAction }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => {
            return (
              <Book
                key={`${book.authors}_${index}`}
                onChangeAction={onChangeAction}
                bookInfo={book}
              ></Book>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
