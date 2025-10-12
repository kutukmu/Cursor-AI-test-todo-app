import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_ID_KEY = "@hair_routine_user_id";

/**
 * Generate a unique user ID for anonymous users
 */
function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get or create a user ID for the current device
 */
export async function getUserId(): Promise<string> {
  try {
    let userId = await AsyncStorage.getItem(USER_ID_KEY);
    
    if (!userId) {
      userId = generateUserId();
      await AsyncStorage.setItem(USER_ID_KEY, userId);
    }
    
    return userId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    // Fallback to session-only ID
    return generateUserId();
  }
}

/**
 * Clear the user ID (for testing purposes)
 */
export async function clearUserId(): Promise<void> {
  try {
    await AsyncStorage.removeItem(USER_ID_KEY);
  } catch (error) {
    console.error("Error clearing user ID:", error);
  }
}

