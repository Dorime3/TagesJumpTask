export const basePath =
  process.env.NODE_ENV === "production" ? "/TagesJumpTask" : "";
const sortOptions = [
  {
    label: "Цена по возрастанию",
    value: "price",
  },
  {
    label: "Цена по убыванию",
    value: "-price",
  },
];

export { sortOptions };
