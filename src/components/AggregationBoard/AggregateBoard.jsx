import TableBody from "../Utils/TableBody";
import { useState, useEffect } from "react";
import { cloneThing, aggregateThings } from "../functions";
import DropDown from "../Utils/DropDown";
import { handleDownload } from "../Utils/Download";
import "../DataBoard/Navbar.css";
import { useDetectClickOutside } from "react-detect-click-outside";

function AggregateBoard({ data, handleHeaderClick }) {
  const [checkedGroups, setCheckedGroups] = useState([]);
  const [groupedData, setGroupedData] = useState();
  const [aggregations, setAggregations] = useState([]);
  const [activeTab, setActiveTab] = useState("group");
  const [header, setHeader] = useState();
  const [aggOp, setAggOp] = useState();
  const [numVal, setNumVal] = useState("");

  const ref = useDetectClickOutside({ onTriggered: () => setIsOpen(false) });

  const aggregators = {
    average: "average",
    sum: "sum",
    "Percent Greater or Equal to": "%>=",
    "Percent Greater than": "%>",
    "Percent Less or Equal to": "%<=",
    "Percent less than": "%<",
    max: "max",
    min: "min",
  };

  function handleAggregation(isNumeric = false) {
    let tempAgg = {
      field: header,
      operation: isNumeric ? aggregators[aggOp] + numVal : aggregators[aggOp],
    };

    setAggregations((x) => [...x.filter((el) => el.operation != "count"), tempAgg]);
    setNumVal("");
  }

  function handleClearAggregation(agg) {
    setAggregations((x) => [...x.filter((el) => el.operation != "count" && el !== agg)]);
  }

  useEffect(() => {
    let tempData = cloneThing(data);
    let tempGrouped = aggregateThings(tempData, checkedGroups, aggregations);
    setGroupedData(tempGrouped);
  }, [checkedGroups, aggregations]);

  function handleGroupCheck(e, val) {
    console.log({ val });
    if (e.target.checked) {
      setCheckedGroups((a) => [...a, val]);
    } else {
      setCheckedGroups((a) => a.filter((el) => el !== val));
    }
  }
  return (
    <>
      <div className="flex w-screen min-h-[400px] border-t-4 border-blue-200 bottom-0">
        <div className="w-3/4 border-4 overflow-scroll">
          {groupedData && groupedData.length > 0 && (
            <div className="h-14 gradient flex justify-end">
              <button
                className="p-2 bg-red btn btn-ghost rounded text-white m-1 self-end"
                onClick={() => {
                  handleDownload(groupedData);
                }}
              >
                Download Aggregations
              </button>
            </div>
          )}
          {groupedData && groupedData.length === 0 && (
            <div className="w-full h-full gradient text-lg pt-10">Select columns to group data by to begin aggregating.</div>
          )}
          {groupedData && (
            <table className="table h-content table-xs overflow-scroll">
              <thead>
                <tr>
                  {groupedData[0] &&
                    Object.keys(groupedData[0]).map((item) => {
                      return (
                        <th className="border-2 border-slate-300 text-white text-xl text-lato font-light bg-slate-500" key={"header" + item}>
                          {item}
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <TableBody data={groupedData} />
            </table>
          )}
        </div>

        <div className=" w-1/4 gradient">
          <div role="tablist" className="tabs tabs-lifted tabs-sm mt-1 ">
            <a
              role="tab"
              onClick={() => setActiveTab("group")}
              className={"tab text-xs  " + (activeTab === "group" && " tab-active text-slate-800 ")}
            >
              Group By:
            </a>
            <a role="tab" onClick={() => setActiveTab("agg")} className={"tab text-xs  " + (activeTab === "agg" && " tab-active text-slate-800")}>
              Add Aggregation
            </a>
          </div>
          {activeTab === "group" && (
            <ul className="text-start pl-2 overflow-y-scroll w-52 border bg-blue-50">
              {/* <li className="text-sm text-slate-500 text-bold">Group By:</li> */}
              {data &&
                data[0] &&
                Object.keys(data[0]).map((val, i) => {
                  return (
                    <li key={"li_agg" + val + i}>
                      <input
                        type="checkbox"
                        checked={checkedGroups.includes(val)}
                        onChange={(e) => {
                          handleGroupCheck(e, val);
                        }}
                        className="shrink-0 mt-0.5 border-gray-200  rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
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
          )}
          {activeTab === "agg" && (
            <div className="text-start px-3 ">
              <>
                {/* <div className="text-sm text-slate-500 text-bold">Aggregation:</div> */}
                <div className="flex mt-4 items-center ">
                  <div className="w-28 text-sm text-white text-bold">Field: </div>{" "}
                  <DropDown ref={ref} actions={Object.keys(data[0])} width="200px" setter={setHeader} />
                </div>
                <div className="flex mt-2 items-center ">
                  <div className="w-28 text-sm text-whitetext-bold">Aggregation: </div>{" "}
                  <DropDown actions={Object.keys(aggregators)} width="200px" setter={setAggOp} />
                </div>
                {aggOp && (
                  <div className="flex m-4 items-center  text-xs justify-center gap-2 ">
                    <div className="border-2 rounded p-1 bg-red text-center border-blue-200">
                      <div>{aggOp.includes("Percent") ? "Percent" : aggOp}</div>
                      <div className="px-4">{" of "}</div>
                      <div>{header}</div>
                    </div>
                    {aggOp.includes("Percent") && (
                      <>
                        <div className="px-4 w-24 wrap border-2 border-blue-200 rounded bg-slate-500 text-center">{aggOp.replace("Percent", "")}</div>
                        <div className="flex flex-col w-24">
                          <input
                            value={numVal}
                            onChange={(e) => {
                              setNumVal(e.target.value);
                            }}
                            className="border h-6 text-center text-slate-800"
                            type="number"
                          />
                          {numVal && (
                            <button
                              onClick={() => {
                                if (numVal) {
                                  handleAggregation(true);
                                }
                              }}
                              className="border bg-red p-1 rounded text-white h-6"
                            >
                              Add
                            </button>
                          )}
                          {!numVal && (
                            <div className="tooltip tooltip-bottom" data-tip="Add a value above">
                              <button className="border bg-slate-300 p-1 rounded text-white h-6">Add</button>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    {!aggOp.includes("Percent") && (
                      <button onClick={handleAggregation} className="border bg-red p-1 rounded text-white h-6">
                        Add
                      </button>
                    )}
                  </div>
                )}
              </>
            </div>
          )}
          <div>
            <div>Active Aggregations:</div>
            {aggregations.length > 0 &&
              aggregations
                .filter((el) => el.operation != "count")
                .map((agg, j) => {
                  return (
                    <>
                      <div key={"agg" + j} className="flex justify-between items-center h-10 p-4 border rounded m-2 bg-blue-500">
                        <div>{`${agg.operation}   ${agg.field}`}</div>
                        <button onClick={() => handleClearAggregation(agg)} className="border bg-red p-1 rounded text-white h-6 text-xs">
                          Clear
                        </button>
                      </div>
                    </>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AggregateBoard;
