export const extractPageNumber = (pgNoStr) => {
  const pgNo = Number(pgNoStr);
  if(pgNo === NaN || pgNo < 0 || !Number.isInteger(pgNo)) return 1;
  return pgNo;
}

export const formatCategory = (originalWord) => {
  let result = '';
  for(const word of originalWord.split("-")) {
    result += word[0].toUpperCase() + word.slice(1);
  }
  return result;
}