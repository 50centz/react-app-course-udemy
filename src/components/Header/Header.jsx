import ReactLogo from "../../assets/react.svg";
import { Button } from "../Button";
import style from "./header.module.css";

export const Header = () => {
  return (
    <header className={style.header}>
      <p>
        <img src={ReactLogo} alt="react logo" />
        <span>ReactCards</span>
      </p>

      <div className={style.headerButtons}>
        <Button>Add</Button>
        <Button>Login</Button>
      </div>
    </header>
  );
};
