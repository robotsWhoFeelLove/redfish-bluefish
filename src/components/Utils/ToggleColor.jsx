function ToggleColor({ item, setter, showColor }) {
  return (
    <div
      className={"btn btn-outline btn-sm text-slate-900 w-20  " + (showColor === item && "btn-active")}
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
