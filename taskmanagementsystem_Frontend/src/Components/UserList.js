import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/TaskList.css"; // reuse existing styles

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="task-list-container">
      <h2 className="task-title">Users List</h2>

      <table className="task-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>SMS Enabled</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="3" className="no-data">
                No users found
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={u.smsEnabled ? "sms-yes" : "sms-no"}>
                    {u.smsEnabled ? "✅ Yes" : "❌ No"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;