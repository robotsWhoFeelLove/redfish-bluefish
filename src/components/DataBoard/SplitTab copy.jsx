import { useState } from "react";
import DropDown from "../Utils/DropDown";
import { splitOut } from "../functions";

function SplitTab({ checkedVals, header, handleHeaderClick, data, changeData }) {
  const [operation, setOperation] = useState();
  const [colName, setColName] = useState(header + "_copy");

  function checkForNumber(arr, field) {
    let testForNum = false;
    arr.map((val) => {
      let testVal = val;
      if (field) testVal = val[field];
      if (typeof testVal === "number") testForNum = true;
    });
    return testForNum;
  }
  let numTest = checkForNumber(checkedVals);
  const numeric = ["=", "is not", "is greater than", "is greater than or equal to", "is less than", "is less than or equal to"];
  const stringlike = ["=", "is not", "includes", "doesn't include"];

  function handleSplit(e) {
    let arr = checkedVals.flat();
    let dataSplit = splitOut(data, arr, header, colName);
    // console.log({ checkedVals, header, colName });

    changeData(dataSplit);
    handleHeaderClick("", e);
  }

  return (
    <>
      <div className=" h-fit pb-3 pt-4">
        <div className="flex wrap items-center h-full ">
          {!numTest && (
            <>
              <div className="mx-2">Split:</div>
              <div className="flex flex-col overflow-y-scroll bg-white">
                {checkedVals.map((val) => (
                  <div className="border-2 p-1 h-8" key={"span_" + val}>
                    {val}
                  </div>
                ))}
              </div>
              <div className="mx-2">To:</div>
              <input value={colName} onChange={(e) => setColName(e.target.value)} className="w-56 rounded mx-2 h-10 border" type="text" />
              {/* <div className="p-1 text-sm w-24 text-wrap">{header}</div> */}
              {/* <DropDown actions={checkedVals.length > 1 ? ["="] : stringlike} header={selected} setter={setOperation} width="180px" /> */}
            </>
          )}
          {numTest && (
            <>
              <div>test</div>
            </>
          )}
        </div>
        <div className="flex w-full justify-center p-1">
          <button onClick={(e) => handleSplit(e)} className="bg-red p-2 rounded text-white">
            Add Column
          </button>
        </div>
        <div className="divider"></div>
      </div>
    </>
  );
}

export default SplitTab;
