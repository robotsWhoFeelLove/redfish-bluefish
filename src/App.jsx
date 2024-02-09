import { useEffect, useState } from "react";
import "./App.css";
import DataBoard from "./components/DataBoard/DataBoard";
import { uploadHandler } from "./components/Utils/Upload";
import Begin from "./components/Begin/Begin";
import GraphBuilder from "./components/GraphBuilder/GraphBuilder";
import NavBar from "./components/NavBar";
import { blankGraph } from "./components/GraphBuilder/GraphBuilder";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import AggregateBoard from "./components/AggregationBoard/AggregateBoard";
import upDown from "./assets/UpDown.svg";
import { useLocalStorage } from "./components/Utils/useStorage";
import Footer from "./components/Footer";

function App() {
  const [data, setData] = useLocalStorage("data", "");
  const [unfilteredData, setUnfilteredData] = useLocalStorage("unfilteredData", "");
  const [currentScreen, setCurrentScreen] = useState("begin");
  const [groupedData, setGroupedData] = useLocalStorage("groupedData", undefined);
  const [graphSettings, setGraphSettings] = useLocalStorage("graphSettings", blankGraph);
  const [graphArr, setGraphArr] = useLocalStorage("graphArr", []);
  const [checkedGroups, setCheckedGroups] = useLocalStorage("checkedGroups", []);
  const [aggregations, setAggregations] = useLocalStorage("aggregations", []);
  const [sizes, setSizes] = useState([50, 50]);

  function handleUpload(event) {
    uploadHandler(event, setData, setUnfilteredData);
    setCurrentScreen("data");
  }

  function previousDataHandler(keep) {
    if (keep) {
      setCurrentScreen("data");
    }
    if (!keep) {
      setUnfilteredData("");
      setData("");
      setGroupedData(undefined);
      setGraphSettings(blankGraph);
      setGraphArr([]);
      setCheckedGroups([]);
      setAggregations([]);
    }
  }

  // useEffect(() => {
  //   if (data !== "") {
  //     setCurrentScreen("previous");
  //   }
  // });

  return (
    <>
      {currentScreen === "begin" && <Begin handler={handleUpload} prevHandler={previousDataHandler} data={data} />}
      {currentScreen !== "begin" && (
        <NavBar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} isAgg={groupedData && groupedData.length > 0} />
      )}
      {currentScreen === "previous" && <Begin handler={previousDataHandler} data={data} />}
      {currentScreen === "data" && (
        <>
          <PanelGroup style={{ height: "100vh" }} onLayout={setSizes} direction="vertical">
            <Panel defaultSize={sizes[0]}>
              <DataBoard
                uploadHandler={handleUpload}
                setUnfilteredData={setUnfilteredData}
                unfilteredData={unfilteredData}
                groupedData={groupedData}
                setGroupedData={setGroupedData}
                data={data}
                setData={setData}
              />
            </Panel>
            <PanelResizeHandle>
              <div className="w-screen flex justify-around items-center h-4 bg-slate-200 border border-slate-400">
                <div className="flex flex-col gap-[2px]">
                  <div className="w-3 h-[2px] bg-slate-400"></div>
                  <div className="w-3 h-[2px] bg-slate-400"></div>
                  <div className="w-3 h-[2px] bg-slate-400"></div>
                </div>
                {/* <img className="h-6 z-50 mt-0" src={upDown} alt="" />
                <div className="flex flex-col gap-[2px]">
                  <div className="w-3 h-[2px] bg-slate-400"></div>
                  <div className="w-3 h-[2px] bg-slate-400"></div>
                  <div className="w-3 h-[2px] bg-slate-400"></div>
                </div> */}
              </div>
              {/* <div className="h-2 w-5 bg-slate-700"></div> */}
            </PanelResizeHandle>
            <Panel defaultSize={sizes[1]}>
              <div>
                {data && (
                  <AggregateBoard
                    checkedGroups={checkedGroups}
                    setCheckedGroups={setCheckedGroups}
                    groupedData={groupedData}
                    setGroupedData={setGroupedData}
                    aggregations={aggregations}
                    setAggregations={setAggregations}
                    data={data}
                  />
                )}
              </div>
            </Panel>
          </PanelGroup>
        </>
      )}
      {currentScreen === "graph" && (
        <GraphBuilder
          groupedData={groupedData}
          graphSettings={graphSettings}
          setGraphSettings={setGraphSettings}
          graphArr={graphArr}
          setGraphArr={setGraphArr}
        />
      )}
      <Footer></Footer>
    </>
  );
}

export default App;
