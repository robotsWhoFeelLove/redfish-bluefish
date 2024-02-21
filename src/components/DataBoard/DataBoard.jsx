import { useEffect, useState } from "react";
import { aggregateThings, convertToArray, cloneThing, expandNested, getUniqueVals, filterDynamic } from "../functions";
import HeaderMenu from "./HeaderMenu";
import TableBody from "../Utils/TableBody";
import AggregateBoard from "../AggregationBoard/AggregateBoard";
import { handleDownload } from "../Utils/Download";
import logo from "../../assets/fishTwo.svg";
import Begin from "../Begin/Begin";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import upDown from "../../assets/UpDown.svg";

import "../Navbar.css";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function DataBoard({ data, setData, groupedData, setGroupedData, uploadHandler, unfilteredData, setUnfilteredData, sizes }) {
  // const [data, setData] = useState("");
  const [prevData, setPrevData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [filters, setFilters] = useState([]);
  const [height, setHeight] = useState(400);
  // const [sizes, setSizes] = useState([80, 20]);
  // const [unfilteredData, setUnfilteredData] = useState();
  const ref = useDetectClickOutside({ onTriggered: () => setSelectedItem("") });

  function runFilters(filters) {
    if (filters.length > 0) {
      console.log({ unfilteredData, filters });
      let tempFiltered = filterDynamic([...unfilteredData], filters);
      // let testFiltered = filterDynamic([...unfilteredData], filters);
      console.log({ tempFiltered });
      setData(tempFiltered);
    }
    if (filters.length === 0) {
      setData(unfilteredData);
    }
  }

  let testData = [
    { field1: ["red", "blue"], field2: "car" },
    { field1: "blue", field2: "truck" },
    { field1: "green", field2: "motorcycle" },
  ];

  let filterArr = [
    // { field: "field1", operation: "===", value: "green" },
    { field: "field1", operation: "includes", value: "blue" },
    // { field: "field2", operation: "===", value: "truck" },
  ];

  filterDynamic(testData, filterArr);

  useEffect(() => {
    runFilters(filters);
  }, [filters]);

  function clearFilter(filter) {
    let filterArr = filters.filter((el) => el !== filter);
    setFilters(filterArr);
  }

  function changeData(newData) {
    console.log(prevData);
    let tempData = cloneThing(data);

    // let tempPrev = cloneThing(prevData);
    // tempPrev.push(tempData);
    setPrevData((e) => [...e, tempData]);
    console.log({ newData });
    setUnfilteredData(newData);
    setData(newData);
  }

  useEffect(() => {
    console.log({ prevData });
  }, [prevData]);

  useEffect(() => {
    console.log({ data });
  }, [data]);

  function handleHeaderClick(el, event) {
    if (event) {
      event.stopPropagation();
    }
    setSelectedItem(el);
  }

  function handleExpand() {
    let tempData = [...data];
    tempData = expandNested(tempData, selectedItem);
    console.log({ tempData });
    changeData(tempData);
  }

  function handleArrayLike() {
    let tempData = [...data];
    tempData = convertToArray(tempData, selectedItem);

    changeData(tempData);
  }

  function handleUndo() {
    setSelectedItem("");

    if (prevData.length === 1) {
      setData(cloneThing(prevData[0]));
      setPrevData([]);
      return;
    } else {
      let tempPrev = [...prevData];
      let lastItem = tempPrev.pop();

      console.log({ lastItem });
      setData(lastItem);
      setPrevData(tempPrev);
    }
    setFilters([]);
  }

  function arrayTest(item) {
    let test = false;
    data.map((row) => {
      if (Array.isArray(row[item])) return;
      if (typeof row[item] === "number") return;
      if (row[item]) if (row[item].includes(",") || row[item].includes("|") || row[item].includes("\n")) test = true;
    });
    return test;
  }

  return (
    <>
      {/* <PanelGroup style={{ height: "100vh" }} onLayout={setSizes} direction="vertical">
        <Panel defaultSize={sizes[0]}> */}
      {data && (
        <>
          <div className="flex w-screen max-h-full min-h-[150px]  px-2 backdrop">
            <div className=" w-[100%]  overflow-scroll bg-white py-2 rounded-lg">
              <table className="table table-pin-rows table-xs top-0 ">
                <thead>
                  <tr className="text-blue-400 ">
                    {data[0] &&
                      Object.keys(data[0]).map((item) => {
                        return (
                          <th
                            ref={ref}
                            onClick={(event) => {
                              handleHeaderClick(item, event);
                            }}
                            className="hover:bg-blue-300 border-2   border-slate-300 bg-slate-500"
                            key={"header" + item}
                          >
                            <div className=" text-white text-xl text-lato font-light">{item}</div>
                            {selectedItem === item && (
                              <HeaderMenu
                                setFilters={setFilters}
                                data={data}
                                selectedItem={selectedItem}
                                item={item}
                                changeData={changeData}
                                handleHeaderClick={handleHeaderClick}
                                sizes={sizes}
                              />
                            )}
                          </th>
                        );
                      })}
                  </tr>
                </thead>

                <TableBody data={data} />
              </table>
            </div>

            {/* <div className="w-4 flex flex-col h-[100%] justify-center items-center  bg-slate-200 border border-slate-400">
              <div className="flex w-4 h-4 gap-[2px]">
                <div className="h-3 w-[2px] bg-slate-400"></div>
                <div className="h-3 w-[2px] bg-slate-400"></div>
                <div className="h-3 w-[2px] bg-slate-400"></div>
              </div>
            </div> */}

            <div className="min-w-[200px] max-w-[250px] right-0  p-1 bg-white border-l-blue-300 border-l-4">
              <div className="flex gap-2">
                <button
                  className="p-1 btn btn-ghost h-10 border bg-red bg-opacity-90 rounded text-white "
                  onClick={() => {
                    handleDownload(data);
                  }}
                >
                  Download
                </button>
                {prevData.length > 0 && (
                  <button className="p-1 h-10 bg-red bg-opacity-90 btn btn-ghost rounded text-white mt-6" onClick={() => handleUndo()}>
                    Undo
                  </button>
                )}
              </div>

              {!filters.length > 0 && (
                <div className="p-4 hyphens-auto text-md ">Click on a header to add filters, convert data elements and expand values</div>
              )}
              {filters.map((filter, i) => {
                return (
                  <>
                    <table className="flex table flex-col my-1" key={"filter" + i}>
                      <thead>
                        <tr>
                          <th>Smart Filters:</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <button className="self-end bg-red bg-opacity-90 px-1  text-white rounded border" onClick={() => clearFilter(filter)}>
                              Clear
                            </button>
                            {
                              <div className="flex justify-between p-1 items-center rounded border border-blue-300  ">
                                <span className="text-md border text-slate-800 border-red bg-white rounded px-1">
                                  {Array.isArray(filter.field) ? filter.field[0] : filter.field}
                                </span>
                                <div className="font-bold text-red">{" | "}</div>
                                <span>{Array.isArray(filter.field) ? "in" : filter.operation}</span>
                                <div className="font-bold text-red">{" | "}</div>
                                <span className="text-sm rounded border border-red">
                                  {Array.isArray(filter.value) ? filter.value.join(", ") : filter.value}
                                </span>
                              </div>
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
