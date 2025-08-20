import style from "./loader.module.css";

export const Loader = () => {
  return (
    <div className={style.backdrop}>
      <span className={style.loader}></span>
    </div>
  );
};

export const SmallLoader = () => {
  return <span className={style.smallLoader}></span>;
};
