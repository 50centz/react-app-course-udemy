import style from "./button.module.css";

export const Button = (props) => {
  return (
    <button
      className={`${style.btn} ${props.isActive ? style.active : ""}`}
      onClick={props.onClick}
      disabled={props.isDisabled}
    >
      {props.children}
    </button>
  );
};
