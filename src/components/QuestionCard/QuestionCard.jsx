import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Badge } from "../Badge";
import style from "./questioncard.module.css";

export const QuestionCard = ({ card }) => {
  const navigate = useNavigate();

  const levelVariant =
    card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert";

  const completedVariant = card.completed ? "success" : "primary";

  return (
    <div className={style.card}>
      <div className={style.cardLabels}>
        <Badge variant={levelVariant}>Level: {card.level}</Badge>
        <Badge variant={completedVariant}>
          {card.completed ? "Completed" : "Not Completed"}
        </Badge>
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
