import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";

export default function TaskModal({ onClose, onSave, defaultTask = null }) {
  const isEdit = !!defaultTask;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("medium");

  const priorityOptions = [
    { value: "low", label: "Low priority" },
    { value: "medium", label: "Medium priority" },
    { value: "high", label: "High priority" },
  ];

  useEffect(() => {
    if (defaultTask) {
      setTitle(defaultTask.title || "");
      setDescription(defaultTask.description || "");
      setDeadline(defaultTask.deadline || "");
      setPriority(defaultTask.priority || "medium");
    }
  }, [defaultTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title,
      description,
      deadline,
      priority,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#252525] border border-indigo-500 text-black dark:text-white p-6 rounded-lg transition-colors duration-300 shadow w-96 text-left">
        <h2 className="text-lg font-bold mb-4">
          {isEdit ? "EDIT TASK" : "NEW TASK"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-indigo-500 rounded bg-white text-black dark:bg-[#252525] dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-indigo-500 rounded bg-white text-black dark:bg-[#252525] dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <p className="text-m font-semibold">Set deadline</p>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-3 py-2 border border-indigo-500 rounded bg-white text-black dark:bg-[#252525] dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />

          <p className="text-m font-semibold">Set priority</p>
          <div className="relative">
            <Listbox value={priority} onChange={setPriority}>
              <Listbox.Button className="text-left w-full px-3 py-2 border border-indigo-500 rounded bg-white text-black dark:bg-[#252525] dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-200 appearance-none">
                {priorityOptions.find((opt) => opt.value === priority).label}
              </Listbox.Button>
              <Listbox.Options className="absolute text-left w-full text-indigo-500 hover:font-semibold mt-1 w-full bg-white outline-none focus:ring-2 focus:ring-indigo-500 rounded shadow-none z-10">
                {priorityOptions.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option.value}
                    className={({ active, selected }) =>
                      `px-3 py-2 cursor-pointer text-sm ${
                        active
                          ? "bg-indigo-100 text-indigo-500 rounded"
                          : "text-indigo-500 font-semibold"
                      } ${selected ? "font-semibold" : ""}`
                    }
                  >
                    {option.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
              <img
                src="..\src\assets\chevron-top-icon.svg"
                alt="search"
                className="w-3 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 brightness-125 invert dark:invert-0 pointer-events-none"
              />
            </Listbox>
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border border-indigo-500 text-indigo-500 px-4 py-2 rounded hover:bg-indigo-600 dark:hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
            >
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
