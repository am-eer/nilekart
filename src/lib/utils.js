export const extractPageNumber = (pgNoStr) => {
  const pgNo = Number(pgNoStr);
  if(pgNo === NaN || pgNo < 0 || !Number.isInteger(pgNo)) return 1;
  return pgNo;
}

export const capitalizeFirstLetter = (word) => {
  return word[0].toUpperCase() + word.slice(1);
}