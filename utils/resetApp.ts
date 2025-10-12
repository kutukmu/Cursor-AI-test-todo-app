import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Clear all app data to reset to welcome screen
 * This clears the user ID and theme preference
 */
export async function resetApp(): Promise<void> {
  try {
    await AsyncStorage.clear();
    console.log("✅ App data cleared! Please close and reopen the app.");
  } catch (error) {
    console.error("Error clearing app data:", error);
  }
}

/**
 * Clear only user ID (will show onboarding again)
 */
export async function clearUserId(): Promise<void> {
  try {
    await AsyncStorage.removeItem("@hair_routine_user_id");
    console.log("✅ User ID cleared! Restart the app.");
  } catch (error) {
    console.error("Error clearing user ID:", error);
  }
}

