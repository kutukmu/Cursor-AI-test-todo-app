import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "../../contexts/ThemeContext";
import { getUserId } from "../../utils/userSession";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// New soft color palette
const COLORS = {
  primary: "#F5A8A2",
  secondary: "#FCE2DA",
  accent: "#B8E4C9",
  textPrimary: "#2E2A27",
  textSecondary: "#6F6B68",
  surface: "#FFFFFF",
  backgroundStart: "#FFF6F3",
  backgroundEnd: "#FFE8E0",
  todayCardBg: "#EAEFE6",
  inputBg: "#FDF9F8",
  inputBorder: "#FCE2DA",
};

interface WeeklyPlanItem {
  id: number;
  day: string;
  title: string;
  subtitle?: string;
  color: string;
}

const weeklyPlan: WeeklyPlanItem[] = [
  { id: 1, day: "Day 1", title: "Wash Day Hydration", subtitle: "Cleanse & Condition", color: "#F0E6F4" },
  { id: 2, day: "Day 2", title: "Seal Ends", subtitle: "Light oil application", color: "#E6F3F0" },
  { id: 3, day: "Day 3", title: "Protective Styling", subtitle: "Braid or bun", color: "#FCEAE6" },
  { id: 4, day: "Day 4", title: "Moisture Refresh", subtitle: "Leave-in spray", color: "#FEF8E4" },
  { id: 5, day: "Day 5", title: "Scalp Massage", subtitle: "Oil treatment", color: "#E8F4F8" },
  { id: 6, day: "Day 6", title: "Detangle & Style", subtitle: "Gentle care", color: "#FFF0E8" },
  { id: 7, day: "Day 7", title: "Relax & Reset", subtitle: "Prepare for wash day", color: "#F5E8F0" },
];

interface SuggestedRoutine {
  id: number;
  title: string;
  duration: string;
  isPremium?: boolean;
}

const suggestedRoutines: SuggestedRoutine[] = [
  { id: 1, title: "Scalp Detox Routine", duration: "15 mins" },
  { id: 2, title: "Hydration Sunday", duration: "25 mins" },
  { id: 3, title: "Post-Color Repair", duration: "30 mins • Premium", isPremium: true },
];

