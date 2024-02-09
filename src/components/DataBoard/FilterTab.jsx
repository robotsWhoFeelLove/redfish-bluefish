import { useState } from "react";
import DropDown from "../Utils/DropDown";
import { checkForNumber } from "../functions";
import { useDetectClickOutside } from "react-detect-click-outside";

function FilterTab({ checkedVals, header, setFilters, handleHeaderClick, data }) {
  const [operation, setOperation] = useState();
  const [compNum, setCompNum] = useState();
  const [numericOperation, setNumericOperation] = useState("=");

  let numTest = checkForNumber(data, header);
  const numeric = ["=", "", "is not", ">", ">=", "<", "<="];
  const stringlike = ["=", "is not", "includes", "doesn't include"];
  const arraylike = ["includes", "doesn't include", "=", "is not"];

  function getOperation(operation) {
    console.log({ operation });
    switch (operation) {
      case "=":
        return "===";
      case "is not":
        return "!==";
      case "includes":
        return "includes";
      case "doesn't include":
        return "!includes";
      default:
        return operation;
    }
  }

  function getNumericFilter(operation) {
    let op = operation;
    if (operation === "is not") operation = "!==";
    if (operation === "=") operation = "===";
    return {
      field: header,
      operation: op,
      value: compNum,
    };
  }

  function handleNumericFilter(e) {
    let tempFilter = getNumericFilter(numericOperation);
    console.log({ tempFilter });
    setFilters((x) => [...x, tempFilter]);
    handleHeaderClick("", e);
  }

  function getFilterArr() {
    let field = [];
    let value = [];
    let operator = [];
    // let operator;
    if (checkedVals.length > 1) {
      //   operator = "or";
      checkedVals.map((val) => {
        operator.push(getOperation(operation));
        field.push(header);
        value.push(val);
      });
    } else {
      field = header;
      operator = getOperation(operation);
      value = checkedVals[0];
    }
    // console.log({ filterArr });
    return [{ field, operation: operator, value }];
  }

  function handleAddFilter(e) {
    let filterArr = getFilterArr();
    if (filterArr.length > 1)
      filterArr = filterArr.map((el) => {
        el.isOr = true;
        return el;
      });
    setFilters((x) => [...x, ...filterArr]);
    handleHeaderClick("", e);
    // filterArr.map()
  }

  return (
    <>
      {/* <div className="flex w-full justify-end p-1"></div> */}
      <div className="overflow-y-scroll ">
        {/* {checkedVals.length && ( */}
        {checkedVals.length > 0 && (
          <>
            <h3 className="text-slate-900 mt-4 pl-4 text-bold text-xs">Filter by Selected:</h3>
            <div className="flex wrap items-center justify-around h-full">
              <div className="btn btn-outline text-center text-sm w-24 text-white text-wrap border  bg-slate-900 ml-2">{header}</div>
              <DropDown actions={Array.isArray(data[0][header]) ? arraylike : stringlike} header={header} setter={setOperation} width="150px" />
              <div className="flex flex-col overflow-y-scroll bg-white">
                {checkedVals.map((val) => (
                  <div className="border-2 border-slate-300 p-1 h-8 rounded text-slate-900" key={"span_" + val}>
                    {val}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button onClick={(e) => handleAddFilter(e)} className=" mt-4 btn btn-sm btn-ghost text-md text-white bg-red ">
                Add Filter
              </button>
            </div>
          </>
        )}
        {/* )} */}

        <div className="divider"></div>

        {numTest && (
          <>
            <h3>Numeric Filter</h3>
            <div className="flex wrap items-center h-full">
              <div className="flex">
                <div>{header}</div>
                <DropDown actions={numeric} header={header} setter={setNumericOperation} width="100px" />
                <input value={compNum} onChange={(e) => setCompNum(e.target.value)} className="w-24 rounded mx-2 h-10 border px-4" type="number" />
                <button onClick={(e) => handleNumericFilter(e)} className="bg-blue-400 p-1 rounded text-white">
                  Add Filter
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default FilterTab;
