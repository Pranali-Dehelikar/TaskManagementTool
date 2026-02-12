import React from "react";
import "../Styles/Report.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts";

const Report = ({ tasks = [] }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#00C49F", "#FF8042"];

  /* ================= DOWNLOAD PDF ================= */
  const downloadReport = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/reports/tasks/pdf",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to download report");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "task-report.pdf";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.message);
    }
  };

  /* ================= DATA PREP ================= */

  // 1. Tasks by Status
  const statusCounts = tasks.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = [
    {
      name: "Tasks",
      TODO: statusCounts.TODO || 0,
      IN_PROGRESS: statusCounts.IN_PROGRESS || 0,
      DONE: statusCounts.DONE || 0,
    },
  ];

  const radialData = [
    { name: "TODO", value: statusCounts.TODO || 0, fill: "#8884d8" },
    { name: "IN_PROGRESS", value: statusCounts.IN_PROGRESS || 0, fill: "#82ca9d" },
    { name: "DONE", value: statusCounts.DONE || 0, fill: "#ffc658" },
  ];

  // 2. Tasks per User (Pie without Cell)
  const userCounts = tasks.reduce((acc, t) => {
    if (t.assignedTo) {
      acc[t.assignedTo] = (acc[t.assignedTo] || 0) + 1;
    }
    return acc;
  }, {});

  const userData = Object.keys(userCounts).map((user, i) => ({
    name: user,
    count: userCounts[user],
    fill: COLORS[i % COLORS.length],
  }));

  // 3. Completion Trend
  const dateCounts = tasks.reduce((acc, t) => {
    if (t.completedAt) {
      const date = t.completedAt.split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {});

  const lineData = Object.keys(dateCounts)
    .sort()
    .map((date) => ({
      date,
      completed: dateCounts[date],
    }));

  const areaData = lineData.map((d, i) => ({
    date: d.date,
    cumulative: lineData
      .slice(0, i + 1)
      .reduce((sum, x) => sum + x.completed, 0),
  }));

  if (lineData.length === 0) {
    lineData.push({ date: "No Data", completed: 0 });
    areaData.push({ date: "No Data", cumulative: 0 });
  }

  /* ================= UI ================= */

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Task Reports</h2>
        <button className="download-btn" onClick={downloadReport}>
          Download PDF
        </button>
      </div>

      <div className="report-charts">
        {/* 1. Bar Chart */}
        <div className="chart-card">
          <h3>Tasks by Status</h3>
          <BarChart width={350} height={250} data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="TODO" fill="#8884d8" />
            <Bar dataKey="IN_PROGRESS" fill="#82ca9d" />
            <Bar dataKey="DONE" fill="#ffc658" />
          </BarChart>
        </div>

        {/* 2. Pie Chart (NO Cell) */}
        <div className="chart-card">
          <h3>Tasks per User</h3>
          <PieChart width={350} height={250}>
            <Pie
              data={userData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="count"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* 3. Radial Bar */}
        <div className="chart-card">
          <h3>Status Distribution</h3>
          <RadialBarChart
            width={350}
            height={250}
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="80%"
            data={radialData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar dataKey="value" background />
            <Tooltip />
          </RadialBarChart>

          <div className="polar-labels">
            {radialData.map((i) => (
              <span key={i.name} style={{ color: i.fill }}>
                {i.name}
              </span>
            ))}
          </div>
        </div>

        {/* 4. Line Chart */}
        <div className="chart-card">
          <h3>Completion Trend</h3>
          <LineChart width={350} height={250} data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="completed" stroke="#82ca9d" strokeWidth={3} />
          </LineChart>
        </div>

        {/* 5. Area Chart */}
        <div className="chart-card">
          <h3>Cumulative Completion</h3>
          <AreaChart width={350} height={250} data={areaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area dataKey="cumulative" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </div>

        {/* 6. Composed Chart */}
        <div className="chart-card">
          <h3>Status vs Trend</h3>
          <ComposedChart width={350} height={250} data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" barSize={20} fill="#82ca9d" />
            <Line dataKey="completed" stroke="#8884d8" />
          </ComposedChart>
        </div>
      </div>
    </div>
  );
};

export default Report;