export default function PlanScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [userId, setUserId] = useState<string>("");
  const [todoText, setTodoText] = useState("");
  const [currentDay, setCurrentDay] = useState(0);

  useEffect(() => {
    getUserId().then(setUserId);
  }, []);

  const todos = useQuery(api.todos.getTodos, userId ? { userId } : "skip");
  const profile = useQuery(api.profiles.getProfile, userId ? { userId } : "skip");
  const addTodo = useMutation(api.todos.addTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const completedCount = todos?.filter((t) => t.isCompleted).length || 0;
  const totalCount = todos?.length || 0;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleAddTodo = async () => {
    if (!userId || !todoText.trim()) return;
    await addTodo({ text: todoText.trim(), userId });
    setTodoText("");
  };

  const handleToggle = (id: Id<"todos">) => {
    if (!userId) return;
    toggleTodo({ id, userId });
  };

  const handleDelete = (id: Id<"todos">) => {
    if (!userId) return;
    deleteTodo({ id, userId });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getCurrentDate = () => {
    const date = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
  };

  return (
    <LinearGradient colors={[COLORS.backgroundStart, COLORS.backgroundEnd]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.greeting}>
                {getGreeting()}, {profile?.name || "Tanya"} 🌸
              </Text>
              <Text style={styles.subGreeting}>
                You're on day 4 of your hair-care journey.
              </Text>
            </View>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                <MaterialIcons name="person" size={40} color={COLORS.primary} />
              </View>
            </View>
          </View>

          {/* Today's Hair Care Plan Card */}
          <Animated.View entering={FadeInDown.delay(100)}>
            <View style={[styles.todayCard, { backgroundColor: COLORS.todayCardBg }]}>
              <View style={styles.todayCardContent}>
                <View style={styles.todayCardLeft}>
                  <Text style={styles.todayCardTitle}>Today's Hair Care Plan</Text>
                  <Text style={styles.todayCardSubtitle}>{getCurrentDate()}</Text>
                  <Text style={styles.todayCardSubtitle}>
                    {totalCount} steps • {totalCount * 3} mins total
                  </Text>
                </View>
                <View style={styles.todayCardImage}>
                  <MaterialIcons name="brush" size={40} color={COLORS.textPrimary} />
                </View>
              </View>
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Progress</Text>
                  <Text style={styles.progressLabel}>
                    {completedCount} of {totalCount} steps completed
                  </Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${completionPercentage}%`, backgroundColor: COLORS.accent },
                    ]}
                  />
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Add Custom Step */}
          <Animated.View entering={FadeInDown.delay(200)}>
            <View style={styles.addStepCard}>
              <Text style={styles.addStepTitle}>Add a custom step</Text>
              <View style={styles.addStepInputContainer}>
                <TextInput
                  style={styles.addStepInput}
                  placeholder="e.g., Leave-in conditioner"
                  placeholderTextColor="#C4C0BD"
                  value={todoText}
                  onChangeText={setTodoText}
                  onSubmitEditing={handleAddTodo}
                />
                <Pressable
                  onPress={handleAddTodo}
                  style={({ pressed }) => [
                    styles.addButton,
                    { opacity: pressed ? 0.9 : 1, backgroundColor: COLORS.primary },
                  ]}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>

          {/* Todo Steps List */}
          <View style={styles.stepsContainer}>
            {todos?.map((todo, index) => (
              <Animated.View key={todo._id} entering={FadeInDown.delay(300 + index * 50)}>
                <Pressable
                  onPress={() => handleToggle(todo._id)}
                  style={[
                    styles.stepCard,
                    { opacity: todo.isCompleted ? 0.6 : 1 },
                  ]}
                >
                  <View
                    style={[
                      styles.checkbox,
                      {
                        backgroundColor: todo.isCompleted ? COLORS.accent : "transparent",
                        borderColor: todo.isCompleted ? COLORS.accent : "#D1D5DB",
                      },
                    ]}
                  >
                    {todo.isCompleted && (
                      <MaterialIcons name="check" size={16} color="#FFFFFF" />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.stepTitle,
                      { textDecorationLine: todo.isCompleted ? "line-through" : "none" },
                    ]}
                  >
                    {todo.text}
                  </Text>
                  <Pressable onPress={() => handleDelete(todo._id)} style={styles.deleteButton}>
                    <MaterialIcons name="delete-outline" size={20} color="#9CA3AF" />
                  </Pressable>
                </Pressable>
              </Animated.View>
            ))}
          </View>

          {/* Your Personal Plan Carousel */}
          <Animated.View entering={FadeInDown.delay(400)} style={styles.personalPlanSection}>
            <View style={styles.personalPlanCard}>
              <View style={styles.personalPlanHeader}>
                <Text style={styles.personalPlanTitle}>Your Personal Plan ✨</Text>
                <Text style={styles.personalPlanSubtitle}>
                  Follow your daily hair-care routine for best results.
                </Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carouselContent}
                snapToInterval={width * 0.7}
                decelerationRate="fast"
              >
                {weeklyPlan.map((item, index) => (
                  <View
                    key={item.id}
                    style={[styles.carouselCard, { backgroundColor: item.color }]}
                  >
                    <View style={styles.carouselCardContent}>
                      <View style={styles.dayBadge}>
                        <Text style={styles.dayBadgeText}>{item.day}</Text>
                      </View>
                      <Text style={styles.carouselCardTitle}>{item.title}</Text>
                      {item.subtitle && (
                        <Text style={styles.carouselCardSubtitle}>{item.subtitle}</Text>
                      )}
                    </View>
                    <View style={styles.carouselCardImage}>
                      <MaterialIcons name="spa" size={60} color={COLORS.textPrimary} />
                    </View>
                  </View>
                ))}
              </ScrollView>
              {/* Carousel Dots */}
              <View style={styles.dotsContainer}>
                {weeklyPlan.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      {
                        backgroundColor: index === 0 ? COLORS.primary : COLORS.secondary,
                        width: index === 0 ? 20 : 8,
                      },
                    ]}
                  />
                ))}
              </View>
            </View>
          </Animated.View>

          {/* You Might Also Like */}
          <Animated.View entering={FadeInDown.delay(500)} style={styles.suggestionsSection}>
            <Text style={styles.suggestionsTitle}>You Might Also Like ✨</Text>
            <Text style={styles.suggestionsSubtitle}>
              Suggested routines for your hair goals.
            </Text>
            <View style={styles.suggestionsContainer}>
              {suggestedRoutines.map((routine) => (
                <Pressable
                  key={routine.id}
                  style={({ pressed }) => [
                    styles.suggestionCard,
                    { opacity: routine.isPremium ? 0.7 : pressed ? 0.95 : 1 },
                  ]}
                >
                  <View style={styles.suggestionImage}>
                    <MaterialIcons name="face" size={50} color={COLORS.textPrimary} />
                  </View>
                  <View style={styles.suggestionContent}>
                    <Text style={styles.suggestionTitle}>{routine.title}</Text>
                    <Text style={styles.suggestionDuration}>{routine.duration}</Text>
                  </View>
                  {routine.isPremium ? (
                    <MaterialIcons name="lock" size={20} color={COLORS.primary} />
                  ) : (
                    <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
                  )}
                </Pressable>
              ))}
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 140,
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  headerTextContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    lineHeight: 32,
  },
  subGreeting: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  profileImageContainer: {
    marginLeft: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surface,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  // Today's Card
  todayCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  todayCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  todayCardLeft: {
    flex: 1,
  },
  todayCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  todayCardSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  todayCardImage: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  progressSection: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textSecondary,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 9999,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 9999,
  },
  // Add Step Card
  addStepCard: {
    marginHorizontal: 24,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  addStepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  addStepInputContainer: {
    flexDirection: "row",
    gap: 12,
  },
  addStepInput: {
    flex: 1,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  // Steps Container
  stepsContainer: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  stepCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  stepTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  deleteButton: {
    padding: 4,
  },
  // Personal Plan Carousel
  personalPlanSection: {
    marginBottom: 32,
    paddingHorizontal:24
  },
  personalPlanCard: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  personalPlanHeader: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  personalPlanTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  personalPlanSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  carouselContent: {
    paddingLeft: 24,
    paddingRight: 24,
    gap: 16,
    paddingBottom: 16,
  },
  carouselCard: {
    width: width * 0.65,
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  carouselCardContent: {
    flex: 1,
    justifyContent: "center",
  },
  dayBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  dayBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  carouselCardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    lineHeight: 18,
  },
  carouselCardSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  carouselCardImage: {
    width: 96,
    height: 96,
    justifyContent: "center",
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 16,
  },
  dot: {
    height: 8,
    borderRadius: 9999,
  },
  // Suggestions Section
  suggestionsSection: {
    paddingHorizontal: 24,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  suggestionsSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  suggestionsContainer: {
    gap: 12,
  },
  suggestionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  suggestionDuration: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
