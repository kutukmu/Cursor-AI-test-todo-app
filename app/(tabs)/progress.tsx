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

export default function ProgressScreen() {
  const { colors } = useTheme();
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

  const stats = [
    { label: "Total Tasks", value: totalTodos, icon: "📋", color: colors.primary },
    { label: "Completed", value: completedTodos, icon: "✅", color: colors.success },
    { label: "In Progress", value: activeTodos, icon: "⏳", color: colors.warning },
    { label: "Current Streak", value: `${currentStreak} days`, icon: "🔥", color: colors.danger },
  ];

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.overlay }]}>
              📊 Progress
            </Text>
            <Text style={[styles.subtitle, { color: colors.overlay }]}>
              Track your hair care journey
            </Text>
          </View>

          {/* Completion Circle */}
          <Animated.View entering={FadeInDown.delay(100)}>
            <View
              style={[
                styles.completionCircle,
                { backgroundColor: colors.cardBackground, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.completionPercent, { color: colors.primary }]}>
                {Math.round(completionRate)}%
              </Text>
              <Text style={[styles.completionLabel, { color: colors.textSecondary }]}>
                Completion Rate
              </Text>
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
                    { backgroundColor: colors.cardBackground, borderColor: colors.border },
                  ]}
                >
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                  <Text style={[styles.statValue, { color: stat.color }]}>
                    {stat.value}
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
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
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Your Hair Goals
                </Text>
                {profile.hairGoals.map((goal, index) => (
                  <View
                    key={index}
                    style={[
                      styles.goalCard,
                      { backgroundColor: colors.cardBackground, borderColor: colors.border },
                    ]}
                  >
                    <View style={styles.goalHeader}>
                      <Text style={[styles.goalText, { color: colors.text }]}>
                        {goal}
                      </Text>
                      <Text style={styles.goalIcon}>🎯</Text>
                    </View>
                    <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                      <View
                        style={[
                          styles.progressFill,
                          { 
                            backgroundColor: colors.primary,
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
                { backgroundColor: colors.primaryLight, borderColor: colors.primary },
              ]}
            >
              <Text style={styles.motivationIcon}>💪</Text>
              <Text style={[styles.motivationTitle, { color: colors.text }]}>
                Keep Going!
              </Text>
              <Text style={[styles.motivationText, { color: colors.textSecondary }]}>
                You're doing great, {profile?.name || "beauty"}! Consistency is key to healthy hair.
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
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
  completionCircle: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 24,
    borderWidth: 8,
  },
  completionPercent: {
    fontSize: 48,
    fontWeight: "bold",
  },
  completionLabel: {
    fontSize: 14,
    marginTop: 4,
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
    borderWidth: 1,
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
    borderWidth: 1,
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

