import { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

function DropDown({ actions, width, setter, selected }) {
  //   const [selected, setSelected] = useState(defaultItem ? defaultItem : actions[0]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useDetectClickOutside({ onTriggered: () => setIsOpen(false) });

  //   console.log({ selected });

  useEffect(() => {
    if (!selected) setter(actions[0]);
  }, []);

  function handleOpen(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("clicked");
    setIsOpen(true);
  }

  return (
    <div style={{ width: width }} className="flex flex-col cursor-pointer text-slate-900 w-14">
      <div ref={ref} onClick={() => setIsOpen((x) => !x)}>
        <div className="text-sm mx-2  border border-slate-900 rounded flex justify-end shadow-lg">
          <span className="p-2 border-l rounded-l w-full text-center bg-white hyphens-auto">{selected}</span>
          {!isOpen && (
            <span onClick={(e) => handleOpen(e)} className="p-2 border-l bg-slate-900 text-white">
              &#x2228;
            </span>
          )}
          {isOpen && <span className="p-2 border-l bg-slate-900 text-white">^</span>}
        </div>
      </div>
      {isOpen && (
        <div className="p-2 mt-10 ml-4 bg-white border absolute z-50">
          {actions.map((action) => (
            <div
              key={action + "action"}
              onClick={() => {
                // setSelected(action);
                setIsOpen((x) => !x);
                setter(action);
              }}
              className={"hover:bg-slate-300  " + (action == selected && " text-blue-400 ") + (action != selected && " text-slate-400")}
            >
              {action}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;
