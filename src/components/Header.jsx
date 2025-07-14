import { Listbox } from "@headlessui/react";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "completed", label: "Complete" },
  { value: "uncompleted", label: "Incomplete" },
];

export default function Header({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  onMarkAllComplete,
  isDark,
  setIsDark,
  onLogout,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 w-full max-w-5xl mx-auto mb-6 px-2">

      <div className="relative w-full max-w-[500px]">
        <input
          type="text"
          placeholder="Search note..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pr-10 pl-4 py-2 border border-indigo-500 rounded bg-white text-black dark:bg-[#252525] dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors duration-300"
        />

        <img
          src="..\src\assets\search-icon.svg"
          alt="search"
          className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
        />
      </div>

      <div className="relative">
        <Listbox value={filterStatus} onChange={setFilterStatus}>
          <Listbox.Button className="text-left bg-indigo-500 rounded text-white w-[90px] px-2 py-2 hover:bg-indigo-600 focus:outline-none appearance-none">
            {filterOptions.find((opt) => opt.value === filterStatus)?.label}
          </Listbox.Button>
          <Listbox.Options className="absolute text-left w-[90px] text-indigo-500 hover:font-semibold mt-1 w-full bg-white outline-none focus:ring-2 focus:ring-indigo-500 rounded shadow-none z-10">
            {filterOptions.map((option) => (
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
            className="w-3 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          />
        </Listbox>
      </div>

      <button
        onClick={onMarkAllComplete}
        className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded hover:bg-indigo-600"
        title="Mark all as complete"
      >
        <img
          src="..\src\assets\mark-all-icon.svg"
          alt="edit"
          className="w-full h-8"
        />
      </button>

      <button
        onClick={() => setIsDark(!isDark)}
        className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded hover:bg-indigo-600"
        title="Toggle theme"
      >
        <img
          src={
            isDark
              ? "../src/assets/light-toggle-icon.svg"
              : "../src/assets/dark-toggle-icon.svg"
          }
          alt="theme toggle"
          className="w-5 h-5"
        />
      </button>

      <button
        onClick={onLogout}
        className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded hover:bg-indigo-600"
        title="Log out"
      >
        <img
        src="../src/assets/logout-icon.svg"
        alt="logout"
        className="w-full h-5 invert"
        />
      </button>
    </div>
  );
}
