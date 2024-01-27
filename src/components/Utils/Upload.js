import { read, utils } from "xlsx";

export const uploadHandler = (event, setData, setUnfilteredData) => {
  event.preventDefault();
  const files = event.target.files;
  console.log({ files });
  if (files.length) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const wb = read(event.target.result);
      const sheets = wb.SheetNames;

      if (sheets.length) {
        const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
        setUnfilteredData(rows);
        setData(rows);
        // setPrevData([cloneThing(rows)]);
        console.log({ rows });
      }
    };
    reader.readAsArrayBuffer(file);
  }
};
