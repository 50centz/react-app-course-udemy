import { useActionState } from "react";
import { Button } from "../../components/Button/Button.jsx";
import { delayFn } from "../../helpers/delayFn.js";
import { toast } from "react-toastify";
import { API_URL } from "../../constants/index.js";
import style from "./AddQuestionPage.module.css";

const createCardAction = async (_prevState, formData) => {
  try {
    await delayFn();

    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const isClearForm = newQuestion.clearForm; // formData.get("question")

    const response = await fetch(`${API_URL}/react`, {
      method: "POST",
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: undefined,
      }),
    });

    if (response.status === 404) {
      throw new Error(response.statusText);
    }
    const question = response.json();
    toast.success("New question is successfuly created");

    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};

export const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState(createCardAction, {
    clearForm: false,
  });

  return (
    <>
      <h1 className={style.formTitle}>Add new question</h1>
      <div className={style.formContainer}>
        <form action={formAction} className={style.form}>
          <div className={style.formControl}>
            <label htmlFor="questionField">Question: </label>
            <textarea
              defaultValue={formState.question}
              name="question"
              id="questionField"
              cols="30"
              rows="2"
              required
              placeholder="PLease enter a question"
            ></textarea>
          </div>
          <div className={style.formControl}>
            <label htmlFor="answerField">Short Answer: </label>
            <textarea
              defaultValue={formState.answer}
              name="answer"
              id="answerField"
              cols="30"
              rows="2"
              required
              placeholder="PLease enter a short answer"
            ></textarea>
          </div>
          <div className={style.formControl}>
            <label htmlFor="descriptionField">Description: </label>
            <textarea
              defaultValue={formState.description}
              name="description"
              id="descriptionField"
              cols="30"
              rows="5"
              required
              placeholder="PLease enter a full description"
            ></textarea>
          </div>
          <div className={style.formControl}>
            <label htmlFor="resourcesField">Resources: </label>
            <textarea
              defaultValue={formState.resources}
              name="resources"
              id="resourcesField"
              cols="30"
              rows="5"
              required
              placeholder="PLease enter resources separated by commas"
            ></textarea>
          </div>
          <div className={style.formControl}>
            <label htmlFor="levelField">Level: </label>
            <select name="level" id="levelField" defaultValue={formState.level}>
              <option disabled>Question level</option>
              <hr />
              <option value="1">1 - easiest</option>
              <option value="2">2 - medium</option>
              <option value="3">3 - hardest</option>
            </select>
          </div>

          <label htmlFor="clearFormField" className={style.clearFormControl}>
            <input
              className={style.checkbox}
              type="checkbox"
              name="clearForm"
              id="clearFormField"
              defaultChecked={formState.clearForm}
            />
            <span>clear form after submitting ?</span>
          </label>

          <Button isDisabled={isPending}>Add question</Button>
        </form>
      </div>
    </>
  );
};
