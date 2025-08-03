import { useEffect, useState } from "react"
import { QuestionCardList } from "../../components/QuestionCardList"
import { Loader } from "../../components/Loader"
import { API_URL } from "../../constants"
import { useFetch } from "../../hooks/useFetch.js"

export const HomePage = () => {
  const [questions, setQuestions] = useState()

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`)
    const questions = await response.json()

    setQuestions(questions)

    return questions
  })

  // const getQuestion = async () => {
  //   try {
  //     setIsLoading(true)
  //     await delayFn(1000)
  //     const response = await fetch(`${API_URL}/react`)
  //     const questions = await response.json()

  //     setQuestions(questions)
  //   } catch (error) {
  //     console.error(error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  useEffect(() => {
    getQuestions("react")
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <QuestionCardList cards={questions} />
    </>
  )
}
