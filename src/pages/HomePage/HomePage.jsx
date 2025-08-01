import { useEffect, useState } from "react";
import { QuestionCard } from "../../components/QuestionCard";
import { API_URL } from "../../constants";
import style from "./homepage.module.css";

export const HomePage = () => {
  const [questions, setQuestions] = useState();

  const getQuestion = async () => {
    try {
      const response = await fetch(`${API_URL}/react`);
      const questions = await response.json();

      setQuestions(questions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <>
      {questions?.map((card, index) => {
        return <QuestionCard card={card} key={index} />;
      })}
    </>
  );
};
