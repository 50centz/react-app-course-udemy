import { useEffect, useId, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { useFetch } from "../../hooks/useFetch.js";
import { API_URL } from "../../constants";
import { Loader } from "../../components/Loader/Loader.jsx";
import { SmallLoader } from "../../components/SmallLoader/SmallLoader.jsx";
import style from "./questionpage.module.css";

export const QuestionPage = () => {
  const checkboxId = useId();
  const navigate = useNavigate();
  const params = useParams();
  const [card, setCard] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const levelVariant = () =>
    card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert";

  const completedVariant = () => (card.completed ? "success" : "primary");

  const [fetCard, isCardLoadingr] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${params.id}`);
    const data = await response.json();

    setCard(data);
  });

  const [updateCard, isCardUpdated] = useFetch(async (isChecked) => {
    const response = await fetch(`${API_URL}/react/${card.id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: isChecked }),
    });
    const data = await response.json();

    setCard(data);
  });

  useEffect(() => {
    fetCard();
  }, []);

  useEffect(() => {
    card !== null && setIsChecked(card.completed);
  }, [card]);

  const onCheckboxChangeHandle = () => {
    setIsChecked(!isChecked);
    updateCard(!isChecked);
  };

  return (
    <>
      {isCardLoadingr && <Loader />}
      {card !== null && (
        <div className={style.container}>
          <div className={style.cardLabels}>
            <Badge variant={levelVariant()}>Level: {card.level}</Badge>
            <Badge variant={completedVariant()}>
              {card.completed ? "Completed" : "Not Completed"}
            </Badge>

            {card?.editDate && (
              <p className={style.editDate}>Edited: {card?.editDate}</p>
            )}
          </div>

          <h5 className={style.cardTitle}>{card.question}</h5>
          <p className={style.cardDescription}>{card.description}</p>

          <div className={style.cardAnswers}>
            <label>short answer:</label>
            <p className={style.cardAnswer}>{card.answer}</p>
          </div>

          <ul className={style.cardLinks}>
            Resourses:
            {card.resources.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link.trim()} target="_blank" rel="noreferrer">
                    {link.trim()}
                  </a>
                </li>
              );
            })}
          </ul>

          <label htmlFor={checkboxId} className={style.cardCheckbox}>
            <input
              type="checkbox"
              id={checkboxId}
              className={style.checkbox}
              checked={isChecked}
              onChange={onCheckboxChangeHandle}
              disabled={isCardUpdated}
            />
            <span>mark question as completed</span>

            {isCardUpdated && <SmallLoader />}
          </label>

          <Button
            onClick={() => {
              navigate(`/question/${card.id}`);
            }}
            isDisabled={isCardUpdated}
          >
            Edit Question
          </Button>

          <Button
            onClick={() => {
              navigate("/");
            }}
            isDisabled={isCardUpdated}
          >
            Back
          </Button>
        </div>
      )}
    </>
  );
};
