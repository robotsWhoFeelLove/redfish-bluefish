import { handleDownload } from "./Utils/Download";
import logo from "../assets/fishBandW.svg";
import "./Navbar.css";
import water from "../assets/ripple2.jpg";

function NavBar({ currentScreen, setCurrentScreen, isAgg }) {
  return (
    <nav id="nav" style={{ backgroundImage: `url(${water})`, backgroundPosition: "" }} className="bg-blue-200 -mt-14 z-20">
      <div className=" flex justify-between mr-4 backdrop:border-b-2 mt-10 ml-14 border-blue-400">
        <div className="flex-class text-slate-800 -mt-14">
          {/*Just the logo.. Don't mind this*/}
          <h1 className="">
            <span className="text-sm underline  decoration-red">Red</span> <span className="text-sm"> Fish</span>
          </h1>
          <img className="w-32 mt-20 pl-10 -ml-4" src={logo} alt="" />
          <h1>
            <span className="underline decoration-blue-200 text-xs">Blue</span> <span className="text-xs"> Fish</span>
          </h1>
        </div>
        <div className="join flex self-start  items-center cursor-pointer mt-6">
          <div
            onClick={() => setCurrentScreen("graph")}
            className={"text-lg rounded-r-none btn btn-outline btn-sm join-item" + (currentScreen === "graph" && " btn-active")}
          >
            Graph Builder
          </div>
          {isAgg && (
            <div
              onClick={() => setCurrentScreen("data")}
              className={"text-lg  btn btn-outline btn-sm join-item rounded-l-none" + (currentScreen === "data" && " btn-active")}
            >
              Data Board
            </div>
          )}
          {/* <div
            className={"text-lg btn btn-outline btn-sm join-item rounded-l-none  " + (currentScreen === "help" && " btn-active")}
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            Help
          </div> */}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
