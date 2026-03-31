import ThemeToggle from "../contexts/ThemeToggle";
export default function Navbar() {
  return (
    <div className="flex justify-between items-center bg-white  dark:bg-gray-800 p-4 shadow">
      
      
        {/* SEARCH */}
        <input
          placeholder="Search by User id, User Name, Date etc"
          className="border px-3 py-2 rounded-lg w-80 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      
        {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        
        {/*  TOGGLE SWITCH */}
        <ThemeToggle />
      {/* RIGHT */}
    
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}