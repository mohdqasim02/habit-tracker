const batch9 = [
  {name: "mohd qasim", state: "Uttar Pradesh", num: 8764, verified: "✅"},
  {name: "khan", state: "UP", num: 8764, verified: "❌"},
  {name: "Dheeraj kumar Pundir", state: "Uttarakhand", num: 88764, verified: "✅"},
];


const columnWidths = function(records) {
  const widths = [];

  for (field in records[0]) {
    let fieldWidth = field.length;

    for (let j = 0; j < records.length; j++) {
      let entry = records[j][field];

      if (entry.length === undefined) {
        entry += "";
      }

      fieldWidth = Math.max(fieldWidth, entry.length);
    }
    widths.push(fieldWidth);
  }
  return widths;
}

function formatString(word, maxLength) {
  let string = " ";

  //   if (word === 'true') string += greenFg(word);
  //  else if (word === 'false') string += redFg(word);
  //  else string += word;

  string += word;
  string += " ".repeat(("\177" < word ? maxLength - 1: maxLength) - word.length);
  string += " |";

  return string;
}

const displayRow = function(record, fieldWidths) {
  let widthIndex = 0;
  let line = " |";
  for (key in record) {
    const value = record[key];
    let string = formatString(value + '', fieldWidths[widthIndex]);
    if (value === true) string += greenFg(value);
    if (value === false) string += redFg(value);   
    line += string;
    widthIndex++;
  }
  return line;
}

const displayHeader = function(record, fieldWidths) {
  let widthIndex = 0;
  let line = " |";

  for (key in record) {
    line += formatString(key + '', fieldWidths[widthIndex]);
    widthIndex++;
  }

  displayUnderline(record, fieldWidths);
  console.log(line);
  displayUnderline(record, fieldWidths);
}

const displayUnderline = function(record, feildWidths) {
  let underlineLength = displayRow(record, feildWidths).length;
  console.log(" " + "-".repeat(underlineLength));
}

const displayTable = function(records) {
  const fieldWidths = columnWidths(records);
  displayHeader(records[0], fieldWidths);
  for (let j = 0; j < records.length; j++) {
    console.log(displayRow(records[j], fieldWidths));
  }
  displayUnderline(records[0], fieldWidths);
}

displayTable(batch9);
