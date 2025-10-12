import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "../contexts/ThemeContext";
import { routineTemplates, HairRoutineStep } from "../constants/hairRoutineTemplates";

interface RoutineTemplatesProps {
  onSelectTemplate: (steps: HairRoutineStep[]) => void;
  onClose: () => void;
}

export default function RoutineTemplates({ onSelectTemplate, onClose }: RoutineTemplatesProps) {
  const { colors } = useTheme();

  const templates = [
    { id: "curly", name: "Curly Hair Routine", icon: "🌀", steps: routineTemplates.curly },
    { id: "straight", name: "Straight Hair Care", icon: "💁‍♀️", steps: routineTemplates.straight },
    { id: "wavy", name: "Wavy Hair Routine", icon: "〰️", steps: routineTemplates.wavy },
    { id: "protective", name: "Protective Style Care", icon: "👑", steps: routineTemplates.protective },
    { id: "washDay", name: "Full Wash Day", icon: "🚿", steps: routineTemplates.washDay },
  ];

  return (
    <View style={styles.overlay}>
      <Animated.View 
        entering={FadeInDown}
        style={[styles.container, { backgroundColor: colors.cardBackground }]}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Choose a Routine</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {templates.map((template, index) => (
            <Animated.View 
              key={template.id}
              entering={FadeInDown.delay(index * 100)}
            >
              <Pressable
                style={[styles.templateCard, { borderColor: colors.primary }]}
                onPress={() => {
                  onSelectTemplate(template.steps);
                  onClose();
                }}
              >
                <View style={styles.templateHeader}>
                  <Text style={styles.templateIcon}>{template.icon}</Text>
                  <View style={styles.templateInfo}>
                    <Text style={[styles.templateName, { color: colors.text }]}>
                      {template.name}
                    </Text>
                    <Text style={[styles.templateSteps, { color: colors.textSecondary }]}>
                      {template.steps.length} steps
                    </Text>
                  </View>
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Tap any routine to add all steps
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(43, 27, 20, 0.50)", // Warm espresso backdrop
    justifyContent: "flex-end",
  },
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(232, 85, 26, 0.15)", // Warm border
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 245, 235, 0.25)", // Warm light
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: 20,
    color: "rgba(107, 90, 70, 0.8)", // Warm gray
  },
  scrollView: {
    padding: 20,
  },
  templateCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    backgroundColor: "rgba(255, 245, 235, 0.05)", // Subtle warm tint
  },
  templateHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  templateIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  templateSteps: {
    fontSize: 14,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
  },
});

