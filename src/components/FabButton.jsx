export default function FabButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-indigo-500 w-12 h-12 rounded-full hover:bg-indigo-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
      title="Add new task"
    >
      <img src="..\src\assets\add-icon.svg" alt="edit" className="w-full h-5" />
    </button>
  );
}
