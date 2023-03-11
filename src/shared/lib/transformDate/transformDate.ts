const dateChanger = (date: string): string => {
  return Number(date) < 10 ? "0" + date : date;
};

export const transformDate = (date: string): string => {
  const parsedDate = new Date(date);

  const year = String(parsedDate.getFullYear());
  const month = dateChanger(String(parsedDate.getMonth()));
  const day = dateChanger(String(parsedDate.getDay() + 1));

  return day + "/" + month + "/" + year;
};
