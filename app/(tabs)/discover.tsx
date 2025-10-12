import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "../../contexts/ThemeContext";
import { getUserId } from "../../utils/userSession";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// Soft color palette
const COLORS = {
  primary: "#F5A8A2",
  secondary: "#FCE2DA",
  accent: "#B8E4C9",
  textPrimary: "#2E2A27",
  textSecondary: "#6F6B68",
  surface: "#FFFFFF",
  backgroundStart: "#FFF6F3",
  backgroundEnd: "#FFE8E0",
};

interface Concern {
  id: number;
  title: string;
  remediesCount: number;
  icon: string;
}

interface Collection {
  id: number;
  title: string;
  color: string;
}

const concerns: Concern[] = [
  { id: 1, title: "Dry Scalp", remediesCount: 8, icon: "water-drop" },
  { id: 2, title: "Hair Fall", remediesCount: 12, icon: "spa" },
  { id: 3, title: "Frizz Control", remediesCount: 10, icon: "auto-fix-high" },
  { id: 4, title: "Split Ends", remediesCount: 7, icon: "content-cut" },
];

const collections: Collection[] = [
  { id: 1, title: "Ayurvedic Hair Rituals", color: "#B8E4C9" },
  { id: 2, title: "DIY Hair Masks", color: "#FCE2DA" },
  { id: 3, title: "Essential Oils & Herbs", color: "#B8E4C9" },
  { id: 4, title: "Seasonal Hair Care", color: "#FCE2DA" },
];

export default function DiscoverScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [userId, setUserId] = useState<string>("");
  
  useEffect(() => {
    getUserId().then(setUserId);
  }, []);

  // Fetch remedies from Convex
  const remedies = useQuery(api.remedies.getRemedies);
  const userFavorites = useQuery(
    api.remedies.getUserFavorites,
    userId ? { userId } : "skip"
  );
  
  // Mutations for favorites
  const addToFavorites = useMutation(api.remedies.addToFavorites);
  const removeFromFavorites = useMutation(api.remedies.removeFromFavorites);

  // Check if a remedy is favorited
  const isFavorited = (remedyId: Id<"remedies">) => {
    return userFavorites?.some((fav) => fav._id === remedyId) || false;
  };

  const toggleFavorite = async (remedyId: Id<"remedies">) => {
    if (!userId) return;
    
    if (isFavorited(remedyId)) {
      await removeFromFavorites({ userId, remedyId });
    } else {
      await addToFavorites({ userId, remedyId });
    }
  };

  return (
    <LinearGradient colors={[COLORS.backgroundStart, COLORS.backgroundEnd]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Target Concerns Section */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Target Concerns</Text>
              <Text style={styles.sectionSubtitle}>Choose your hair goal.</Text>
            </View>
            <View style={styles.concernsGrid}>
              {concerns.map((concern, index) => (
                <Animated.View key={concern.id} entering={FadeInDown.delay(200 + index * 50)}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.concernCard,
                      { opacity: pressed ? 0.9 : 1 },
                    ]}
                  >
                    <View style={[styles.concernImageContainer, { backgroundColor: `${COLORS.secondary}80` }]}>
                      <MaterialIcons name={concern.icon as any} size={50} color={COLORS.primary} />
                    </View>
                    <Text style={styles.concernTitle}>{concern.title}</Text>
                    <Text style={styles.concernSubtitle}>{concern.remediesCount} remedies</Text>
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* Featured Collections Section */}
          <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
            <View style={[styles.sectionHeader, styles.sectionHeaderRow]}>
              <Text style={styles.sectionTitle}>Featured Collections</Text>
              <Pressable>
                <Text style={[styles.seeAllText, { color: COLORS.primary }]}>All →</Text>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.collectionsScroll}
              snapToInterval={width * 0.5}
              decelerationRate="fast"
            >
              {collections.map((collection) => (
                <Pressable
                  key={collection.id}
                  style={({ pressed }) => [
                    styles.collectionCard,
                    { backgroundColor: `${collection.color}50`, opacity: pressed ? 0.9 : 1 },
                  ]}
                >
                  <View style={styles.collectionImage}>
                    <MaterialIcons name="nature-people" size={60} color={COLORS.textPrimary} />
                  </View>
                  <Text style={styles.collectionTitle}>{collection.title}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </Animated.View>

          {/* Popular Remedies Section */}
          <Animated.View entering={FadeInDown.delay(600)} style={styles.section}>
            <View style={[styles.sectionHeader, styles.sectionHeaderRow]}>
              <Text style={styles.sectionTitle}>Popular Remedies 🌿</Text>
            </View>
           
            <View style={styles.remediesContainer}>
              {!remedies ? (
                <Text style={[styles.loadingText, { color: COLORS.textSecondary }]}>
                  Loading remedies...
                </Text>
              ) : remedies.length === 0 ? (
                <Text style={[styles.emptyText, { color: COLORS.textSecondary }]}>
                  No remedies available yet. Check back soon!
                </Text>
              ) : (
                remedies.map((remedy, index) => (
                  <Animated.View key={remedy._id} entering={FadeInDown.delay(700 + index * 50)}>
                    <Pressable
                      onPress={() => router.push(`/remedy/${remedy._id}` as any)}
                      style={({ pressed }) => [
                        styles.remedyCard,
                        { opacity: pressed ? 0.95 : 1 },
                      ]}
                    >
                      <LinearGradient
                        colors={[remedy.gradientStart, remedy.gradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.remedyGradient}
                      >
                        <View style={styles.remedyContent}>
                          <Text style={styles.remedyTitle}>{remedy.title}</Text>
                          <Text style={styles.remedyDuration}>
                            {remedy.steps} steps • {remedy.duration}
                          </Text>
                        </View>
                        <Pressable
                          onPress={() => toggleFavorite(remedy._id)}
                          style={styles.favoriteButton}
                        >
                          <MaterialIcons
                            name={isFavorited(remedy._id) ? "favorite" : "favorite-border"}
                            size={24}
                            color="#FFFFFF"
                          />
                        </Pressable>
                      </LinearGradient>
                    </Pressable>
                  </Animated.View>
                ))
              )}
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 32,
    paddingBottom: 140,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
  },
  // Target Concerns
  concernsGrid: {
    paddingHorizontal: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    justifyContent: "space-between",
  },
  concernCard: {
    width: (width - 72) / 2,
    alignItems: "center",
  },
  concernImageContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  concernTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 4,
  },
  concernSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  // Featured Collections
  collectionsScroll: {
    paddingLeft: 24,
    paddingRight: 24,
    gap: 16,
  },
  collectionCard: {
    width: 192,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  collectionImage: {
    height: 128,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  collectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  // Popular Remedies
  remediesContainer: {
    paddingHorizontal: 24,
    gap: 16,
    marginTop: 16,
  },
  remedyCard: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  remedyGradient: {
    padding: 16,
    minHeight: 100,
    justifyContent: "center",
  },
  remedyContent: {
    flex: 1,
  },
  remedyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  remedyDuration: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 4,
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    padding: 40,
  },
});
