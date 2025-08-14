import { memo } from "react";
import { QuestionCard } from "../QuestionCard/QuestionCard";
import style from "./questioncardlist.module.css";

export const QuestionCardList = memo(({ cards }) => {
  return (
    <div className={style.cardList}>
      {cards?.map((card, index) => {
        return <QuestionCard card={card} key={index} />;
      })}
    </div>
  );
});
