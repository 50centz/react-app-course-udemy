export const dateFormat = (date) => {
  return Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "-digit",
    minute: "2-digit",
  }).format(date);
};
