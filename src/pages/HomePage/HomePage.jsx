import { useEffect, useMemo, useRef, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { API_URL } from "../../constants";
import { useFetch } from "../../hooks/useFetch.js";
import { SearchInput } from "../../components/SearchInput";
import style from "./homepage.module.css";
import { Button } from "../../components/Button/Button.jsx";

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
  const [searchParams, setSearchParams] = useState(
    `?_page=1&_per_page=${DEFAULT_PER_PAGE}`
  );
  const [questions, setQuestions] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [countSelectValue, setCountSelectValue] = useState("");

  const controlsContainerRef = useRef();

  // const inputRef = useRef()

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();

    setQuestions(questions);

    return questions;
  });

  const cards = useMemo(() => {
    if (questions?.data) {
      if (searchValue.trim()) {
        return questions.data.filter((e) =>
          e.question.toLowerCase().includes(searchValue.trim().toLowerCase())
        );
      } else {
        return questions?.data;
      }
    }
    return [];
  }, [questions, searchValue]);

  const getActivePageNumber = () => {
    return questions.next === null ? questions.last : questions.next - 1;
  };

  const pagination = useMemo(() => {
    const totalCardsCount = questions?.pages || 0;

    return Array(totalCardsCount)
      .fill(0)
      .map((e, i) => i + 1);
  }, [questions]);

  useEffect(() => {
    getQuestions(`react${searchParams}`);
  }, [searchParams]);

  const onSearchChangeHandle = (e) => {
    setSearchValue(e.target.value);
  };

  const onSortSelectChangeHandle = (e) => {
    setSortSelectValue(e.target.value);

    setSearchParams(`?_page=1&_per_page=${countSelectValue}&${e.target.value}`);
  };

  const paginationHandle = (e) => {
    if (e.target.tagName === "BUTTON") {
      setSearchParams(
        `?_page=${e.target.textContent}&_per_page=${countSelectValue}&${sortSelectValue}`
      );
      controlsContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onCountSelectChangeHandle = (e) => {
    setCountSelectValue(e.target.value);
    setSearchParams(`?_page=1&_per_page=${e.target.value}&${sortSelectValue}`);
  };

  return (
    <>
      {/* <input type="text" ref={inputRef} /> */}
      <div className={style.controlsContainer} ref={controlsContainerRef}>
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

        <select
          value={countSelectValue}
          onChange={onCountSelectChangeHandle}
          className={style.select}
        >
          <option disabled>count</option>
          <hr />
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}

      <QuestionCardList cards={cards} />

      {cards.length === 0 ? (
        <p className={style.noCardsInfo}>No cards...</p>
      ) : (
        pagination.length > 1 && (
          <div className={style.paginationContainer} onClick={paginationHandle}>
            {pagination.map((value) => {
              return (
                <Button key={value} isActive={value === getActivePageNumber()}>
                  {value}
                </Button>
              );
            })}
          </div>
        )
      )}
    </>
  );
};
