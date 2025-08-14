import { useId } from "react";
import { SearchIcon } from "../icons";
import style from "./searchinput.module.css";

export const SearchInput = ({ value, onChange }) => {
  const inputId = useId();

  return (
    <div className={style.inputContainer}>
      <label htmlFor={inputId}>
        <SearchIcon className={style.searchIcon} />
      </label>
      <input
        type="text"
        id={inputId}
        className={style.input}
        placeholder="search..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
