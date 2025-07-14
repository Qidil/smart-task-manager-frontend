import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center text-center mt-12">
        <img
          src="..\src\assets\Detective-check-footprint-1.svg"
          alt="Empty"
          className="w-48 mb-4"
        />
        <p className="text-gray-500">Empty...</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4 items-center">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
