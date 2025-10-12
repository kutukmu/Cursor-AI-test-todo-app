import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { useTheme } from "../contexts/ThemeContext";
import { getUserId } from "../utils/userSession";

type HairType = "straight" | "wavy" | "curly" | "coily" | "mixed";
type Porosity = "low" | "medium" | "high";
type Thickness = "fine" | "medium" | "thick";

export default function OnboardingScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const upsertProfile = useMutation(api.profiles.upsertProfile);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    getUserId().then(setUserId);
  }, []);

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [hairType, setHairType] = useState<HairType | "">("");
  const [porosity, setPorosity] = useState<Porosity | "">("");
  const [thickness, setThickness] = useState<Thickness | "">("");
  const [hairConcerns, setHairConcerns] = useState<string[]>([]);
  const [hairGoals, setHairGoals] = useState<string[]>([]);

  const totalSteps = 5;

  const concernOptions = [
    "Dryness",
    "Frizz",
    "Breakage",
    "Hair loss",
    "Split ends",
    "Dandruff",
    "Oily scalp",
    "Lack of volume",
  ];

  const goalOptions = [
    "Growth",
    "Moisture",
    "Shine",
    "Strength",
    "Volume",
    "Curl definition",
    "Color protection",
    "Heat damage repair",
  ];

  const toggleConcern = (concern: string) => {
    setHairConcerns((prev) =>
      prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]
    );
  };

  const toggleGoal = (goal: string) => {
    setHairGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    if (!userId) return;

    try {
      await upsertProfile({
        userId,
        name,
        age: age ? parseInt(age) : undefined,
        hairType: hairType || undefined,
        porosity: porosity || undefined,
        thickness: thickness || undefined,
        hairConcerns: hairConcerns.length > 0 ? hairConcerns : undefined,
        hairGoals: hairGoals.length > 0 ? hairGoals : undefined,
      });

      router.replace("/");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return name.trim().length > 0;
      case 2:
        return age.trim().length > 0 && !isNaN(parseInt(age));
      case 3:
        return hairType !== "";
      case 4:
        return porosity !== "" && thickness !== "";
      case 5:
        return true; // Optional step
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>What's your name?</Text>
            <Text style={[styles.stepSubtitle, { color: colors.textSecondary }]}>
              Let us know what to call you
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.cardBackground, color: colors.text }]}
              placeholder="Enter your name"
              placeholderTextColor={colors.textSecondary}
              value={name}
              onChangeText={setName}
              autoFocus
            />
          </Animated.View>
        );

      case 2:
        return (
          <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>How old are you?</Text>
            <Text style={[styles.stepSubtitle, { color: colors.textSecondary }]}>
              This helps us personalize your experience
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.cardBackground, color: colors.text }]}
              placeholder="Enter your age"
              placeholderTextColor={colors.textSecondary}
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              maxLength={2}
            />
          </Animated.View>
        );

      case 3:
        return (
          <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>What's your hair type?</Text>
            <Text style={[styles.stepSubtitle, { color: colors.textSecondary }]}>
              Choose the one that best describes your hair
            </Text>
            <View style={styles.optionsGrid}>
              {(["straight", "wavy", "curly", "coily", "mixed"] as HairType[]).map((type) => (
                <Pressable
                  key={type}
                  onPress={() => setHairType(type)}
                  style={[
                    styles.optionButton,
                    { backgroundColor: colors.cardBackground },
                    hairType === type && { backgroundColor: colors.primary },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: colors.text },
                      hairType === type && { color: "#FFFFFF" },
                    ]}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        );

      case 4:
        return (
          <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>Hair characteristics</Text>
            <Text style={[styles.stepSubtitle, { color: colors.textSecondary }]}>
              Tell us about your hair porosity and thickness
            </Text>

            <Text style={[styles.sectionLabel, { color: colors.text }]}>Porosity</Text>
            <View style={styles.optionsGrid}>
              {(["low", "medium", "high"] as Porosity[]).map((level) => (
                <Pressable
                  key={level}
                  onPress={() => setPorosity(level)}
                  style={[
                    styles.optionButton,
                    { backgroundColor: colors.cardBackground },
                    porosity === level && { backgroundColor: colors.primary },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: colors.text },
                      porosity === level && { color: "#FFFFFF" },
                    ]}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={[styles.sectionLabel, { color: colors.text, marginTop: 24 }]}>
              Thickness
            </Text>
            <View style={styles.optionsGrid}>
              {(["fine", "medium", "thick"] as Thickness[]).map((level) => (
                <Pressable
                  key={level}
                  onPress={() => setThickness(level)}
                  style={[
                    styles.optionButton,
                    { backgroundColor: colors.cardBackground },
                    thickness === level && { backgroundColor: colors.primary },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: colors.text },
                      thickness === level && { color: "#FFFFFF" },
                    ]}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        );

      case 5:
        return (
          <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>
              Hair concerns & goals
            </Text>
            <Text style={[styles.stepSubtitle, { color: colors.textSecondary }]}>
              Select all that apply (optional)
            </Text>

            <Text style={[styles.sectionLabel, { color: colors.text }]}>Main concerns</Text>
            <View style={styles.optionsWrap}>
              {concernOptions.map((concern) => (
                <Pressable
                  key={concern}
                  onPress={() => toggleConcern(concern)}
                  style={[
                    styles.chipButton,
                    { backgroundColor: colors.cardBackground },
                    hairConcerns.includes(concern) && { backgroundColor: colors.primary },
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      { color: colors.text },
                      hairConcerns.includes(concern) && { color: "#FFFFFF" },
                    ]}
                  >
                    {concern}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={[styles.sectionLabel, { color: colors.text, marginTop: 24 }]}>
              Hair goals
            </Text>
            <View style={styles.optionsWrap}>
              {goalOptions.map((goal) => (
                <Pressable
                  key={goal}
                  onPress={() => toggleGoal(goal)}
                  style={[
                    styles.chipButton,
                    { backgroundColor: colors.cardBackground },
                    hairGoals.includes(goal) && { backgroundColor: colors.primary },
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      { color: colors.text },
                      hairGoals.includes(goal) && { color: "#FFFFFF" },
                    ]}
                  >
                    {goal}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        );

      default:
        return null;
    }
  };

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(step / totalSteps) * 100}%`, backgroundColor: colors.primary },
                  ]}
                />
              </View>
              <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                {step} of {totalSteps}
              </Text>
            </View>

            {/* Step Content */}
            {renderStep()}
          </ScrollView>

          {/* Navigation Buttons */}
          <View style={styles.navigationContainer}>
            {step > 1 && (
              <Pressable onPress={handleBack} style={styles.backButton}>
                <Text style={[styles.backButtonText, { color: colors.text }]}>Back</Text>
              </Pressable>
            )}

            <Pressable
              onPress={step === totalSteps ? handleComplete : handleNext}
              disabled={!canProceed()}
              style={[
                styles.nextButton,
                { backgroundColor: colors.primary },
                !canProceed() && styles.nextButtonDisabled,
              ]}
            >
              <Text style={styles.nextButtonText}>
                {step === totalSteps ? "Complete" : "Next"}
              </Text>
            </Pressable>
          </View>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100,
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(232, 85, 26, 0.2)", // Warm tint
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  input: {
    padding: 16,
    borderRadius: 12,
    fontSize: 18,
  },
  optionsGrid: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
  },
  optionsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chipButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  navigationContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "rgba(232, 85, 26, 0.05)", // Warm overlay
  },
  backButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "rgba(255, 245, 235, 0.15)", // Warm light
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    flex: 2,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
});

