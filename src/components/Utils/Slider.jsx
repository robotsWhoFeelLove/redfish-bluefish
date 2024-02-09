function Slider({ setter, max, value, text }) {
  return (
    <div className="flex justify-between px-2">
      <div>{text + ":"}</div>
      <div className="flex gap-2">
        <input
          type="range"
          min={0}
          max={max ? max.toString() : "100"}
          value={value}
          className="range  w-36"
          onChange={(e) => setter(e.target.value)}
        />
        <div>{value + "%"}</div>
      </div>
    </div>
  );
}

export default Slider;
