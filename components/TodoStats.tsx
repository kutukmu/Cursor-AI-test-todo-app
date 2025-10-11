import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Id } from "../convex/_generated/dataModel";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "../contexts/ThemeContext";

interface TodoStatsProps {
  todos: {
    _id: Id<"todos">;
    text: string;
    isCompleted: boolean;
    createdAt: number;
  }[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
  const { colors } = useTheme();
  const totalTodos = todos.length;
  const completedTodos = todos.filter((t) => t.isCompleted).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 
    ? Math.round((completedTodos / totalTodos) * 100) 
    : 0;

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.statCard,
          { 
            backgroundColor: colors.primaryLight,
            borderColor: colors.primaryLight,
          }
        ]}
        entering={FadeInDown.delay(50)}
      >
        <Text style={[styles.statNumber, { color: colors.overlay }]}>{totalTodos}</Text>
        <Text style={[styles.statLabel, { color: colors.overlay }]}>Total</Text>
      </Animated.View>

      <Animated.View 
        style={[
          styles.statCard,
          { 
            backgroundColor: colors.primaryLight,
            borderColor: colors.primaryLight,
          }
        ]}
        entering={FadeInDown.delay(100)}
      >
        <Text style={[styles.statNumber, { color: colors.overlay }]}>{activeTodos}</Text>
        <Text style={[styles.statLabel, { color: colors.overlay }]}>Active</Text>
      </Animated.View>

      <Animated.View 
        style={[
          styles.statCard,
          { 
            backgroundColor: colors.primaryLight,
            borderColor: colors.primaryLight,
          }
        ]}
        entering={FadeInDown.delay(150)}
      >
        <Text style={[styles.statNumber, { color: colors.overlay }]}>{completedTodos}</Text>
        <Text style={[styles.statLabel, { color: colors.overlay }]}>Done</Text>
      </Animated.View>

      <Animated.View 
        style={[
          styles.statCard,
          { 
            backgroundColor: colors.primaryLight,
            borderColor: colors.primaryLight,
          }
        ]}
        entering={FadeInDown.delay(200)}
      >
        <Text style={[styles.statNumber, { color: colors.overlay }]}>{completionRate}%</Text>
        <Text style={[styles.statLabel, { color: colors.overlay }]}>Progress</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
});

