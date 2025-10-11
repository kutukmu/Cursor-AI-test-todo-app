import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import { Id } from "../convex/_generated/dataModel";
import * as Haptics from "expo-haptics";
import Animated, {
  FadeInDown,
  FadeOutRight,
} from "react-native-reanimated";
import { useTheme } from "../contexts/ThemeContext";

interface TodoItemProps {
  todo: {
    _id: Id<"todos">;
    text: string;
    isCompleted: boolean;
    createdAt: number;
  };
  index: number;
  onToggle: (id: Id<"todos">) => void;
  onDelete: (id: Id<"todos">) => void;
  onUpdate: (id: Id<"todos">, text: string) => void;
}

export default function TodoItem({
  todo,
  index,
  onToggle,
  onDelete,
  onUpdate,
}: TodoItemProps) {
  const { colors } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle(todo._id);
  };

  const handleUpdate = () => {
    if (editText.trim() && editText !== todo.text) {
      onUpdate(todo._id, editText.trim());
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50)}
      exiting={FadeOutRight}
      style={styles.container}
    >
      <View style={[styles.todoCard, { backgroundColor: colors.cardBackground }]}>
        {/* Checkbox */}
        <Pressable onPress={handleToggle} style={styles.checkbox}>
          <View
            style={[
              styles.checkboxInner,
              { borderColor: colors.primary },
              todo.isCompleted && [styles.checkboxChecked, { backgroundColor: colors.primary }],
            ]}
          >
            {todo.isCompleted && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </Pressable>

        {/* Text */}
        {isEditing ? (
          <TextInput
            style={[styles.input, { color: colors.text }]}
            value={editText}
            onChangeText={setEditText}
            onBlur={handleUpdate}
            onSubmitEditing={handleUpdate}
            autoFocus
            returnKeyType="done"
          />
        ) : (
          <Pressable
            style={styles.textContainer}
            onLongPress={() => setIsEditing(true)}
          >
            <Text
              style={[
                styles.text,
                { color: colors.text },
                todo.isCompleted && [styles.textCompleted, { color: colors.completed }],
              ]}
              numberOfLines={3}
            >
              {todo.text}
            </Text>
          </Pressable>
        )}

        {/* Delete Button */}
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            onDelete(todo._id);
          }}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteText}>🗑️</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  todoCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {},
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  textCompleted: {
    textDecorationLine: "line-through",
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  deleteButton: {
    marginLeft: 12,
    padding: 4,
  },
  deleteText: {
    fontSize: 20,
  },
});

