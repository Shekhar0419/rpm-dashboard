import React from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const LineChart = ({ title, data, xKey, yKey, y2Key, yLabel }) => {
  return (
    <div className="card chart-card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="chart-body">
        <ResponsiveContainer width="100%" height={260}>
          <ReLineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis label={{ value: yLabel, angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={yKey} strokeWidth={2} />
            {y2Key && <Line type="monotone" dataKey={y2Key} strokeWidth={2} />}
          </ReLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
