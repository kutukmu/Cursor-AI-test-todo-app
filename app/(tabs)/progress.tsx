import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "../../contexts/ThemeContext";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { getUserId } from "../../utils/userSession";

const { width } = Dimensions.get("window");
const PRIMARY_COLOR = "#f5873d";

export default function ProgressScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    getUserId().then(setUserId);
  }, []);

  const todos = useQuery(api.todos.getTodos, userId ? { userId } : "skip");
  const profile = useQuery(api.profiles.getProfile, userId ? { userId } : "skip");

  const totalTodos = todos?.length || 0;
  const completedTodos = todos?.filter((t) => t.isCompleted).length || 0;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  // Calculate streak (simplified - just showing example)
  const currentStreak = 5; // This would be calculated based on actual completion dates

  const bgColor = isDark ? "#221710" : "#f8f7f5";
  const textColor = isDark ? "#f8f7f5" : "#181411";
  const textSecondary = isDark ? "rgba(248, 247, 245, 0.6)" : "#8a7160";
  const cardBg = isDark ? "#181411" : "#ffffff";
  const successColor = "#7DDC72";
  const warningColor = "#FFAA33";
  const dangerColor = "#FF5A4F";

  const stats = [
    { label: "Total Tasks", value: totalTodos, icon: "📋", color: PRIMARY_COLOR },
    { label: "Completed", value: completedTodos, icon: "✅", color: successColor },
    { label: "In Progress", value: activeTodos, icon: "⏳", color: warningColor },
    { label: "Current Streak", value: `${currentStreak} days`, icon: "🔥", color: dangerColor },
  ];

  return (
    <LinearGradient
      colors={isDark ? [`${PRIMARY_COLOR}4D`, "transparent"] : [`${PRIMARY_COLOR}33`, "transparent"]}
      style={styles.gradient}
    >
      <View style={[styles.container, { backgroundColor: bgColor }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: textColor }]}>
              📊 Progress
            </Text>
            <Text style={[styles.subtitle, { color: textSecondary }]}>
              Track your hair care journey
            </Text>
          </View>

          {/* Completion Progress Bar */}
          <Animated.View entering={FadeInDown.delay(100)}>
            <View style={styles.completionSection}>
              <View style={styles.progressHeader}>
                <Text style={[styles.progressLabel, { color: textColor }]}>
                  Overall Completion
                </Text>
                <Text style={[styles.progressPercent, { color: PRIMARY_COLOR }]}>
                  {Math.round(completionRate)}%
                </Text>
              </View>
              <View style={[styles.progressBarBg, { backgroundColor: isDark ? `${PRIMARY_COLOR}33` : `${PRIMARY_COLOR}1A` }]}>
                <View
                  style={[
                    styles.progressBarFill,
                    { 
                      backgroundColor: PRIMARY_COLOR,
                      width: `${completionRate}%`
                    },
                  ]}
                />
              </View>
            </View>
          </Animated.View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <Animated.View
                key={stat.label}
                entering={FadeInDown.delay(200 + index * 100)}
                style={styles.statCardWrapper}
              >
                <View
                  style={[
                    styles.statCard,
                    { backgroundColor: cardBg },
                  ]}
                >
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                  <Text style={[styles.statValue, { color: stat.color }]}>
                    {stat.value}
                  </Text>
                  <Text style={[styles.statLabel, { color: textSecondary }]}>
                    {stat.label}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </View>

          {/* Hair Goals Progress */}
          {profile?.hairGoals && profile.hairGoals.length > 0 && (
            <Animated.View entering={FadeInDown.delay(600)}>
              <View style={styles.goalsSection}>
                <Text style={[styles.sectionTitle, { color: textColor }]}>
                  Your Hair Goals
                </Text>
                {profile.hairGoals.map((goal, index) => (
                  <View
                    key={index}
                    style={[
                      styles.goalCard,
                      { backgroundColor: cardBg },
                    ]}
                  >
                    <View style={styles.goalHeader}>
                      <Text style={[styles.goalText, { color: textColor }]}>
                        {goal}
                      </Text>
                      <Text style={styles.goalIcon}>🎯</Text>
                    </View>
                    <View style={[styles.progressBar, { backgroundColor: isDark ? `${PRIMARY_COLOR}33` : `${PRIMARY_COLOR}1A` }]}>
                      <View
                        style={[
                          styles.progressFill,
                          { 
                            backgroundColor: PRIMARY_COLOR,
                            width: `${Math.random() * 100}%` // This would be actual progress
                          },
                        ]}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </Animated.View>
          )}

          {/* Motivational Message */}
          <Animated.View entering={FadeInDown.delay(800)}>
            <View
              style={[
                styles.motivationCard,
                { backgroundColor: isDark ? `${PRIMARY_COLOR}33` : `${PRIMARY_COLOR}1A`, borderColor: PRIMARY_COLOR },
              ]}
            >
              <Text style={styles.motivationIcon}>💪</Text>
              <Text style={[styles.motivationTitle, { color: textColor }]}>
                Keep Going!
              </Text>
              <Text style={[styles.motivationText, { color: textSecondary }]}>
                You're doing great, {profile?.name || "beauty"}! Consistency is key to healthy hair.
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  completionSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
  progressPercent: {
    fontSize: 24,
    fontWeight: "bold",
  },
  progressBarBg: {
    height: 12,
    borderRadius: 9999,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 9999,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 12,
  },
  statCardWrapper: {
    width: (width - 60) / 2,
  },
  statCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  goalsSection: {
    padding: 24,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  goalCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  goalText: {
    fontSize: 16,
    fontWeight: "600",
  },
  goalIcon: {
    fontSize: 20,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  motivationCard: {
    margin: 24,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2,
  },
  motivationIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  motivationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  motivationText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});

