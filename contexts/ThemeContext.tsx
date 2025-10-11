import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeMode = "light" | "dark";

interface ThemeColors {
  background: readonly [string, string, string];
  cardBackground: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  primaryLight: string;
  completed: string;
  success: string;
  danger: string;
  overlay: string;
}

interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const lightColors: ThemeColors = {
  background: ["#ff9a9e", "#fecfef", "#fbc2eb"], // Soft pink gradient
  cardBackground: "#ffffff",
  text: "#4a4a4a",
  textSecondary: "#999999",
  border: "#ffd6e8",
  primary: "#ff6b9d", // Pink
  primaryLight: "#ffffff33",
  completed: "#c4c4c4",
  success: "#ff85a1", // Rose pink for completed
  danger: "#ff4081",
  overlay: "#ffffffdd",
};

const darkColors: ThemeColors = {
  background: ["#2c1a3d", "#4a1f5c", "#6b2d7a"], // Deep purple gradient
  cardBackground: "#3d2651",
  text: "#fce4ec",
  textSecondary: "#c4a5cf",
  border: "#5a3768",
  primary: "#f48fb1", // Light pink
  primaryLight: "#ffffff22",
  completed: "#8e8e8e",
  success: "#ce93d8", // Lavender for completed
  danger: "#ff4081",
  overlay: "#fce4ecdd",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.log("Error loading theme:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem("theme", newTheme);
    } catch (error) {
      console.log("Error saving theme:", error);
    }
  };

  const colors = theme === "light" ? lightColors : darkColors;

  if (isLoading) {
    return null; // or a loading screen
  }

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

