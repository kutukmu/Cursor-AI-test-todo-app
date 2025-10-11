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
  background: ["#667eea", "#764ba2", "#f093fb"],
  cardBackground: "#ffffff",
  text: "#333333",
  textSecondary: "#999999",
  border: "#e0e0e0",
  primary: "#667eea",
  primaryLight: "#ffffff33",
  completed: "#999999",
  success: "#4caf50",
  danger: "#ff4444",
  overlay: "#ffffff99",
};

const darkColors: ThemeColors = {
  background: ["#1a1a2e", "#16213e", "#0f3460"],
  cardBackground: "#2d2d44",
  text: "#ffffff",
  textSecondary: "#b0b0b0",
  border: "#3d3d5c",
  primary: "#7c8ff7",
  primaryLight: "#ffffff22",
  completed: "#666666",
  success: "#66bb6a",
  danger: "#ef5350",
  overlay: "#ffffffcc",
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

