import React, { useMemo } from "react";
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

const STATUS_LIST = ["TODO", "IN_PROGRESS", "DONE"];

const STATUS_COLORS_LIGHT = {
  TODO: "#ef4444",
  IN_PROGRESS: "#3b82f6",
  DONE: "#22c55e",
};

const STATUS_COLORS_DARK = {
  TODO: "#fca5a5",
  IN_PROGRESS: "#60a5fa",
  DONE: "#4ade80",
};

function TaskStatusChart({ tasks = [], darkMode }) {
  /* ================= OPTIMIZED DATA CALC ================= */
  const data = useMemo(() => {
    const counts = {
      TODO: 0,
      IN_PROGRESS: 0,
      DONE: 0,
    };

    for (let i = 0; i < tasks.length; i++) {
      const status = tasks[i]?.status;
      if (counts.hasOwnProperty(status)) {
        counts[status]++;
      }
    }

    return STATUS_LIST.map((status) => ({
      status,
      count: counts[status],
    }));
  }, [tasks]);

  const colors = darkMode ? STATUS_COLORS_DARK : STATUS_COLORS_LIGHT;
  const textColor = darkMode ? "#f3f4f6" : "#374151";
  const gridColor = darkMode ? "#374151" : "#e5e7eb";
  const tooltipBg = darkMode ? "#1f2937" : "#ffffff";
  const tooltipBorder = darkMode ? "#4b5563" : "#e5e7eb";
  const tooltipText = darkMode ? "#f3f4f6" : "#111827";

  /* ================= EMPTY STATE ================= */
  const totalTasks = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className={`chart-container ${darkMode ? "dark" : ""}`}>
      <h3 className="chart-title">Task Status</h3>

      {totalTasks === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 0",
            color: textColor,
            fontWeight: 500,
          }}
        >
          No task data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            barCategoryGap={30}
          >
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />

            <XAxis
              dataKey="status"
              tick={{ fontSize: 14, fill: textColor, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 13, fill: textColor }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                borderColor: tooltipBorder,
                color: tooltipText,
              }}
              itemStyle={{ color: tooltipText }}
            />

            <Bar
              dataKey="count"
              barSize={60}
              radius={[6, 6, 0, 0]}
              animationDuration={600}
            >
              <LabelList
                dataKey="count"
                position="top"
                fill={textColor}
                fontSize={14}
                fontWeight={600}
              />

              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[entry.status]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default TaskStatusChart;
