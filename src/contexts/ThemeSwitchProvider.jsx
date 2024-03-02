import { ThemeProvider, createTheme } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";

const isDarkTheme = localStorage.getItem("mdb-theme") === "dark";

const ThemeSwitch = createContext();

const ThemeSwitchProvider = ({ children }) => {
  const [mode, setMode] = useState(isDarkTheme ? "dark" : "light");
  const theme = createTheme({
    palette: {
      mode,
    },
  });

  useEffect(() => {
    !isDarkTheme && document.documentElement.classList.remove("dark");
  }, []);

  return (
    <ThemeSwitch.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeSwitch.Provider>
  );
};

export default ThemeSwitchProvider;
export const useThemeSwitch = () => useContext(ThemeSwitch);
