const arrayToTextFormatter = (arr) =>
  arr.reduce((acc, str, i, arr) => {
    if (arr.length - i === 1) return (acc += `${str}.`);
    return (acc += `${str}, `);
  }, "");

export { arrayToTextFormatter };
