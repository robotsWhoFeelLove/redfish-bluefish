import { useEffect, useState } from "react";
import { ResponsiveContainer, ComposedChart, CartesianGrid, YAxis, XAxis, Tooltip, Legend, Bar, Line } from "recharts";

function BarTypeChart({ dataSet, graphSettings, graphArr, layer, categoriesGap }) {
  //   const [barGap, setBarGap] = useState(graphSettings.categoriesGap);
  //   console.log({ layer, dataSet, graphSettings, graphArr });
  console.log({ categoriesGap });
  //   useEffect(() => {
  //     setBarGap(graphSettings.categoriesGap);
  //   }, [graphSettings]);

  return (
    <div id="graph" className="w-[800px] h-[600px] ">
      <div
        style={{ width: graphSettings.width + "%", height: graphSettings.height + "%", backgroundColor: graphSettings.bgColor }}
        className="ml-[10%] h-[500px]  flex flex-col items-center justify-center "
      >
        <h3 style={{ color: graphSettings.titleColor }} className="text-2xl font-semibold mb-10 ">
          {graphSettings.chartName}
        </h3>
        <ResponsiveContainer width="100%" height="75%">
          <ComposedChart
            barGap={4}
            barCategoryGap={categoriesGap + "%"}
            width={500}
            height={400}
            data={dataSet}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <YAxis axisLine={false} type="number" tickInterval={1} tick={graphSettings.ticks} />
            <XAxis dataKey={graphSettings.axisName}></XAxis>
            <Tooltip />
            <Legend />
            {graphArr &&
              graphArr.map((graph, i) => {
                if (graph.chartType === "Bar") {
                  return <Bar key={"bar" + i} dataKey={graph.dataKey} fill={layer != "main" && layer != i ? "#00000000" : graph.fill} />;
                }
                if (graph.chartType === "Line")
                  return (
                    <Line
                      key={"line" + i}
                      strokeWidth={3}
                      legendType="line"
                      //   key="line2"
                      name={graph.displayName}
                      type="monotone"
                      dataKey={graph.dataKey}
                      stroke={layer != "main" && layer != i ? "#00000000" : graph.fill}
                    />
                  );
              })}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarTypeChart;
