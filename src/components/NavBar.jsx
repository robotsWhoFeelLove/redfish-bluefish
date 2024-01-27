import { handleDownload } from "./Utils/Download";
import logo from "../assets/whiteBracketLogo.svg";
import "./Navbar.css";

function NavBar({ currentScreen, setCurrentScreen, isAgg }) {
  return (
    <nav id="nav" className="bg-blue-100">
      <a className="absolute text-xs bottom-0 ml-64" href="https://github.com/robotsWhoFeelLove/onefish-twofish?tab=readme-ov-file">
        powered by onefish-twofish
      </a>
      <div className="h-20 flex justify-between mr-4 backdrop:border-b-2 ml-14 border-blue-400">
        <div className="flex-class ">
          {/*Just the logo.. Don't mind this*/}
          <h1>
            <span className="underline decoration-red">Red</span> <span> Fish</span>
          </h1>
          <img className="w-48 mt-20 pl-10" src={logo} alt="" />
          <h1>
            <span className="underline decoration-blue-200">Blue</span> <span> Fish</span>
          </h1>
        </div>
        <div className="flex h-full  items-center gap-2 cursor-pointer">
          <div onClick={() => setCurrentScreen("graph")} className={"text-2xl rounded " + (currentScreen === "graph" && " border-2")}>
            Graph Builder
          </div>
          <div onClick={() => setCurrentScreen("data")} className={"text-2xl  rounded " + (currentScreen === "data" && " border-2")}>
            Data Board
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
