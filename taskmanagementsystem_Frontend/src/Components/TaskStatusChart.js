import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import "../Styles/TaskStatusChart.css";

const STATUS_COLORS = {
  TODO: "#ef4444",         // red
  IN_PROGRESS: "#3b82f6",  // blue
  DONE: "#22c55e",         // green
};

function TaskStatusChart({ tasks }) {
  const data = ["TODO", "IN_PROGRESS", "DONE"].map((status) => ({
    status,
    count: tasks.filter((t) => t.status === status).length,
  }));

  return (
    <div className="chart-container">
      <h3 className="chart-title">Task Status</h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          barCategoryGap={30}   // ⬅️ controls spacing between bars
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="status"
            tick={{ fontSize: 14, fill: "#374151", fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 13, fill: "#374151" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Bar
            dataKey="count"
            barSize={60}        // ⬅️ INCREASED BAR WIDTH
            radius={[6, 6, 0, 0]} // ⬅️ rounded top
          >
            <LabelList
              dataKey="count"
              position="top"
              fill="#374151"
              fontSize={14}
              fontWeight={600}
            />

            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={STATUS_COLORS[entry.status]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TaskStatusChart;
