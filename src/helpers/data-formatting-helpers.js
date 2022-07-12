const arrayToTextFormatter = (arr) =>
  arr.reduce((acc, str, i, arr) => {
    if (arr.length - i === 1) return (acc += `${str}.`);
    return (acc += `${str}, `);
  }, "");

const formatPopualtion = (pop) => {
  let popByThousand = pop / 1_000;
  if (popByThousand < 10) return pop;
  if (popByThousand < 1_000) return `${popByThousand.toFixed(2)} K`;
  if (popByThousand < 1_000_000) return `${(pop / 1_000_000).toFixed(2)} M`;
  return `${(pop / 1_000_000_000).toFixed(2)} B`;
};

export { arrayToTextFormatter, formatPopualtion };
