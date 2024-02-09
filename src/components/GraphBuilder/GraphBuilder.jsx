import { useEffect, useReducer, useRef, useState } from "react";
import DropDown from "../Utils/DropDown";
import BarTypeChart from "./ComposedChart";
import { cloneThing } from "../functions";
import { SketchPicker, BlockPicker } from "react-color";
import RadarGraph from "./RadarChart";
import { useDetectClickOutside } from "react-detect-click-outside";
import DropDownControlled from "../Utils/DropDownControlled";
import ToggleColor from "../Utils/ToggleColor";
import Slider from "../Utils/Slider";
import html2canvas from "html2canvas";
import { toPng } from "html-to-image";
import download from "downloadjs";
import "./GraphBuilder.css";

export let blankDatum = {
  chartType: "",
  dataKey: "",
  displayName: "",
  fill: "#60a5fa",
};

export let blankGraph = {
  chartType: "",
  axisName: "",
  ticks: "true",
  chartTitle: "",
  bgColor: "#ffffff",
  titleColor: "#27272a",
  width: 70,
  height: 70,
  categoriesGap: 10,
  increment: 0,
};

function GraphBuilder({ groupedData, graphSettings, setGraphSettings, graphArr, setGraphArr }) {
  //   const [field, setField] = useState("");
  //   const [graphSettings, setGraphSettings] = useState(blankGraph);
  //   const [graphArr, setGraphArr] = useState([]);
  const [prevCharts, setPrevCharts] = useState([]);
  const [showColor, setShowColor] = useState("Data Color");
  const [selectedColor, setSelectedColor] = useState("#60a5fa");
  const [theme, setTheme] = useState("None");
  const [activeTab, setActiveTab] = useState("main");
  const [graphIndex, setGraphIndex] = useState(0);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  function handleNew(item) {
    console.log("new " + item);
    blankDatum.chartType = item;
    setGraphIndex(graphArr.length);
    setGraphArr((x) => [...x, cloneThing(blankDatum)]);
  }

  console.log({ graphArr });

  //   function handleUndo() {
  //     let tempCharts = cloneThing(prevCharts);
  //     let lastChart = tempCharts.pop();
  //     setBarGraphs(lastChart[0]);
  //     setLineGraphs(lastChart[1]);
  //     setRadarGraphs(lastChart[2]);
  //     setPrevCharts(tempCharts);
  //     // }
  //   }

  function modifyDatum(field, value) {
    console.log({ graphIndex });
    let tempItem = cloneThing(graphArr);
    tempItem[graphIndex][field] = value;
    console.log({ tempItem });
    setGraphArr(tempItem);
    // setDatumSettings(tempItem);
  }

  function modifyGraph(field, value) {
    let tempItem = cloneThing(graphSettings);
    tempItem[field] = value;
    console.log({ tempItem });
    setGraphSettings(tempItem);
  }

  function handleGap(e) {
    console.log("things");
    let temp = cloneThing(graphSettings);
    temp.categoriesGap = e;
    setGraphSettings(temp);
    forceUpdate();
  }

  async function handleDownloadImage() {
    toPng(document.getElementById("graph")).then(function (dataUrl) {
      download(dataUrl, graphSettings.chartName ? graphSettings.chartName : "redFishBlueFishChart" + ".png");
    });
  }

  return (
    <>
      <div role="tablist" className="join  mt-1   w-80">
        <a
          //   role="tab"
          onClick={() => {
            setActiveTab("main");
          }}
          className={"join-item  btn btn-outline btn-sm   " + (activeTab === "main" && " btn-active ")}
        >
          Main
        </a>
        {graphArr.map((graph, index) => {
          return (
            <a
              key={"layer" + index}
              role="tab"
              onClick={() => {
                setActiveTab(index);
                setGraphIndex(index);
              }}
              className={"join-item  btn btn-outline btn-sm z-50 " + (activeTab === index && " btn-active ")}
            >
              {graph.chartType + " Layer " + (index + 1)}
            </a>
          );
        })}
      </div>
      <div className="join w-screen justify-end flex pr-14">
        {graphArr.filter((el) => el.chartType === "Radar").length === 0 && (
          <>
            <div
              onClick={() => {
                handleNew("Bar");
              }}
              className=" btn btn-outline join-item text-black gap-2 btn-sm"
            >
              New Bar
            </div>
            <div onClick={() => handleNew("Line")} className=" btn btn-outline join-item text-black gap-2 z-50  btn-sm ">
              New Line
            </div>
          </>
        )}
        {graphArr.filter((el) => el.chartType === "Bar" || el.chartType === "Line").length === 0 && (
          <div onClick={() => handleNew("Radar")} className=" btn btn-outline join-item text-black gap-2 z-50 btn-sm">
            New Radar
          </div>
        )}
      </div>
      {graphArr.length > 0 && (
        <div onClick={handleDownloadImage} className="btn btn-ghost bg-red text-white ">
          Download
        </div>
      )}
      <div className="flex w-screen min-h-fit border-b-4">
        <div id="print" className="printObj w-4/5 flex  justify-center">
          <div className="flex justify-center h-min  w-[90%] mb-4 bg-white pt-28 rounded-xl shadow-lg">
            {graphArr.length > 0 && graphArr.filter((el) => el.chartType == "Bar" || el.chartType == "Line").length > 0 && (
              <BarTypeChart
                layer={activeTab}
                graphSettings={graphSettings}
                dataSet={groupedData}
                // categoriesGap={barCategoryGap}
                graphArr={graphArr}
              />
            )}
            {graphArr.length > 0 && graphArr.filter((el) => el.chartType == "Radar").length > 0 && (
              <RadarGraph layer={activeTab} graphSettings={graphSettings} dataSet={groupedData} graphArr={graphArr} />
            )}
          </div>
        </div>

        <div className="flex flex-col z-50 w-1/3">
          {/* {prevCharts && prevCharts.length > 0 && (
            <div>
              <button className="bg-red text-white btn btn-ghost" onClick={handleUndo}>
                Undo
              </button>
            </div>
          )} */}
          {prevCharts.length === 0 && (
            <div className="tooltip tooltip-bottom" data-tip="Start making charts below. You can always undo any mistakes">
              <button className="bg-slate-300 text-white btn btn-ghost disabled">Undo</button>
            </div>
          )}
          {graphArr.length > 0 && (
            <div className="flex flex-col gap-2 mr-8">
              <div className="flex justify-between px-2 z-40">
                <div>Set Aggregation field:</div>
                <DropDownControlled
                  selected={graphArr[graphIndex].dataKey}
                  actions={Object.keys(groupedData[0])}
                  setter={(item) => {
                    modifyDatum("dataKey", item);
                  }}
                  width="250px"
                />
              </div>
              <div className="flex justify-between px-2 z-30">
                <div>Set Data Name:</div>
                <DropDownControlled
                  selected={graphSettings.axisName}
                  actions={["", ...Object.keys(groupedData[0])]}
                  setter={(item) => modifyGraph("axisName", item)}
                  width="250px"
                />
              </div>
              {graphArr.filter((el) => el.chartType == "Radar").length === 0 && (
                <Slider value={graphSettings.width} text="Width" setter={(e) => modifyGraph("width", e)} />
              )}
              <Slider value={graphSettings.height} text="Height" setter={(e) => modifyGraph("height", e)} />

              {graphArr[graphIndex].chartType === "Bar" && (
                <Slider
                  value={graphSettings.categoriesGap}
                  text="Bar Gap"
                  max={50}
                  setter={(e) => {
                    handleGap(e);

                    // modifyGraph("height", graphSettings.height);
                  }}
                />
              )}
              {/* <div className="flex justify-between px-2">
                <div>Bar Gap:</div>
                <div className="flex gap-2">
                  <input
                    type="range"
                    min={0}
                    max={40}
                    value={barCategoryGap}
                    className="range range-info w-36"
                    onChange={(e) => setBarCategoryGap(e.target.value)}
                  />
                  <div>{barCategoryGap}</div>
                </div>
              </div> */}

              <div className="flex justify-between px-2">
                <div>Include Ticks:</div>
                <input type="checkbox" defaultChecked={true} className="toggle" onChange={(e) => modifyGraph("ticks", e.target.checked)} />
              </div>

              <div className="flex justify-between px-2">
                <div>Set Chart Title:</div>
                <input
                  value={graphSettings.chartName}
                  onChange={(e) => {
                    modifyGraph("chartName", e.target.value);
                  }}
                  type="text"
                />
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 ">
                  <div className="flex gap-2 items-center">
                    <ToggleColor
                      showColor={showColor}
                      item="Data Color"
                      setter={(el) => {
                        el === "Data Color" ? setShowColor("Data Color") : modifyDatum("fill", selectedColor);
                      }}
                    />
                    <div className="w-6 h-4 border-2 border-slate-300" style={{ backgroundColor: graphArr[graphIndex].fill }}></div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <ToggleColor
                      showColor={showColor}
                      item="Background"
                      setter={(el) => {
                        el === "Background" ? setShowColor("Background") : modifyGraph("bgColor", selectedColor);
                      }}
                    />
                    <div className="w-6 h-4 border-2 border-slate-300" style={{ backgroundColor: graphSettings.bgColor }}></div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <ToggleColor
                      showColor={showColor}
                      item="Title Color"
                      setter={(el) => {
                        el === "Title Color" ? setShowColor("Title Color") : modifyGraph("titleColor", selectedColor);
                      }}
                    />
                    <div className="w-6 h-4 border-2 border-slate-300" style={{ backgroundColor: graphSettings.titleColor }}></div>
                  </div>
                </div>
                <div className="mr-10">
                  <div className="flex">
                    <div>Theme: </div>
                    <DropDownControlled width="120px" selected={theme} actions={["None", "Theme 1"]} setter={setTheme} />
                  </div>
                  {theme === "None" && (
                    <SketchPicker
                      color={selectedColor}
                      onChangeComplete={(color) => {
                        console.log({ color });
                        setSelectedColor(color.hex);
                      }}
                    />
                  )}
                  {theme === "Theme 1" && (
                    <BlockPicker
                      onChangeComplete={(color) => {
                        console.log({ color });
                        setSelectedColor(color.hex);
                      }}
                      color={selectedColor}
                      colors={[
                        "#FFFFFF",
                        "#FDB517",
                        "#FFCB18",
                        "#09497B",
                        "#0E6AAD",
                        "#142F55",
                        "#0EA8DC",
                        "#666666",
                        "#333333",
                        "#999999",
                        "#CCCCCC",
                        "#E6E6E6",
                      ]}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default GraphBuilder;
