export const dateToDateTimeField = (
  date: Date,
  getTimezoneOffset = true,
): string => {
  if (getTimezoneOffset) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  }

  return date.toISOString().slice(0, 16);
};
