import { Stack, useRouter, useSegments } from "expo-router";
import { ConvexProvider, ConvexReactClient, useQuery } from "convex/react";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "../contexts/ThemeContext";
import { useEffect, useState } from "react";
import { api } from "../convex/_generated/api";
import { getUserId } from "../utils/userSession";

// Initialize Convex client
const convex = new ConvexReactClient(
  Constants.expoConfig?.extra?.convexUrl || process.env.EXPO_PUBLIC_CONVEX_URL!
);

function InitialLayout() {
  const segments = useSegments();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  // Get user profile to check if onboarding is complete
  const profile = useQuery(
    api.profiles.getProfile,
    userId ? { userId } : "skip"
  );

  useEffect(() => {
    // Get or create user ID
    getUserId().then(setUserId);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const inWelcome = segments[0] === "welcome";
    const inOnboarding = segments[0] === "onboarding";

    // Check if profile exists and has required fields
    if (profile === undefined) {
      // Profile is still loading, wait
      return;
    }

    const hasCompletedOnboarding = profile && profile.name && profile.hairType;

    if (!hasCompletedOnboarding) {
      // User hasn't completed onboarding
      if (!inOnboarding && !inWelcome) {
        router.replace("/welcome");
      }
    } else {
      // User has completed onboarding, redirect to tabs if on welcome/onboarding
      if (inWelcome || inOnboarding) {
        router.replace("/(tabs)/plan");
      }
    }
  }, [userId, profile, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ConvexProvider client={convex}>
          <StatusBar style="auto" />
          <InitialLayout />
        </ConvexProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

