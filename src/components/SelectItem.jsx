import React, { useState } from "react";
import { SHELF_NAME, SHELF_VALUE } from "../constants";

const optionSelect = [
  { value: SHELF_VALUE.NONE, label: SHELF_NAME.MOVE_TO },
  { value: SHELF_VALUE.CURRENLY_READING, label: SHELF_NAME.CURRENLY_READING },
  { value: SHELF_VALUE.WANT_TO_READ, label: SHELF_NAME.WANT_TO_READ },
  { value: SHELF_VALUE.READ, label: SHELF_NAME.READ },
  { value: SHELF_VALUE.NONE, label: SHELF_NAME.NONE },
];

export default function SelectItem({ onChange, shelf }) {
  const [initShelf, setInitShelf] = useState(shelf || "");
  const handleChange = (el) => {
    onChange(el);
  };

  return (
    <div className="book-shelf-changer">
      <select
        onChange={(el) => handleChange(el.target.value)}
        value={initShelf}
      >
        {optionSelect.map((option, index) => {
          return (
            <option value={option.value} key={index}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
