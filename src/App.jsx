import { useState } from "react";
import "./App.css";
import DataBoard from "./components/DataBoard/DataBoard";
import { uploadHandler } from "./components/Utils/Upload";
import Begin from "./components/Begin/Begin";
import GraphBuilder from "./components/GraphBuilder/GraphBuilder";
import NavBar from "./components/NavBar";

function App() {
  const [data, setData] = useState("");
  const [unfilteredData, setUnfilteredData] = useState("");
  const [currentScreen, setCurrentScreen] = useState("data");
  const [groupedData, setGroupedData] = useState();

  function handleUpload(event) {
    uploadHandler(event, setData, setUnfilteredData);
  }

  return (
    <>
      {!data && <Begin uploadHandler={handleUpload} />}
      {data && <NavBar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} isAgg={groupedData && groupedData.length > 0} />}
      {currentScreen === "data" && (
        <DataBoard
          uploadHandler={handleUpload}
          setUnfilteredData={setUnfilteredData}
          unfilteredData={unfilteredData}
          groupedData={groupedData}
          setGroupedData={setGroupedData}
          data={data}
          setData={setData}
        />
      )}
      {currentScreen === "graph" && <GraphBuilder groupedData={groupedData} />}
    </>
  );
}

export default App;
