function ToggleColor({ item, setter, showColor }) {
  return (
    <div
      className={"btn btn-ghost text-white w-20 bg-blue-400 " + (showColor === item && "outline outline-3 outline-red ")}
      // style={{ backgroundColor: datumSettings.fill }}
      onClick={() => {
        showColor === item ? setter("color") : setter(item);
      }}
    >
      {showColor === item ? "Set " + item : item}
    </div>
  );
}

export default ToggleColor;
