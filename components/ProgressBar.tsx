import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../contexts/ThemeContext";

interface ProgressBarProps {
  totalTodos: number;
  completedTodos: number;
}

export default function ProgressBar({
  totalTodos,
  completedTodos,
}: ProgressBarProps) {
  const { colors } = useTheme();
  const progress = useSharedValue(0);
  const completionRate = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  useEffect(() => {
    progress.value = withTiming(completionRate, {
      duration: 300,
    });
  }, [completionRate]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  const getProgressColor = () => {
    if (completionRate === 100) return "#4caf50"; // Green when complete
    if (completionRate >= 50) return colors.primary; // Primary color
    return "#ff9800"; // Orange when low progress
  };

  const getProgressMessage = () => {
    if (totalTodos === 0) return "Add your first task!";
    if (completionRate === 100) return "All done! 🎉";
    if (completionRate >= 75) return "Almost there! 💪";
    if (completionRate >= 50) return "Great progress! 🚀";
    if (completionRate >= 25) return "Keep going! 👍";
    return "Just getting started! 🌟";
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: colors.overlay }]}>
          {getProgressMessage()}
        </Text>
        <Text style={[styles.percentage, { color: colors.overlay }]}>
          {Math.round(completionRate)}%
        </Text>
      </View>
      
      <View style={[styles.progressTrack, { backgroundColor: colors.primaryLight }]}>
        <Animated.View
          style={[
            styles.progressBar,
            { backgroundColor: getProgressColor() },
            animatedStyle,
          ]}
        />
      </View>
      
      <Text style={[styles.stats, { color: colors.overlay }]}>
        {completedTodos} of {totalTodos} tasks completed
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  percentage: {
    fontSize: 18,
    fontWeight: "bold",
  },
  progressTrack: {
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 6,
  },
  stats: {
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
  },
});

