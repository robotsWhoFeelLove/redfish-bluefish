import { useState } from "react";
import Waves from "./Waves";
import testWaves from "./testWaves";

function Begin({ uploadHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <div
          // onClick={() => {
          //   setSelectedItem("");
          // }}
          className="absolute z-50 flex flex-col w-screen justify-center h-screen items-center "
        >
          <div className="w-[400px] h-[180px] rounded border-2 border-[#e0484d] flex flex-col justify-center items-center bg-blue-200">
            <div className="text-lg mb-2 text-[#121212]  wrap text-center flex flex-col">
              <div>Upload a spreadsheet</div>
              {/* <div>a </div>
              <div>Spreadsheet</div> */}
            </div>
            <label
              className=" btn btn-ghost font-lato bg-[#e0484d] text-white rounded px-6 py-2"
              // style={{
              //   background: "linear-gradient(to bottom right, #666666,#09497B, #09497B,#09497B,#09497B,#09497B, #FFCB18)",
              // }}
            >
              <input className="hidden" type="file" name="file" onChange={(e) => uploadHandler(e)} />
              Select File
            </label>
          </div>
        </div>
      )}
      {!isOpen && (
        <div className="z-50 absolute w-screen h-screen flex flex-col justify-center items-center ">
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="btn btn-ghost bg-[#e0484d] text-white rounded px-6 py-2 font-lato"
          >
            Begin
          </button>
        </div>
      )}
      <Waves />
    </>
  );
}

export default Begin;
