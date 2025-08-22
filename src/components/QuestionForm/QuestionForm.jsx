import { Button } from "../Button/Button.jsx";
import style from "./QuestionForm.module.css";

export const QuestionForm = ({
  formAction,
  state,
  isPending,
  submitBtnText,
}) => {
  return (
    <form action={formAction} className={style.form}>
      <input type="text" name="questionId" defaultValue={state.id} hidden />
      <div className={style.formControl}>
        <label htmlFor="questionField">Question: </label>
        <textarea
          defaultValue={state.question}
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
          defaultValue={state.answer}
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
          defaultValue={state.description}
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
          defaultValue={state.resources}
          name="resources"
          id="resourcesField"
          cols="30"
          rows="5"
          placeholder="PLease enter resources separated by commas"
        ></textarea>
      </div>
      <div className={style.formControl}>
        <label htmlFor="levelField">Level: </label>
        <select name="level" id="levelField" defaultValue={state.level}>
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
          defaultChecked={state.clearForm}
        />
        <span>clear form after submitting ?</span>
      </label>

      <Button isDisabled={isPending}>{submitBtnText}</Button>
    </form>
  );
};
