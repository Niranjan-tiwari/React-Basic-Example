import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import "./task-page.scss";

const Taskpage = () => {
  const [tasks, setTasks] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isCompleted, setCompleted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("data"))) {
      setTasks(JSON.parse(localStorage.getItem("data")));
    } else {
      setLoading(true);
      fetch("http://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((data) => {
          setTasks(data);
          setLoading(false);
          localStorage.setItem("data", JSON.stringify(data));
        });
    }
  }, []);

  const deleteTask = (id) => {
    setTasks(tasks.filter((el) => el.id !== id));
    localStorage.setItem(
      "data",
      JSON.stringify(tasks.filter((el) => el.id !== id))
    );
  };

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "isCompleted") {
      setCompleted(e.target.checked);
    }
  };

  const handleSubmit = () => {
    if (title) {
      let obj = {
        id: tasks.length + 1,
        title,
        completed: isCompleted,
      };
      tasks.unshift(obj);
      localStorage.setItem("data", JSON.stringify(tasks));
      setOpen(false);
    } else {
      setError(true);
    }
  };

  const TaskRow = ({ id, label, title, completed }) => (
    <div className="table-row">
      <div className="table-content">
        <div className="id-column">{label + 1}</div>
        <div className="task">
          {title.length > 25 ? `${title.substr(0, 25)}...` : title}
        </div>
        <div className="status">{completed ? "True" : "False"}</div>
      </div>
      <div className="btn-container">
        <div className="btn-delete" onClick={() => deleteTask(id)}>
          Delete
        </div>
      </div>
    </div>
  );

  console.log(JSON.parse(localStorage.getItem("data")));

  return (
    <div>
      <Navbar />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {Array.isArray(tasks) &&
            tasks.length > 0 &&
            tasks.map((task, idx) => (
              <TaskRow
                key={idx}
                label={idx}
                id={task.id}
                title={task.title}
                completed={task.completed}
              />
            ))}
        </>
      )}

      <div className="add-btn" onClick={() => setOpen(true)}>
        Add Task
      </div>
      <Modal show={isOpen}>
        <div className="add-form">
          <h1>Add Task</h1>
          <input
            className="text-input"
            value={title}
            name="title"
            type="text"
            placeholder="Enter task title"
            onChange={handleChange}
          />
          <div className="checkbox-container" style={{ display: "flex" }}>
            <span>Is completed ?</span>
            <input
              className="check-input"
              type="checkbox"
              name="isCompleted"
              onChange={handleChange}
            />
          </div>
          {error && <p style={{ color: "red" }}>Task title is required!</p>}
          <div className="contianer-button">
            <div className="button" onClick={() => setOpen(false)}>
              Close
            </div>
            <div
              className="button"
              onClick={handleSubmit}
              style={{ background: "#1d75d9", color: "#FFFFFF" }}
            >
              Add
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Taskpage;
