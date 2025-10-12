import React from "react";
import { View, Text, StyleSheet, Pressable, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { Colors } from "../constants/colors";

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/onboarding");
  };

  return (
    <ImageBackground
      source={require("../assets/home-screen-background.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header Title */}
          <Animated.View entering={FadeInDown.delay(200)} style={styles.headerContainer}>
            <Text style={styles.mainTitle}>Beautiful{"\n"}Hair</Text>
            <Text style={styles.scriptTitle}>Every Day</Text>
          </Animated.View>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Bottom Section - CTA */}
          <Animated.View entering={FadeInUp.delay(800)} style={styles.bottomSection}>
            {/* Get Started Button */}
            <Pressable
              onPress={handleGetStarted}
              style={styles.getStartedButton}
            >
              <Text style={styles.getStartedText}>Get Started</Text>
            </Pressable>

            <Text style={styles.privacyText}>
              By continuing, you agree to our Terms & Privacy Policy
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 56,
    fontWeight: "900",
    color: Colors.neutral.white,
    textAlign: "center",
    lineHeight: 60,
    letterSpacing: -1,
    textShadowColor: Colors.shadow.medium,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  scriptTitle: {
    fontSize: 48,
    fontStyle: "italic",
    color: Colors.secondary.light, // Golden shine
    textAlign: "center",
    marginTop: -10,
    fontWeight: "300",
    textShadowColor: Colors.shadow.light,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  spacer: {
    flex: 1,
  },
  bottomSection: {
    alignItems: "center",
    gap: 20,
  },
  getStartedButton: {
    backgroundColor: Colors.neutral.white,
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 30,
    elevation: 8,
    shadowColor: Colors.shadow.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  getStartedText: {
    color: Colors.primary.main, // Sunset Orange
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  privacyText: {
    fontSize: 11,
    color: Colors.overlay.medium,
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
