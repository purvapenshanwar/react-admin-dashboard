import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { dark, setDark } = useTheme();

  return (
    <button
      onClick={() => setDark(!dark)}
      className={`w-14 h-7 flex items-center rounded-full p-1 transition duration-300 ${
        dark ? "bg-green-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${
          dark ? "translate-x-7" : ""
        }`}
      />
    </button>
  );
}