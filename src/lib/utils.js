export const extractPageNumber = (pgNoStr) => {
  const pgNo = Number(pgNoStr);
  if (pgNo === NaN || pgNo < 0 || !Number.isInteger(pgNo)) return 1;
  return pgNo;
};

export const formatCategory = (originalWord) => {
  let result = "";
  let space = "";
  for(const word of originalWord.split("-")) {
    result += space + word[0].toUpperCase() + word.slice(1);
    space = " ";
  }
  return result;
}