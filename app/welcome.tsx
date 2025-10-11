import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useTheme } from "../contexts/ThemeContext";

// Warm up the browser for OAuth
WebBrowser.maybeCompleteAuthSession();

export default function WelcomeScreen() {
  const { colors } = useTheme();
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleOAuth();

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error:", err);
    }
  };

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Logo/Icon Area */}
          <Animated.View entering={FadeInUp.delay(200)} style={styles.logoContainer}>
            <Text style={styles.logo}>💇‍♀️</Text>
            <Text style={[styles.appName, { color: colors.overlay }]}>
              Hair Care Routine
            </Text>
            <Text style={[styles.tagline, { color: colors.overlay }]}>
              Beautiful hair starts with beautiful habits
            </Text>
          </Animated.View>

          {/* Features */}
          <Animated.View entering={FadeInDown.delay(400)} style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>💆‍♀️</Text>
              <Text style={[styles.featureText, { color: colors.overlay }]}>
                Track your hair care routine
              </Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>✨</Text>
              <Text style={[styles.featureText, { color: colors.overlay }]}>
                Get personalized reminders
              </Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🌟</Text>
              <Text style={[styles.featureText, { color: colors.overlay }]}>
                Build healthy hair habits
              </Text>
            </View>
          </Animated.View>

          {/* Sign In Buttons */}
          <Animated.View entering={FadeInDown.delay(600)} style={styles.buttonContainer}>
            <Pressable
              onPress={handleGoogleSignIn}
              style={[styles.button, { backgroundColor: colors.cardBackground }]}
            >
              <Text style={styles.buttonIcon}>🔐</Text>
              <Text style={[styles.buttonText, { color: colors.text }]}>
                Sign in with Google
              </Text>
            </Pressable>

            <Text style={[styles.privacyText, { color: colors.overlay }]}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </Animated.View>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  logo: {
    fontSize: 80,
    marginBottom: 16,
  },
  appName: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    textAlign: "center",
  },
  featuresContainer: {
    gap: 24,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  featureIcon: {
    fontSize: 32,
  },
  featureText: {
    fontSize: 18,
    flex: 1,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  buttonIcon: {
    fontSize: 24,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  privacyText: {
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

