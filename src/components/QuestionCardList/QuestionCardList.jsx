import { QuestionCard } from "../QuestionCard/QuestionCard"
import style from "./questioncardlist.module.css"

export const QuestionCardList = ({ cards }) => {
  return (
    <div className={style.cardList}>
      {cards?.map((card, index) => {
        return <QuestionCard card={card} key={index} />
      })}
    </div>
  )
}
