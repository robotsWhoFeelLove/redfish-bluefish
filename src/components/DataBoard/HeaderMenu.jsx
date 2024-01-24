import { useState } from "react";
import { getUniqueVals, convertToArray, expandNested, cloneThing, checkForNumber } from "../functions";
import FilterTab from "./FilterTab";
import SplitTab from "./SplitTab copy";

function HeaderMenu({ data, selectedItem, item, changeData, handleHeaderClick, setFilters }) {
  const [checkedVals, setCheckedVals] = useState([]);
  const [activeTab, setActiveTab] = useState("filter");

  function arrayTest(item) {
    let test = false;
    data.map((row) => {
      if (Array.isArray(row[item])) return;
      if (typeof row[item] === "number") return;
      if (row[item]) if (row[item].includes(",") || row[item].includes("|") || row[item].includes("\n")) test = true;
    });
    return test;
  }

  function handleExpand() {
    let tempData = cloneThing(data);
    tempData = expandNested(tempData, selectedItem);
    changeData(tempData);
  }

  function handleArrayLike() {
    let tempData = cloneThing(data);
    tempData = convertToArray(tempData, selectedItem);
    changeData(tempData);
  }

  function handleCheck(e, val) {
    console.log({ val });
    if (e.target.checked) {
      setCheckedVals((a) => [...a, val]);
    } else {
      setCheckedVals((a) => a.filter((el) => el !== val));
    }
  }

  return (
    <div
      className={
        "w-[400px] h-fill  absolute bg-white border-2 border-blue-300 p-2 rounded text-md " +
        (Object.keys(data[0]).indexOf(item) > Object.keys(data[0]).length / 2 && " -ml-[200px]")
      }
    >
      <div className="flex bg-blue-50">
        <ul className="pl-2 h-36 overflow-y-scroll w-3/5 border  border-blue-300 bg-white rounded">
          <li className="font-bold ">Items:</li>
          {getUniqueVals(data, selectedItem).map((val, i) => {
            return (
              <li key={"li_" + val + selectedItem + i}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    handleCheck(e, val);
                  }}
                  className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  id="hs-default-checkbox"
                />
                <label htmlFor="hs-default-checkbox" className="text-sm text-gray-500 ms-3 dark:text-gray-400">
                  {Array.isArray(val) &&
                    val.map((val) => (
                      <span className="border-2 " key={"span_" + val}>
                        {val}
                        {", "}
                      </span>
                    ))}
                  {typeof val !== "object" && val}
                </label>
              </li>
            );
          })}
        </ul>
        <div>
          {Array.isArray(data[0][item]) && (
            <>
              <div className="tooltip tooltip-bottom" data-tip="Create a new row for each item in list.">
                <button className="border rounded bg-blue-400 text-white p-1" onClick={handleExpand}>
                  Expand
                </button>
              </div>
            </>
          )}
          {arrayTest(item) === true && (
            <div className="w-28 h-10 text-xs">
              <div className=" absolute w-36 -right-36 bg-white text-wrap text-red border border-blue-400 rounded p-1">
                This looks like it contains a list stored as text. Converting to a list will allow more data operations.
              </div>
              <button className=" p-1 border rounded bg-blue-400 text-white" onClick={handleArrayLike}>
                Convert to List
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        {/* {checkedVals.length > 0 ||
          (checkForNumber(data, selectedItem) && ( */}
        <>
          {" "}
          <div role="tablist" className="tabs tabs-lifted tabs-sm mt-1 bg-blue-50">
            <a role="tab" onClick={() => setActiveTab("filter")} className={"tab text-xs " + (activeTab === "filter" && " tab-active ")}>
              Smart Filter
            </a>
            <a role="tab" onClick={() => setActiveTab("split")} className={"tab text-xs " + (activeTab === "split" && " tab-active ")}>
              Split to New Column
            </a>
            {/* <a role="tab" onClick={() => setActiveTab("aggregate")} className={"tab text-xs " + (activeTab === "aggregate" && " tab-active")}>
                Aggregate
              </a> */}
          </div>
          {activeTab === "filter" && (
            <>
              <FilterTab data={data} checkedVals={checkedVals} header={selectedItem} setFilters={setFilters} handleHeaderClick={handleHeaderClick} />
            </>
          )}
          {activeTab === "split" && (
            <>
              <SplitTab checkedVals={checkedVals} header={selectedItem} data={data} changeData={changeData} handleHeaderClick={handleHeaderClick} />
            </>
          )}
        </>
        {/* ))} */}
      </div>

      <div
        onClick={(event) => {
          handleHeaderClick("", event);
        }}
        className="absolute bg-red bg-opacity-90 text-white border-white top-0 right-0 rounded-full border-2 w-8 h-8 flex items-center justify-center"
      >
        <div>X</div>
      </div>
    </div>
  );
}

export default HeaderMenu;
