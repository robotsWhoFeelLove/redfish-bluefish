import { utils, writeFile } from "xlsx";
import { cloneThing } from "../functions";

export function handleDownload(data) {
  let clonedData = cloneThing(data);
  let tempData = clonedData.map((row) => {
    Object.keys(clonedData[0]).map((datum) => {
      if (row[datum] === null) row[datum] = "";
      if (Array.isArray(row[datum])) {
        row[datum] = row[datum].filter((el) => el != "").join("\n");
      }
    });
    return row;
  });

  const worksheet = utils.json_to_sheet(tempData);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "RedFish-BlueFish-Sheet");
  console.log({ tempData });
  const colWidth = Object.keys(tempData[0]).map((el) => {
    if (typeof data[0][el] === "number") return { wch: 10 };
    const maxL = tempData.reduce((a, b) => {
      console.log({ a, b, el });
      if (b[el].length < a[el].length || b === undefined) {
        b[el] = a[el];
      }
      return b;
    })[el].length;
    // return maxL;
    return { wch: maxL < 50 ? maxL : 50 };
  });
  console.log(colWidth);
  worksheet["!cols"] = colWidth;

  writeFile(workbook, "RedFish-BlueFish.xlsx");
}
