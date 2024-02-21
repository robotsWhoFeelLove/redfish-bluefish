import { handleDownload } from "./Utils/Download";
import logo from "../assets/fishBandW.svg";
import "./Navbar.css";
import water from "../assets/ripple2.jpg";

function NavBar({ currentScreen, setCurrentScreen, isAgg }) {
  return (
    <nav id="nav" style={{ backgroundImage: `url(${water})`, backgroundPosition: "" }} className="bg-blue-200">
      <div className="h-28 flex justify-between mr-4 backdrop:border-b-2 ml-14 border-blue-400">
        <div className="flex-class text-slate-800 -mt-14">
          {/*Just the logo.. Don't mind this*/}
          <h1>
            <span className="underline  decoration-red">Red</span> <span> Fish</span>
          </h1>
          <img className="w-32 mt-14 pl-10 -ml-4" src={logo} alt="" />
          <h1>
            <span className="underline decoration-blue-200">Blue</span> <span> Fish</span>
          </h1>
        </div>
        <div className="join flex self-start mt-2  items-center cursor-pointer">
          <div
            onClick={() => setCurrentScreen("graph")}
            className={"text-lg rounded-r-none btn btn-outline btn-sm join-item" + (currentScreen === "graph" && " btn-active")}
          >
            Graph Builder
          </div>
          {isAgg && (
            <div
              onClick={() => setCurrentScreen("data")}
              className={"text-lg rounded-l-none  btn btn-outline btn-sm join-item" + (currentScreen === "data" && " btn-active")}
            >
              Data Board
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
