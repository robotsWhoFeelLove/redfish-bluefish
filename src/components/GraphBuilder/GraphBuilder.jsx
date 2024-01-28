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

let blankDatum = {
  chartType: "",
  dataKey: "",
  displayName: "",
  fill: "#60a5fa",
};

let blankGraph = {
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

function GraphBuilder({ groupedData }) {
  //   const [field, setField] = useState("");
  const [graphSettings, setGraphSettings] = useState(blankGraph);
  const [graphArr, setGraphArr] = useState([]);
  const [prevCharts, setPrevCharts] = useState([]);
  const [showColor, setShowColor] = useState("Data Color");
  const [selectedColor, setSelectedColor] = useState("#60a5fa");
  const [theme, setTheme] = useState("None");
  const [activeTab, setActiveTab] = useState("main");
  const [graphIndex, setGraphIndex] = useState();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [barCategoryGap, setBarCategoryGap] = useState(10);

  function handleNew(item) {
    console.log("new " + item);
    blankDatum.chartType = item;
    setGraphIndex(graphArr.length);
    setGraphArr((x) => [...x, cloneThing(blankDatum)]);
  }

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
    // const element = document.querySelector("#print");
    // console.log({ element });
    toPng(document.getElementById("graph")).then(function (dataUrl) {
      download(dataUrl, graphSettings.chartName ? graphSettings.chartName : "redFishBlueFishChart" + ".png");
    });
    // const canvas = await html2canvas(element, { scale: 1 });
    // toPng(element).then(function (dataUrl) {
    //   var img = new Image();
    //   img.src = dataUrl;
    //   const link = document.createElement("a");

    //   link.href = img;
    //   link.download = "downloaded-image";

    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // });
    // const canvas = await html2canvas(element);
    // console.log(canvas);
    // const data = canvas.toDataURL("image/jpg");
    // const link = document.createElement("a");

    // link.href = data;
    // link.download = "downloaded-image.jpg";

    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  }

  return (
    <>
      <div role="tablist" className="tabs tabs-lifted tabs-sm mt-1  bg-blue-50 w-80">
        <a
          role="tab"
          onClick={() => {
            setActiveTab("main");
          }}
          className={"tab text-xs " + (activeTab === "main" && " tab-active ")}
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
              className={"tab text-xs " + (activeTab === index && " tab-active ")}
            >
              {graph.chartType + " Layer " + (index + 1)}
            </a>
          );
        })}
      </div>
      <div className="flex gap-2">
        <div>{"Active Tab: " + activeTab}</div>
        <div
          onClick={() => {
            handleNew("Bar");
          }}
          className="btn btn-ghost bg-blue-400 text-white gap-2"
        >
          New Bar
        </div>
        <div onClick={() => handleNew("Line")} className="btn btn-ghost bg-blue-400 text-white gap-2 z-50">
          New Line
        </div>

        <div className="btn btn-ghost bg-blue-400 text-white gap-2 z-50">New Radar</div>
        {graphArr.length > 0 && (
          <div onClick={handleDownloadImage} className="btn btn-ghost bg-red text-white">
            Download
          </div>
        )}
      </div>
      <div className="flex w-screen h-screen">
        <div id="print" className="printObj w-4/5 flex justify-center">
          <div className="flex justify-center min-h-content h-[600px] w-[90%]  bg-white pt-28 rounded-xl">
            {graphArr.length > 0 && (
              <BarTypeChart
                layer={activeTab}
                graphSettings={graphSettings}
                dataSet={groupedData}
                categoriesGap={barCategoryGap}
                graphArr={graphArr}
              />
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
              <Slider value={graphSettings.width} text="Width" setter={(e) => modifyGraph("width", e)} />
              <Slider value={graphSettings.height} text="Height" setter={(e) => modifyGraph("height", e)} />

              {/* {graphArr[graphIndex].chartType === "Bar" && (
                <Slider
                  value={graphSettings.categoriesGap}
                  text="Bar Gap"
                  max={50}
                  setter={(e) => {
                    handleGap(e);

                    // modifyGraph("height", graphSettings.height);
                  }}
                />
              )} */}
              <div className="flex justify-between px-2">
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
              </div>

              <div className="flex justify-between px-2">
                <div>Include Ticks:</div>
                <input type="checkbox" className="toggle" onChange={(e) => modifyGraph("ticks", e.target.checked)} />
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
