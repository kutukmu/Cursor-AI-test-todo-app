import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "../../contexts/ThemeContext";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { getUserId } from "../../utils/userSession";

interface HairTip {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

const hairTips: HairTip[] = [
  {
    id: "1",
    title: "Deep Conditioning",
    description: "Use a deep conditioner once a week to restore moisture and strengthen your hair.",
    icon: "💆‍♀️",
    category: "Moisture",
  },
  {
    id: "2",
    title: "Protective Styling",
    description: "Try protective styles like braids or twists to minimize damage and promote growth.",
    icon: "💇‍♀️",
    category: "Protection",
  },
  {
    id: "3",
    title: "Trim Regularly",
    description: "Get your ends trimmed every 8-12 weeks to prevent split ends from traveling up.",
    icon: "✂️",
    category: "Maintenance",
  },
  {
    id: "4",
    title: "Silk Pillowcase",
    description: "Sleep on a silk or satin pillowcase to reduce friction and prevent breakage.",
    icon: "🛏️",
    category: "Protection",
  },
  {
    id: "5",
    title: "Heat Protection",
    description: "Always use a heat protectant spray before using hot tools to prevent damage.",
    icon: "🔥",
    category: "Styling",
  },
  {
    id: "6",
    title: "Scalp Massage",
    description: "Massage your scalp for 5 minutes daily to stimulate blood flow and promote growth.",
    icon: "💆",
    category: "Growth",
  },
];

export default function DiscoverScreen() {
  const { colors } = useTheme();
  const [userId, setUserId] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    getUserId().then(setUserId);
  }, []);

  const profile = useQuery(api.profiles.getProfile, userId ? { userId } : "skip");

  const categories = ["All", "Moisture", "Protection", "Growth", "Styling", "Maintenance"];

  const filteredTips = selectedCategory === "All" 
    ? hairTips 
    : hairTips.filter(tip => tip.category === selectedCategory);

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentWrapper}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.overlay }]}>
              ✨ Discover
            </Text>
            <Text style={[styles.subtitle, { color: colors.overlay }]}>
              Tips & tricks for your hair type
            </Text>
          </View>

          {/* Category Filter */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryContainer}
          >
            {categories.map((category) => (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryChip,
                  { 
                    backgroundColor: selectedCategory === category 
                      ? colors.primary 
                      : colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { 
                      color: selectedCategory === category 
                        ? colors.textInverse 
                        : colors.text,
                    },
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Tips List */}
          <ScrollView 
            style={styles.tipsScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.tipsContainer}
          >
            {filteredTips.map((tip, index) => (
              <Animated.View
                key={tip.id}
                entering={FadeInDown.delay(index * 100)}
              >
                <View
                  style={[
                    styles.tipCard,
                    { 
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View style={styles.tipHeader}>
                    <Text style={styles.tipIcon}>{tip.icon}</Text>
                    <View style={styles.tipHeaderText}>
                      <Text style={[styles.tipTitle, { color: colors.text }]}>
                        {tip.title}
                      </Text>
                      <Text
                        style={[
                          styles.tipCategory,
                          { 
                            color: colors.primary,
                            backgroundColor: colors.primaryLight,
                          },
                        ]}
                      >
                        {tip.category}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.tipDescription, { color: colors.textSecondary }]}>
                    {tip.description}
                  </Text>
                </View>
              </Animated.View>
            ))}

            {/* Personalized Recommendation */}
            {profile?.hairType && (
              <Animated.View entering={FadeInDown.delay(600)}>
                <View
                  style={[
                    styles.recommendationCard,
                    { 
                      backgroundColor: colors.primaryLight,
                      borderColor: colors.primary,
                    },
                  ]}
                >
                  <Text style={styles.recommendationIcon}>💡</Text>
                  <Text style={[styles.recommendationTitle, { color: colors.text }]}>
                    For Your Hair Type
                  </Text>
                  <Text style={[styles.recommendationText, { color: colors.textSecondary }]}>
                    Based on your {profile.hairType} hair, we recommend focusing on{" "}
                    {profile.hairType === "curly" || profile.hairType === "coily" 
                      ? "moisture and definition" 
                      : "volume and shine"}.
                  </Text>
                </View>
              </Animated.View>
            )}
          </ScrollView>
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
  contentWrapper: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  categoryScroll: {
    maxHeight: 50,
  },
  categoryContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
  },
  tipsScroll: {
    flex: 1,
  },
  tipsContainer: {
    padding: 24,
    paddingTop: 16,
    paddingBottom: 100,
  },
  tipCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tipIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  tipHeaderText: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  tipCategory: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  tipDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  recommendationCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    marginTop: 8,
    alignItems: "center",
  },
  recommendationIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});

