import { useState } from "react";
import Waves from "./Waves";
import testWaves from "./testWaves";

function Begin({ handler, data, prevHandler }) {
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
          {!data && (
            <div className="w-[400px] h-[180px] rounded border-2 border-[#e0484d] flex flex-col justify-center items-center bg-blue-200">
              <div className="text-lg mb-2 text-[#121212]  wrap text-center flex flex-col">
                <div>Upload a spreadsheet</div>
              </div>
              <label className=" btn btn-ghost font-lato bg-[#e0484d] text-white rounded px-6 py-2">
                <input className="hidden" type="file" name="file" onChange={(e) => handler(e)} />
                Select File
              </label>
            </div>
          )}
          {data && (
            <div className="w-[400px] h-[180px] rounded border-2 border-[#e0484d] flex flex-col justify-center items-center bg-blue-200">
              <div className="text-md font-bold mb-2 text-[#121212]  wrap text-center flex flex-col">
                <div>It Looks like you were working on something previously!</div>
              </div>
              <div className="text-md font-bold mb-2 text-[#121212] mt-6 wrap text-center flex flex-col">
                <div>Would you like to open your previous project?</div>
              </div>
              <div className="flex">
                <button onClick={() => prevHandler(true)} className="text-white btn btn-ghost m-4 bg-blue-400">
                  Open Project
                </button>
                <button onClick={() => prevHandler(false)} className="text-white btn btn-ghost m-4 bg-red">
                  Delete Forever
                </button>
              </div>
            </div>
          )}
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
