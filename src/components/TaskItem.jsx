export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const priorityColor = {
    low: "bg-green-200 text-green-800",
    medium: "bg-yellow-200 text-yellow-800",
    high: "bg-red-200 text-red-800",
  };

  return (
    <li className="flex justify-between items-start max-w-xl border-b border-indigo-600 mx-auto pb-3 px-1">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 mt-1 checked:bg-indigo-500 border border-indigo-500 hover:bg-indigo-600 hover:checked:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:checked:bg-indigo-600 dark:bg-[#252525] dark:checked:bg-indigo-500 rounded transition-colors duration-300"
        />

        <div className="flex flex-col">
          <h3
            className={`text-justify text-left text-x font-bold break-words whitespace-normal w-[50vh] ${
              task.completed
                ? "line-through font-semibold text-gray-400 break-words whitespace-normal w-[50vh]"
                : ""
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-justify text-left text-sm text-gray-500 break-words whitespace-normal w-[50vh]">
              {task.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2 items-start mt-1">
        {task.deadline && (
          <p className="text-xs text-gray-500 break-words whitespace-normal w-[70px]">
            Deadline: {new Date(task.deadline).toLocaleString()}
          </p>
        )}
        <span
          className={`mt-1 text-xs px-2 py-1 rounded break-words whitespace-normal w-[60px] ${
            priorityColor[task.priority]
          }`}
        >
          {task.priority}
        </span>
        <button
          onClick={() => onEdit(task)}
          className="w-3 h-5 hover:brightness-125 hover:invert transition"
          title="Edit task"
        >
          <img src="..\src\assets\edit-icon.svg" alt="edit" className="w-full h-full" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="w-3 h-5 hover:brightness-125 hover:invert transition"
          title="Delete task"
        >
          <img src="..\src\assets\delete-icon.svg" alt="edit" className="w-full h-full" />
        </button>
      </div>
    </li>
  );
}
