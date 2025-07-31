import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import ReactLogo from "../../assets/react.svg";
import style from "./header.module.css";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={style.header}>
      <p onClick={() => navigate("/")}>
        <img src={ReactLogo} alt="react logo" />
        <span>ReactCards</span>
      </p>

      <div className={style.headerButtons}>
        <Button onClick={() => navigate("/addquestion")}>Add</Button>
        <Button>Login</Button>
      </div>
    </header>
  );
};
