import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

function RadarGraph({ dataSet, graphSettings, radarArr }) {
  return (
    <div className={"ml-[10%] h-[500px] w-[500px] flex flex-col items-center justify-center " + graphSettings.backgroundColor}>
      <h3 className="text-2xl font-semibold mb-10 mt-24">{graphSettings.chartName}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataSet}>
          <PolarGrid />
          <PolarAngleAxis dataKey={graphSettings.axisName} />
          {graphSettings.ticks && <PolarRadiusAxis />}
          {radarArr.map((radar, i) => {
            return <Radar key={"radar" + i} name={radar.displayName} dataKey={radar.dataKey} stroke="#8884d8" fill={radar.fill} fillOpacity={0.6} />;
          })}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RadarGraph;
