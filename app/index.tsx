import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import AddTodo from "../components/AddTodo";
import TodoItem from "../components/TodoItem";
import ProgressBar from "../components/ProgressBar";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function Home() {
  const { colors, theme, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  
  // Get userId from Clerk
  const userId = user?.id || "";
  
  // Pass userId to queries and mutations
  const todos = useQuery(api.todos.getTodos, userId ? { userId } : "skip");
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);
  const clearCompleted = useMutation(api.todos.clearCompleted);

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredTodos = todos?.filter((todo) => {
    if (filter === "active") return !todo.isCompleted;
    if (filter === "completed") return todo.isCompleted;
    return true;
  });

  const handleToggle = (id: Id<"todos">) => {
    if (!userId) return;
    toggleTodo({ id, userId });
  };

  const handleDelete = (id: Id<"todos">) => {
    if (!userId) return;
    deleteTodo({ id, userId });
  };

  const handleUpdate = (id: Id<"todos">, text: string) => {
    if (!userId) return;
    updateTodo({ id, text, userId });
  };

  const handleClearCompleted = () => {
    if (!userId) return;
    clearCompleted({ userId });
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/welcome");
  };

  return (
    <LinearGradient
      colors={colors.background}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.headerLeft}>
                <Text style={[styles.title, { color: colors.overlay }]}>
                  ✨ My Tasks
                </Text>
                <Text style={[styles.subtitle, { color: colors.overlay }]}>
                  Welcome, {user?.firstName || "there"}!
                </Text>
              </View>
              <View style={styles.headerRight}>
                {/* Theme Toggle Button */}
                <Pressable onPress={toggleTheme} style={styles.themeButton}>
                  <Text style={styles.themeIcon}>
                    {theme === "light" ? "🌙" : "☀️"}
                  </Text>
                </Pressable>
                {/* Sign Out Button */}
                <Pressable 
                  onPress={handleSignOut} 
                  style={[styles.signOutButton, { backgroundColor: colors.cardBackground }]}
                >
                  <Text style={[styles.signOutText, { color: colors.danger }]}>
                    Sign Out
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Progress Bar */}
          <ProgressBar
            totalTodos={todos?.length || 0}
            completedTodos={todos?.filter((t) => t.isCompleted).length || 0}
          />

          {/* Add Todo */}
          <AddTodo />

          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            {(["all", "active", "completed"] as const).map((filterType) => (
              <Animated.View
                key={filterType}
                entering={FadeInDown.delay(100)}
              >
                <Text
                  style={[
                    styles.filterButton,
                    { backgroundColor: colors.primaryLight, color: colors.overlay },
                    filter === filterType && [
                      styles.filterButtonActive,
                      { backgroundColor: colors.cardBackground, color: colors.primary },
                    ],
                  ]}
                  onPress={() => setFilter(filterType)}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </Text>
              </Animated.View>
            ))}
          </View>

          {/* Todo List */}
          <FlatList
            data={filteredTodos}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <TodoItem
                todo={item}
                index={index}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: colors.overlay }]}>
                  {filter === "all"
                    ? "No tasks yet. Add one above! 🎯"
                    : filter === "active"
                    ? "No active tasks. You're all done! 🎉"
                    : "No completed tasks yet. Keep going! 💪"}
                </Text>
              </View>
            }
          />

          {/* Clear Completed Button */}
          {todos && todos.some((t) => t.isCompleted) && (
            <Animated.View entering={FadeInDown}>
              <Text
                style={[
                  styles.clearButton,
                  { backgroundColor: colors.primaryLight, color: colors.overlay },
                ]}
                onPress={handleClearCompleted}
              >
                Clear Completed
              </Text>
            </Animated.View>
          )}
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  themeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ffffff22",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  themeIcon: {
    fontSize: 24,
  },
  signOutButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  signOutText: {
    fontSize: 14,
    fontWeight: "600",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: "600",
    overflow: "hidden",
  },
  filterButtonActive: {},
  listContent: {
    padding: 20,
    paddingTop: 12,
    paddingBottom: 100,
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
  clearButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 14,
    fontWeight: "600",
    overflow: "hidden",
  },
});

