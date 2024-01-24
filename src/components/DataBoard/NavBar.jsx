import { handleDownload } from "../Utils/Download";
import logo from "../../assets/whiteBracketLogo.svg";
import "./Navbar.css";

function NavBar({ data, prevData, handleUndo }) {
  return (
    <nav className="bg-blue-100">
      <a className="absolute text-xs bottom-0 ml-64" href="https://github.com/robotsWhoFeelLove/onefish-twofish?tab=readme-ov-file">
        powered by onefish-twofish
      </a>
      <div className="h-24 flex border-b-2 justify-around border-blue-400">
        <div className="flex-class">
          {/*Just the logo.. Don't mind this*/}
          <h1>
            <span className="underline decoration-red">Red</span> Fish
          </h1>
          <img className="w-52 mt-20 pl-10" src={logo} alt="" />
          <h1>
            <span className="underline decoration-blue-200">Blue</span> Fish
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            className="p-1 btn btn-ghost h-10 border bg-red bg-opacity-90 rounded text-white mt-6"
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
      </div>
    </nav>
  );
}

export default NavBar;
