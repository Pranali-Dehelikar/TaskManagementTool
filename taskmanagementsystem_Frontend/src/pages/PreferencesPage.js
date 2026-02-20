import React from "react";
import TaskPreference from "../Components/TaskPreference";

const PreferencesPage = ({ userId, darkMode }) => {
  return (
    <div className="preferences-page">
      <TaskPreference userId={userId} darkMode={darkMode} />
    </div>
  );
};

export default PreferencesPage;
