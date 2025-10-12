import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const { colors, theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "rgba(34, 23, 16, 0.8)" : "rgba(248, 247, 245, 0.8)",
          borderTopWidth: 1,
          borderTopColor: isDark ? "rgba(245, 135, 61, 0.3)" : "rgba(245, 135, 61, 0.2)",
          paddingBottom: Platform.OS === "ios" ? 40 : 32,
          paddingTop: 20,
          height: Platform.OS === "ios" ? 115 : 105,
        },
        tabBarActiveTintColor: "#f5873d",
        tabBarInactiveTintColor: isDark ? "rgba(248, 247, 245, 0.6)" : "#8a7160",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
          marginTop: 8,
          marginBottom: 0,
        },
        tabBarIconStyle: {
          marginTop: 0,
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="plan"
        options={{
          title: "Plan",
          tabBarIcon: ({ color }: { color: string; focused: boolean }) => (
            <MaterialIcons name="calendar-today" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }: { color: string; focused: boolean }) => (
            <MaterialIcons name="explore" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ color }: { color: string; focused: boolean }) => (
            <MaterialIcons name="leaderboard" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }: { color: string; focused: boolean }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
