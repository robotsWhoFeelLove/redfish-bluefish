import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";

function RadarGraph({ dataSet, graphSettings, graphArr, layer }) {
  return (
    <div id="graph" className="w-[600px] h-[500px] ">
      <div
        style={{ height: graphSettings.height + "%", backgroundColor: graphSettings.bgColor }}
        className="h-[500px]  flex flex-col items-center justify-center "
      >
        <h3 style={{ color: graphSettings.titleColor }} className="text-2xl font-semibold mb-10 ">
          {graphSettings.chartName}
        </h3>{" "}
        <ResponsiveContainer width="100%" height="70%">
          <RadarChart cx="50%" cy="50%" outerRadius="90%" data={dataSet}>
            <PolarGrid />

            <PolarAngleAxis dataKey={graphSettings.axisName} />
            {graphSettings.ticks && <PolarRadiusAxis />}
            {graphArr.map((radar, i) => {
              return (
                <Radar
                  fill={layer != "main" && layer != i ? "#00000000" : radar.fill}
                  key={"radar" + i}
                  dataKey={radar.dataKey}
                  stroke={layer != "main" && layer != i ? "#00000000" : radar.fill}
                  fillOpacity={0.6}
                />
              );
            })}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RadarGraph;
