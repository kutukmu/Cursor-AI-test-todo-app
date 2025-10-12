import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../constants/colors";

type ThemeMode = "light" | "dark";

interface ThemeColors {
  background: readonly [string, string, string];
  cardBackground: string;
  text: string;
  textSecondary: string;
  textInverse: string;
  border: string;
  primary: string;
  primaryLight: string;
  completed: string;
  success: string;
  danger: string;
  overlay: string;
  warning: string;
}

interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const lightColors: ThemeColors = {
  background: Colors.gradients.sunrise as readonly [string, string, string], // Warm sunrise gradient
  cardBackground: Colors.neutral.white,
  text: Colors.neutral[900],
  textSecondary: Colors.neutral[600],
  textInverse: Colors.neutral.white,
  border: Colors.neutral[200],
  primary: Colors.primary.dark, // Darker orange for better contrast (#E2551F)
  primaryLight: Colors.primary[100],
  completed: Colors.neutral[400],
  success: Colors.success.main,
  danger: Colors.error.main,
  overlay: Colors.neutral[900],
  warning: Colors.warning.main,
};

const darkColors: ThemeColors = {
  background: Colors.gradients.coralEnergy as readonly [string, string, string], // Energetic coral gradient
  cardBackground: Colors.neutral[400], // Lighter for better readability
  text: Colors.neutral.black, // Black text for better contrast
  textSecondary: Colors.neutral[800], // Dark orange for secondary text
  textInverse: Colors.neutral.white,
  border: Colors.neutral[500],
  primary: Colors.primary.light, // Coral Glow
  primaryLight: Colors.primary[300],
  completed: Colors.neutral[600],
  success: Colors.success.dark,
  danger: Colors.error.dark,
  overlay: Colors.neutral.black,
  warning: Colors.warning.light,
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

