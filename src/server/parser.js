const EntryRegex = /(\d{1,2}\/\d{1,2}\/\d{2,4})\s+(\d+)/g;
const parse = noteContent => {
  const res = [];
  let matchResult;
  while (matchResult = EntryRegex.exec(noteContent)) {
    const [unusedFullMatch, date, mileage] = matchResult;
    res.push({date: new Date(date), mileage: parseInt(mileage)});
  }
  return res;
}

export {
  parse,
};
