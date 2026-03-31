import { createContext, useContext, useEffect, useState } from "react";

/* ✅ DEFINE TYPE */
type ThemeContextType = {
  dark: boolean;
  setDark: (value: boolean) => void;
};

/* ✅ GIVE DEFAULT TYPE */
const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: any) {
  const [dark, setDark] = useState(false);

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Update theme when toggled
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ✅ SAFE HOOK */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};