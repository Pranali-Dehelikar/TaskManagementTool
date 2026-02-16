import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getTasksByDate } from "../Api/taskApi";

import "../Styles/TaskCalendar.css";


const TaskCalendar = ({ setTasks, token, darkMode }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = async (date) => {
    setSelectedDate(date);

    const formattedDate = date.toLocaleDateString("en-CA"); 
    // YYYY-MM-DD (safe for India timezone)

    try {
      const res = await getTasksByDate(formattedDate, token);
      setTasks(res.data || []);
    } catch (error) {
      console.error("Date fetch failed:", error);
    }
  };

 return (
  <div className={`calendar-wrapper ${darkMode ? "dark" : ""}`}>
    <h3 className="calendar-title">Task Calendar</h3>
    <Calendar
      onChange={handleDateChange}
      value={selectedDate}
    />
  </div>
);

};

export default TaskCalendar;
