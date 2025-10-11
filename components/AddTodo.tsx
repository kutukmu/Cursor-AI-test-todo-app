import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  Keyboard,
} from "react-native";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";
import { useTheme } from "../contexts/ThemeContext";
import { useUser } from "@clerk/clerk-expo";

export default function AddTodo() {
  const { colors } = useTheme();
  const { user } = useUser();
  const [text, setText] = useState("");
  const addTodo = useMutation(api.todos.addTodo);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleSubmit = async () => {
    if (text.trim() && user?.id) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      
      // Animate button
      scale.value = withSequence(
        withSpring(0.9),
        withSpring(1)
      );

      await addTodo({ text: text.trim(), userId: user.id });
      setText("");
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { backgroundColor: colors.cardBackground }]}>
        <Text style={styles.icon}>💆‍♀️</Text>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={text}
          onChangeText={setText}
          placeholder="Add hair care step..."
          placeholderTextColor={colors.textSecondary}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          blurOnSubmit={false}
        />
      </View>
      <Animated.View style={animatedStyle}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.cardBackground },
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSubmit}
        >
          <Text style={[styles.buttonText, { color: colors.primary }]}>Add</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 16,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

