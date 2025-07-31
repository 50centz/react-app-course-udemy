import { Button } from "../Button";
import style from "./questioncard.module.css";

export const QuestionCard = () => {
  return (
    <div className={style.card}>
      <div className={style.cardLabels}>
        <div>Level: 1</div>
        <div>Not Completed</div>
      </div>

      <h5 className={style.cardTitle}>Что такое JSX</h5>

      <div className={style.cardAnswers}>
        <label>short answer:</label>
        <p className={style.cardAnswer}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
          temporibus!
        </p>
      </div>

      <Button onClick={() => {}}>View</Button>
    </div>
  );
};
