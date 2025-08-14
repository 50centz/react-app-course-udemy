import { useEffect, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { API_URL } from "../../constants";
import { useFetch } from "../../hooks/useFetch.js";
import { SearchInput } from "../../components/SearchInput";
import style from "./homepage.module.css";

export const HomePage = () => {
  const [questions, setQuestions] = useState();
  const [searchValue, setSearchValue] = useState("");

  // const inputRef = useRef()

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();

    setQuestions(questions);

    return questions;
  });

  useEffect(() => {
    getQuestions("react");
  }, []);

  const onSearchChangeHandle = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      {/* <input type="text" ref={inputRef} /> */}
      <div className={style.controlsContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandle} />
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <QuestionCardList cards={questions} />
    </>
  );
};
