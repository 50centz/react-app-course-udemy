import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import style from "./questioncard.module.css";

export const QuestionCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div className={style.card}>
      <div className={style.cardLabels}>
        <div>Level: {card.level}</div>
        <div>{card.completed ? "Completed" : "Not Completed"}</div>
      </div>

      <h5 className={style.cardTitle}>{card.question}</h5>

      <div className={style.cardAnswers}>
        <label>short answer:</label>
        <p className={style.cardAnswer}>{card.answer}</p>
      </div>

      <Button
        onClick={() => {
          navigate(`/question/${card.id}`);
        }}
      >
        View
      </Button>
    </div>
  );
};
