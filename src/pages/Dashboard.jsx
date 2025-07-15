import { useState, useEffect } from "react";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import TaskModal from "../components/TaskModal";
import FabButton from "../components/FabButton";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("deadline");

  const addTask = async (newData) => {
    try {
      const res = await API.post("/tasks", newData);
      if (!res.data?.task) throw new Error("Invalid task response");
      setTasks((prev) => [res.data.task, ...prev]);
    } catch (err) {
      console.error("Gagal menambah task:", err);
    }
  };

  const updateTask = async (updateData) => {
    try {
      await API.put(`/tasks/${editTask.id}`, updateData);
      setTasks((prev) =>
        prev.map((t) => t.id === editTask.id ? { ...t, ...updateData } : t)
      );
    } catch (err) {
      console.error("Gagal update task:", err);
    }
  };

  const toggleComplete = async (id) => {
    const task = tasks.find((t) => t.id === id);
    const updated = { ...task, completed : !task.completed };

    try {
      await API.put(`/tasks/${id}`, updated);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
    } catch (err) {
      console.error("Gagal toggle task:", err);
    }
  };

  const deleteTask = async (id) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    if (!taskToDelete) return;

    try {
      await API.delete(`/tasks/${id}`);

      setTasks(tasks.filter((t) => t.id !== id));

      let countdown = 10;

      const intervalId = setInterval(() => {
        setDeletedTasks((prev) =>
          prev.map((item) =>
            item.task.id === id
              ? { ...item, countdown: item.countdown - 1 }
              : item
          )
        );
      }, 1000);

      const timeoutId = setTimeout(() => {
        setDeletedTasks((prev) => prev.filter((item) => item.task.id !== id));
        clearInterval(intervalId);
      }, 10000);

      setDeletedTasks((prev) => [
        ...prev,
        {
          task: taskToDelete,
          countdown,
          timeoutId,
          intervalId,
        },
      ]);
    } catch (err) {
      console.error("Gagal hapus task dari server:", err);
    }
  };

  const undoDelete = async (id) => {
    const item = deletedTasks.find((d) => d.task.id === id);
    if (!item) return;

    try {
      const { id, ...rest } = item.task;

      const res = await API.post("/tasks", rest);

      if (!res.data?.task) throw new Error("Invalid undo response");
      setTasks((prev) => [res.data.task, ...prev]);

      setDeletedTasks((prev) => prev.filter((d) => d.task.id !== id));
      clearTimeout(item.timeoutId);
      clearInterval(item.intervalId);
    } catch (err) {
      console.error("Gagal undo delete:", err);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };

  const getFilteredTask = async () => {
    try {
      const token = localStorage.getItem("token");

      const params = {};
      if (filterStatus === "completed") params.completed = true;
      else if (filterStatus === "uncompleted") params.completed = false;

      if (sortBy) params.sort = sortBy;
      
      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });

      const filtered = res.data.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setTasks(filtered);
    } catch (err) {
      console.error("Gagal fetch tasks:", err);
    }
  };

  const markAll = async () => {
    try {
      const updatedTasks = [];

    for (const task of tasks) {
      if (!task.completed) {
        const updatedTask = { ...task, completed: true };
        await API.put(`/tasks/${task.id}`, updatedTask);
        updatedTasks.push(updatedTask);
      } else {
        updatedTasks.push(task);
      }
    }

      setTasks(updatedTasks);
    } catch (err) {
      console.error("Gagal mark all as complete:", err);
    }
  };

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const confirmLogout = () => {
    setShowLogout(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error("gagal fetch tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    getFilteredTask();
  }, [filterStatus, searchTerm, sortBy]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#252525] dark:text-white transition-colors duration-300">
      <h1 className="text-center text-2xl font-bold mb-4">TODO LIST</h1>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onMarkAllComplete={markAll}
        isDark={isDark}
        setIsDark={setIsDark}
        onLogout={confirmLogout}
      />

      {deletedTasks.map(({ task, countdown }) => (
        <div key={task.id} className="mt-2 flex justify-center">
          <button
            onClick={() => undoDelete(task.id)}
            className="flex items-center gap-1 px-2 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded transition-colors duration-200 focus:outline-none"
          >
            <div className="relative w-8 h-8">
              <img
                src="..\src\assets\progress-circle-icon.svg"
                alt="progress countdown"
                className="w-40 h-full animate-spin"
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                {countdown}
              </span>
            </div>
            <span className="text-lg tracking-wide font-light">UNDO</span>
            <img src="..\src\assets\undo-arrow-icon.svg" className="w-4 h-4" />
          </button>
        </div>
      ))}

      <TaskList
        tasks={tasks}
        onToggle={toggleComplete}
        onDelete={deleteTask}
        onEdit={handleEdit}
      />

      <FabButton onClick={() => setShowModal(true)} />

      {showModal && (
        <TaskModal
          onClose={() => {
            setShowModal(false);
            setEditTask(null);
          }}
          onSave={editTask ? updateTask : addTask}
          defaultTask={editTask}
        />
      )}

      {showLogout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#252525] text-black dark:text-white p-6 rounded-lg border border-indigo-500 w-[300px] text-center transition-colors duration-300">
            <p className="text-lg font-semibold mb-6">
              Are you sure want to log out?
            </p>
            <div className="flex justify-center gap-8">
              <button
                onClick={() => setShowLogout(false)}
                className="px-4 py-2 border border-indigo-500 rounded text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-600 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-indigo-500 text-white px-8 py-2 rounded hover:bg-indigo-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
