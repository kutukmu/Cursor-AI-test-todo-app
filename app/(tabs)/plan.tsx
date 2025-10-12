import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import RoutineTemplates from "../../components/RoutineTemplates";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "../../contexts/ThemeContext";
import { HairRoutineStep } from "../../constants/hairRoutineTemplates";
import { getUserId } from "../../utils/userSession";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const PRIMARY_COLOR = "#f5873d";

export default function PlanScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [showTemplates, setShowTemplates] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [todoText, setTodoText] = useState("");
  
  useEffect(() => {
    getUserId().then(setUserId);
  }, []);
  
  const todos = useQuery(api.todos.getTodos, userId ? { userId } : "skip");
  const profile = useQuery(api.profiles.getProfile, userId ? { userId } : "skip");
  const addTodo = useMutation(api.todos.addTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredTodos = todos?.filter((todo) => {
    if (filter === "active") return !todo.isCompleted;
    if (filter === "completed") return todo.isCompleted;
    return true;
  });

  const completedCount = todos?.filter((t) => t.isCompleted).length || 0;
  const totalCount = todos?.length || 0;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleAddTodo = async () => {
    if (!userId || !todoText.trim()) return;
    
    await addTodo({ text: todoText.trim(), userId });
    setTodoText("");
    Keyboard.dismiss();
  };

  const handleToggle = (id: Id<"todos">) => {
    if (!userId) return;
    toggleTodo({ id, userId });
  };

  const handleDelete = (id: Id<"todos">) => {
    if (!userId) return;
    deleteTodo({ id, userId });
  };

  const handleSelectTemplate = async (steps: HairRoutineStep[]) => {
    if (!userId) return;
    
    for (const step of steps) {
      await addTodo({ 
        text: step.text, 
        userId,
      });
    }
  };

  const bgColor = isDark ? "#221710" : "#f8f7f5";
  const textColor = isDark ? "#f8f7f5" : "#181411";
  const textSecondary = isDark ? "rgba(248, 247, 245, 0.6)" : "#8a7160";
  const cardBg = isDark ? "#181411" : "#ffffff";
  const inputBg = isDark ? "#181411" : "#ffffff";
  const borderColor = isDark ? `${PRIMARY_COLOR}80` : `${PRIMARY_COLOR}4D`;

  const renderTodoItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 50)}
      style={[styles.todoCard, { backgroundColor: cardBg }]}
    >
      <View style={styles.todoContent}>
        <Pressable
          onPress={() => handleToggle(item._id)}
          style={[
            styles.checkbox,
            {
              backgroundColor: item.isCompleted ? PRIMARY_COLOR : "transparent",
              borderColor: `${PRIMARY_COLOR}4D`,
            },
          ]}
        >
          {item.isCompleted && (
            <MaterialIcons name="check" size={18} color="#ffffff" />
          )}
        </Pressable>
        <View style={styles.todoTextContainer}>
          <Text style={[styles.todoTitle, { color: textColor }]}>
            {item.text}
          </Text>
          <Text style={[styles.todoSubtitle, { color: textSecondary }]}>
            Every 2 days
          </Text>
        </View>
      </View>
      <Pressable onPress={() => handleDelete(item._id)} style={styles.deleteButton}>
        <MaterialIcons name="delete-outline" size={24} color={textSecondary} />
      </Pressable>
    </Animated.View>
  );

  return (
    <LinearGradient
      colors={isDark ? [`${PRIMARY_COLOR}4D`, "transparent"] : [`${PRIMARY_COLOR}33`, "transparent"]}
      style={styles.gradient}
    >
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={[styles.header, { backgroundColor: `${bgColor}CC` }]}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color={textColor} />
            </Pressable>
            <Text style={[styles.headerTitle, { color: textColor }]}>Hair Routine</Text>
            <View style={styles.headerSpacer} />
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
          >
            <FlatList
              data={filteredTodos}
              keyExtractor={(item) => item._id}
              renderItem={renderTodoItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
                  ListHeaderComponent={
                    <View>
                      {/* Title Section */}
                      <View style={styles.titleSection}>
                        <Text style={[styles.mainTitle, { color: textColor }]}>
                          Hair Routine 👋
                        </Text>
                        <Text style={[styles.subtitle, { color: textSecondary }]}>
                          Hi, {profile?.name || "Amelia"}! You're doing great!
                        </Text>
                      </View>

                      {/* Progress Section */}
                      <View style={styles.progressSection}>
                        <View style={styles.progressHeader}>
                          <Text style={[styles.progressText, { color: textColor }]}>
                            {completionPercentage}% Complete
                          </Text>
                        </View>
                        <View style={[styles.progressBarBg, { backgroundColor: isDark ? `${PRIMARY_COLOR}4D` : `${PRIMARY_COLOR}33` }]}>
                          <View
                            style={[
                              styles.progressBarFill,
                              { backgroundColor: PRIMARY_COLOR, width: `${completionPercentage}%` },
                            ]}
                          />
                        </View>
                      </View>

                      {/* Add Todo Input */}
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={[
                            styles.input,
                            {
                              backgroundColor: inputBg,
                              borderColor: borderColor,
                              color: textColor,
                            },
                          ]}
                          placeholder="Add a step"
                          placeholderTextColor={textSecondary}
                          value={todoText}
                          onChangeText={setTodoText}
                          onSubmitEditing={handleAddTodo}
                          returnKeyType="done"
                        />
                        <Pressable
                          onPress={handleAddTodo}
                          style={[styles.addButton, { backgroundColor: PRIMARY_COLOR }]}
                        >
                          <MaterialIcons name="add" size={28} color="#ffffff" />
                        </Pressable>
                      </View>

                      {/* Template Button */}
                      <Pressable
                        onPress={() => setShowTemplates(true)}
                        style={[styles.templateButton, { backgroundColor: isDark ? `${PRIMARY_COLOR}4D` : `${PRIMARY_COLOR}33` }]}
                      >
                        <Text style={[styles.templateButtonText, { color: PRIMARY_COLOR }]}>
                          Use a Template
                        </Text>
                      </Pressable>

                      {/* Filter Buttons */}
                      <View style={styles.filterContainer}>
                        {(["all", "active", "completed"] as const).map((filterType) => (
                          <Pressable
                            key={filterType}
                            onPress={() => setFilter(filterType)}
                            style={[
                              styles.filterButton,
                              {
                                backgroundColor:
                                  filter === filterType
                                    ? PRIMARY_COLOR
                                    : isDark ? `${PRIMARY_COLOR}4D` : `${PRIMARY_COLOR}33`,
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.filterButtonText,
                                {
                                  color: filter === filterType ? "#ffffff" : PRIMARY_COLOR,
                                },
                              ]}
                            >
                              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </View>
                  }
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={[styles.emptyText, { color: textSecondary }]}>
                    {filter === "all"
                      ? "No routine steps yet. Add your first step!"
                      : filter === "active"
                      ? "All done! Great job!"
                      : "No completed steps yet."}
                  </Text>
                </View>
              }
            />
          </KeyboardAvoidingView>

          {/* Templates Modal */}
          {showTemplates && (
            <RoutineTemplates
              onSelectTemplate={handleSelectTemplate}
              onClose={() => setShowTemplates(false)}
            />
          )}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  titleSection: {
    paddingTop: 24,
    paddingBottom: 16,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressHeader: {
    marginBottom: 8,
  },
  progressText: {
    fontWeight: "700",
    fontSize: 16,
  },
  progressBarBg: {
    height: 10,
    borderRadius: 9999,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 9999,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  templateButton: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  templateButtonText: {
    fontWeight: "700",
    fontSize: 14,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  todoCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  todoContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  todoTextContainer: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  todoSubtitle: {
    fontSize: 14,
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
});
