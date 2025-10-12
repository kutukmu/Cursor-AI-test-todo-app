import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "../contexts/ThemeContext";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import * as Haptics from "expo-haptics";
import { Colors } from "../constants/colors";

interface ProfileModalProps {
  userId: string;
  onClose: () => void;
}

const hairTypeOptions = [
  { value: "straight", label: "Straight", icon: "💁‍♀️" },
  { value: "wavy", label: "Wavy", icon: "〰️" },
  { value: "curly", label: "Curly", icon: "🌀" },
  { value: "coily", label: "Coily", icon: "🔄" },
  { value: "mixed", label: "Mixed", icon: "✨" },
];

const porosityOptions = [
  { value: "low", label: "Low Porosity" },
  { value: "medium", label: "Medium Porosity" },
  { value: "high", label: "High Porosity" },
];

const thicknessOptions = [
  { value: "fine", label: "Fine" },
  { value: "medium", label: "Medium" },
  { value: "thick", label: "Thick" },
];

const commonConcerns = [
  "Dryness", "Frizz", "Breakage", "Split Ends", 
  "Thinning", "Dandruff", "Scalp Issues", "Damage"
];

const commonGoals = [
  "Growth", "Moisture", "Definition", "Volume",
  "Strength", "Shine", "Softness", "Length Retention"
];

export default function ProfileModal({ userId, onClose }: ProfileModalProps) {
  const { colors } = useTheme();
  const profile = useQuery(api.profiles.getProfile, { userId });
  const upsertProfile = useMutation(api.profiles.upsertProfile);

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [hairType, setHairType] = useState<string | undefined>();
  const [porosity, setPorosity] = useState<string | undefined>();
  const [thickness, setThickness] = useState<string | undefined>();
  const [length, setLength] = useState<string>("");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setAge(profile.age?.toString() || "");
      setHairType(profile.hairType);
      setPorosity(profile.porosity);
      setThickness(profile.thickness);
      setLength(profile.length || "");
      setSelectedConcerns(profile.hairConcerns || []);
      setSelectedGoals(profile.hairGoals || []);
    }
  }, [profile]);

  const toggleConcern = (concern: string) => {
    if (selectedConcerns.includes(concern)) {
      setSelectedConcerns(selectedConcerns.filter((c) => c !== concern));
    } else {
      setSelectedConcerns([...selectedConcerns, concern]);
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleSave = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    await upsertProfile({
      userId,
      name: name || undefined,
      age: age ? parseInt(age) : undefined,
      hairType: hairType as any,
      porosity: porosity as any,
      thickness: thickness as any,
      length,
      hairConcerns: selectedConcerns,
      hairGoals: selectedGoals,
    });

    onClose();
  };

  return (
    <View style={styles.overlay}>
      <Animated.View
        entering={FadeInDown}
        style={[styles.container, { backgroundColor: colors.cardBackground }]}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            💇‍♀️ Hair Profile
          </Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Name */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Name
            </Text>
            <TextInput
              style={[styles.textInput, { backgroundColor: colors.primaryLight, color: colors.text, borderColor: colors.border }]}
              placeholder="Your name"
              placeholderTextColor={colors.textSecondary}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Age */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Age
            </Text>
            <TextInput
              style={[styles.textInput, { backgroundColor: colors.primaryLight, color: colors.text, borderColor: colors.border }]}
              placeholder="Your age"
              placeholderTextColor={colors.textSecondary}
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>

          {/* Hair Type */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Hair Type
            </Text>
            <View style={styles.optionsGrid}>
              {hairTypeOptions.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    setHairType(option.value);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  style={[
                    styles.optionCard,
                    { borderColor: colors.border },
                    hairType === option.value && {
                      borderColor: colors.primary,
                      backgroundColor: colors.primaryLight,
                    },
                  ]}
                >
                  <Text style={styles.optionIcon}>{option.icon}</Text>
                  <Text
                    style={[
                      styles.optionLabel,
                      { color: colors.text },
                      hairType === option.value && { fontWeight: "bold" },
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Porosity */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Hair Porosity
            </Text>
            <View style={styles.optionsList}>
              {porosityOptions.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    setPorosity(option.value);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  style={[
                    styles.listItem,
                    { borderColor: colors.border },
                    porosity === option.value && {
                      borderColor: colors.primary,
                      backgroundColor: colors.primaryLight,
                    },
                  ]}
                >
                  <Text style={[styles.listItemText, { color: colors.text }]}>
                    {option.label}
                  </Text>
                  {porosity === option.value && <Text>✓</Text>}
                </Pressable>
              ))}
            </View>
          </View>

          {/* Thickness */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Hair Thickness
            </Text>
            <View style={styles.optionsList}>
              {thicknessOptions.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    setThickness(option.value);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  style={[
                    styles.listItem,
                    { borderColor: colors.border },
                    thickness === option.value && {
                      borderColor: colors.primary,
                      backgroundColor: colors.primaryLight,
                    },
                  ]}
                >
                  <Text style={[styles.listItemText, { color: colors.text }]}>
                    {option.label}
                  </Text>
                  {thickness === option.value && <Text>✓</Text>}
                </Pressable>
              ))}
            </View>
          </View>

          {/* Length */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Current Length
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              value={length}
              onChangeText={setLength}
              placeholder="e.g., Shoulder length, Waist length..."
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          {/* Hair Concerns */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Hair Concerns (select all that apply)
            </Text>
            <View style={styles.tagsContainer}>
              {commonConcerns.map((concern) => (
                <Pressable
                  key={concern}
                  onPress={() => toggleConcern(concern)}
                  style={[
                    styles.tag,
                    { borderColor: colors.border },
                    selectedConcerns.includes(concern) && {
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      { color: colors.text },
                      selectedConcerns.includes(concern) && {
                        color: "#fff",
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {concern}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Hair Goals */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Hair Goals (select all that apply)
            </Text>
            <View style={styles.tagsContainer}>
              {commonGoals.map((goal) => (
                <Pressable
                  key={goal}
                  onPress={() => toggleGoal(goal)}
                  style={[
                    styles.tag,
                    { borderColor: colors.border },
                    selectedGoals.includes(goal) && {
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      { color: colors.text },
                      selectedGoals.includes(goal) && {
                        color: "#fff",
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {goal}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.spacer} />
        </ScrollView>

        {/* Save Button */}
        <View style={styles.footer}>
          <Pressable
            onPress={handleSave}
            style={[styles.saveButton, { backgroundColor: Colors.primary.dark }]}
          >
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </Pressable>
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
    maxHeight: "90%",
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  textInput: {
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  optionCard: {
    width: "30%",
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  optionIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  optionLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  optionsList: {
    gap: 8,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  listItemText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
  },
  tagText: {
    fontSize: 14,
  },
  spacer: {
    height: 100,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: "rgba(232, 85, 26, 0.15)", // Warm border
  },
  saveButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

