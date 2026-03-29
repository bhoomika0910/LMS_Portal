export const truncate = (value: string, length = 120) => {
  if (value.length <= length) return value;
  return `${value.slice(0, length)}…`;
};
