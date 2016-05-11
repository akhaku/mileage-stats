const EntryRegex = /(\d{1,2}\/\d{1,2}\/\d{2,4})\s+(\d+)/g;
const parse = noteContent => {
  const res = [];
  let matchResult = EntryRegex.exec(noteContent);
  while (matchResult) {
    matchResult.shift();
    const [date, mileage] = matchResult;
    res.push({date: new Date(date), mileage: parseInt(mileage)});
    matchResult = EntryRegex.exec(noteContent);
  }
  return res;
};

export {
  parse,
};
