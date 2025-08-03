import { useEffect, useState } from "react"
import { API_URL } from "../../constants"
import { QuestionCardList } from "../../components/QuestionCardList/QuestionCardList"

export const HomePage = () => {
  const [questions, setQuestions] = useState()

  const getQuestion = async () => {
    try {
      const response = await fetch(`${API_URL}/react`)
      const questions = await response.json()

      setQuestions(questions)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getQuestion()
  }, [])

  return (
    <>
      <QuestionCardList cards={questions} />
    </>
  )
}
