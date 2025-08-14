import style from "./badge.module.css";

export const Badge = ({ variant, children }) => {
  switch (variant) {
    case "primary":
      return (
        <div className={`${style.badge} ${style.primary}`}>{children}</div>
      );

    case "success":
      return (
        <div className={`${style.badge} ${style.success}`}>{children}</div>
      );

    case "warning":
      return (
        <div className={`${style.badge} ${style.warning}`}>{children}</div>
      );

    case "alert":
      return <div className={`${style.badge} ${style.alert}`}>{children}</div>;

    default:
      return <div className={style.badge}>{children}</div>;
  }
};
