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

export const formatDate = (unformattedDate) => {
  const date = new Date(unformattedDate);
  const day = date.getDate();
  let suffix;
  if (day > 3 && day < 21) suffix = 'th';
  switch (day % 10) {
    case 1: suffix = 'st';
    case 2: suffix = 'nd';
    case 3: suffix = 'rd';
    default: suffix = 'th';
  }
  const month = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(date);
  const year = date.getFullYear();
  return `${day}${suffix} ${month} ${year}`;
}