import React from "react";
import SelectItem from "./SelectItem";
import { update } from "../BooksAPI";
import dispatchLoading from "../util/loadingState";

export default function Book({ onChangeAction, bookInfo }) {
  const { authors, title, backgroundImage, id, shelf } = bookInfo;

  const handleChangeReadAction = (shelfChange) => {
    dispatchLoading.loadingAction({ isloading: true });

    update({ id }, shelfChange).finally(() => {
      dispatchLoading.loadingAction({ isloading: false });
      onChangeAction && onChangeAction();
    });
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 200,
              backgroundImage: `url(${backgroundImage})`,
            }}
          ></div>
          <SelectItem
            onChange={(value) => handleChangeReadAction(value)}
            shelf={shelf}
          ></SelectItem>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(", ")}</div>
      </div>
    </li>
  );
}
