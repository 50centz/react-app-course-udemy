import { Header } from "../Header";
import { Outlet } from "react-router-dom";
import style from "./MainLayout.module.css";

export const MainLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={style.mainLayout}>
      <Header />
      <div className={style.mainWrapper}>
        <main className={style.main}>
          <Outlet />
        </main>
        <footer className={style.footer}>
          React Question Cards Application | {currentYear} <br />
          by Fedorov Evgeniy
        </footer>
      </div>
    </div>
  );
};
