import { useEffect, useState } from "react";
import api from "../api";

export default function Todo() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  // Fetch all tasks
  const getTasks = async () => {
    const res = await api.get("/tasks");
    setList(res.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Add new task to DB
  const addTask = async () => {
    if (!task.trim()) return;

    const res = await api.post("/tasks", { title: task });

    setList([...list, res.data]); // Update list
    setTask(""); // Clear input
  };

  // Delete task from DB
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setList(list.filter((t) => t._id !== id));
  };

  return (
    <div>
      <h2>Your Tasks (MongoDB Connected)</h2>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {list.map((item) => (
          <li key={item._id}>
            {item.title}
            <button
              style={{ marginLeft: 10 }}
              onClick={() => deleteTask(item._id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
