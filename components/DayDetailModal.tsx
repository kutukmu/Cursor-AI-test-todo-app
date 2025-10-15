import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { 
  FadeIn, 
  SlideInDown, 
  FadeOut, 
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

const { height } = Dimensions.get("window");

// Soft color palette
const COLORS = {
  primary: "#f2524a",
  backgroundLight: "#f8f6f6",
  backgroundDark: "#221110",
  onSurface: "#2E2A27",
  onSurfaceVariant: "#6F6B68",
};

interface Task {
  id: string;
  title: string;
  instruction?: string;
  completed: boolean;
}

interface DayDetailModalProps {
  visible: boolean;
  onClose: () => void;
  challengeTitle: string;
  day: number;
  tasks: string[];
  taskInstructions?: string[]; // Optional detailed instructions for each task
  onComplete: () => Promise<void>;
}

export default function DayDetailModal({
  visible,
  onClose,
  challengeTitle,
  day,
  tasks,
  taskInstructions,
  onComplete,
}: DayDetailModalProps) {
  const [taskStates, setTaskStates] = useState<Task[]>(
    tasks.map((task, index) => ({
      id: `task-${index}`,
      title: task,
      instruction: taskInstructions?.[index],
      completed: false,
    }))
  );

  // Reset task states when day or tasks change
  useEffect(() => {
    setTaskStates(
      tasks.map((task, index) => ({
        id: `task-${index}`,
        title: task,
        instruction: taskInstructions?.[index],
        completed: false,
      }))
    );
  }, [day, tasks, taskInstructions]);

  // Gesture handling for drag to close
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      // Only allow dragging down, not up
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      // If dragged down more than 150px or velocity is high, close modal
      if (translateY.value > 150 || event.velocityY > 500) {
        runOnJS(onClose)();
      }
      // Reset position
      translateY.value = withSpring(0, { damping: 50, stiffness: 400 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const toggleTask = (taskId: string) => {
    setTaskStates((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const allTasksCompleted = taskStates.every((task) => task.completed);

  const handleStartDay = async () => {
    if (allTasksCompleted) {
      try {
        await onComplete();
        onClose();
      } catch (error: any) {
        const errorMessage = error?.message || "";
        
        if (errorMessage.startsWith("COOLDOWN_ACTIVE:")) {
          const hoursRemaining = errorMessage.split(":")[1];
          Alert.alert(
            "Take a Break! 🌟",
            `You've completed 2 challenges in a row! To build healthy, sustainable habits, please wait ${hoursRemaining} more hour${hoursRemaining === "1" ? "" : "s"} before continuing your journey.`,
            [{ text: "Got it!", style: "default" }]
          );
        } else {
          Alert.alert(
            "Oops!",
            "Something went wrong. Please try again.",
            [{ text: "OK", style: "default" }]
          );
        }
      }
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        <Pressable style={styles.backdrop} onPress={onClose}>
          <Animated.View 
            entering={FadeIn.duration(200)} 
            exiting={FadeOut.duration(150)}
            style={styles.backdropOverlay}
          />
        </Pressable>

        <Animated.View
          entering={SlideInDown.duration(300)}
          exiting={SlideOutDown.duration(250)}
          style={[styles.modalContent, animatedStyle]}
        >
          {/* Drag Handle */}
          <GestureDetector gesture={gesture}>
            <View style={styles.dragHandleContainer}>
              <View style={styles.dragHandle} />
            </View>
          </GestureDetector>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Title Section */}
            <View style={styles.titleSection}>
              <Text style={styles.title}>{challengeTitle}</Text>
              <Text style={styles.subtitle}>
                Join us for a week of hair love and self-care
              </Text>
            </View>

            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <MaterialIcons name="spa" size={48} color={COLORS.primary} />
              </View>
            </View>

            {/* Quick Overview */}
            <View style={styles.overviewSection}>
              <View style={styles.overviewCard}>
                <Text style={styles.overviewLabel}>QUICK OVERVIEW</Text>
                <Text style={styles.overviewText}>
                  Daily routines, tips, and self-care rituals to rejuvenate your hair
                  and spirit.
                </Text>
              </View>
            </View>

            {/* Today's Actions */}
            <View style={styles.actionsSection}>
              <Text style={styles.actionsTitle}>Today's Actions</Text>
              <View style={styles.tasksList}>
                {taskStates.map((task) => (
                  <View key={task.id} style={styles.taskContainer}>
                    <Pressable
                      onPress={() => toggleTask(task.id)}
                      style={styles.taskItem}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          task.completed && styles.checkboxChecked,
                        ]}
                      >
                        {task.completed && (
                          <MaterialIcons name="check" size={16} color="white" />
                        )}
                      </View>
                      <Text style={styles.taskText}>{task.title}</Text>
                    </Pressable>
                    {task.instruction && (
                      <View style={styles.instructionBox}>
                        <MaterialIcons 
                          name="info-outline" 
                          size={14} 
                          color={COLORS.primary} 
                          style={styles.instructionIcon}
                        />
                        <Text style={styles.instructionText}>{task.instruction}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonSection}>
              <Pressable
                onPress={handleStartDay}
                disabled={!allTasksCompleted}
                style={({ pressed }) => [
                  styles.startButton,
                  !allTasksCompleted && styles.startButtonDisabled,
                  { opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <Text
                  style={[
                    styles.startButtonText,
                    !allTasksCompleted && styles.startButtonTextDisabled,
                  ]}
                >
                  {allTasksCompleted
                    ? `Complete Day ${day}`
                    : `Complete all tasks to continue`}
                </Text>
              </Pressable>
              <Pressable onPress={onClose} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
                <Text style={styles.laterButton}>Maybe later</Text>
              </Pressable>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.backgroundLight,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  dragHandleContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  dragHandle: {
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: `${COLORS.primary}33`,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  // Title Section
  titleSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.backgroundDark,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: `${COLORS.primary}CC`,
    textAlign: "center",
  },
  // Avatar
  avatarContainer: {
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: "center",
    alignItems: "center",
  },
  // Overview Section
  overviewSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  overviewCard: {
    backgroundColor: `${COLORS.primary}1A`,
    borderRadius: 12,
    padding: 16,
  },
  overviewLabel: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1.2,
    color: COLORS.primary,
    marginBottom: 8,
  },
  overviewText: {
    fontSize: 14,
    color: `${COLORS.backgroundDark}B3`,
    lineHeight: 20,
  },
  // Actions Section
  actionsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.backgroundDark,
    marginBottom: 16,
  },
  tasksList: {
    gap: 20,
  },
  taskContainer: {
    gap: 8,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  instructionBox: {
    flexDirection: "row",
    backgroundColor: `${COLORS.primary}0D`,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 32,
    borderRadius: 6,
    gap: 8,
  },
  instructionIcon: {
    marginTop: 2,
  },
  instructionText: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    lineHeight: 18,
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: `${COLORS.primary}4D`,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  taskText: {
    fontSize: 16,
    color: COLORS.backgroundDark,
    flex: 1,
  },
  // Button Section
  buttonSection: {
    paddingHorizontal: 24,
    gap: 16,
    alignItems: "center",
  },
  startButton: {
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonDisabled: {
    borderColor: `${COLORS.primary}4D`,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },
  startButtonTextDisabled: {
    color: `${COLORS.primary}80`,
  },
  laterButton: {
    fontSize: 14,
    fontWeight: "600",
    color: `${COLORS.primary}CC`,
  },
});

