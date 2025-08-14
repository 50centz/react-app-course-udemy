import { useEffect, useMemo, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { API_URL } from "../../constants";
import { useFetch } from "../../hooks/useFetch.js";
import { SearchInput } from "../../components/SearchInput";
import style from "./homepage.module.css";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");

  // const inputRef = useRef()

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();

    setQuestions(questions);

    return questions;
  });

  const cards = useMemo(() => {
    return questions.filter((e) =>
      e.question.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
  }, [questions, searchValue]);

  useEffect(() => {
    getQuestions(`react?${sortSelectValue}`);
  }, [sortSelectValue]);

  const onSearchChangeHandle = (e) => {
    setSearchValue(e.target.value);
  };

  const onSortSelectChangeHandle = (e) => {
    setSortSelectValue(e.target.value);
  };

  return (
    <>
      {/* <input type="text" ref={inputRef} /> */}
      <div className={style.controlsContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandle} />

        <select
          value={sortSelectValue}
          onChange={onSortSelectChangeHandle}
          className={style.select}
        >
          <option value="">sort by</option>
          <hr />
          <option value="_sort=level">level ASC</option>
          <option value="_sort=-level">level DESC</option>
          <option value="_sort=completed">completed ASC</option>
          <option value="_sort=-completed">completed DESK</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {cards.length === 0 && <p className={style.noCardsInfo}>No cards...</p>}

      <QuestionCardList cards={cards} />
    </>
  );
};
