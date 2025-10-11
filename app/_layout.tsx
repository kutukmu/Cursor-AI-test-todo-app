import { Stack, useRouter, useSegments } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "../contexts/ThemeContext";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

// Initialize Convex client
const convex = new ConvexReactClient(
  Constants.expoConfig?.extra?.convexUrl || process.env.EXPO_PUBLIC_CONVEX_URL!
);

// Clerk publishable key
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// Token cache for Clerk
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inWelcome = segments[0] === "welcome";

    if (isSignedIn && inWelcome) {
      // User is signed in but on welcome screen, redirect to home
      router.replace("/");
    } else if (!isSignedIn && !inWelcome) {
      // User is not signed in and not on welcome, redirect to welcome
      router.replace("/welcome");
    }
  }, [isSignedIn, isLoaded]);

  // Show nothing while auth is loading
  if (!isLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <ThemeProvider>
          <ConvexProvider client={convex}>
            <StatusBar style="auto" />
            <InitialLayout />
          </ConvexProvider>
        </ThemeProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}

