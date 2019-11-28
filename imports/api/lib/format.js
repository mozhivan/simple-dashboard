export const formatToDate = (value) => {
  const [
    year,
    month,
    day,
  ] = value.split('-');
  return new Date(year, month - 1, day);
};

export const formatIfDate = (value) => (value instanceof Date
  ? value.toISOString().substring(0, 10)
  : value);
