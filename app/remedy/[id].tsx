import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ImageBackground,
  Dimensions,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { getUserId } from "../../utils/userSession";
import DayDetailModal from "../../components/DayDetailModal";
import { getRemedyImage, getCategoryImage } from "../../constants/remedyImages";

const { width } = Dimensions.get("window");

// Soft color palette
const COLORS = {
  primary: "#F5A8A2",
  onPrimary: "#FFFFFF",
  surface: "#FFFFFF",
  onSurface: "#2E2A27",
  onSurfaceVariant: "#6F6B68",
  background: "#FFF6F3",
  surfaceContainer: "#F5F5F5",
  outline: "#E0E0E0",
  accent: "#B8E4C9",
};

export default function RemedyDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [userId, setUserId] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    getUserId().then(setUserId);
  }, []);

  // Fetch remedy details from Convex
  const remedy = useQuery(
    api.remedies.getRemedies,
    {}
  );

  // Find the specific remedy by ID
  const currentRemedy = remedy?.find((r) => r._id === id);

  // Get user's challenge progress
  const challengeProgress = useQuery(
    api.remedies.getUserChallengeProgress,
    userId && id ? { userId, remedyId: id as Id<"remedies"> } : "skip"
  );

  // Check if favorited
  const userFavorites = useQuery(
    api.remedies.getUserFavorites,
    userId ? { userId } : "skip"
  );

  const isFavorited = userFavorites?.some((fav) => fav._id === id) || false;

  // Mutations
  const addToFavorites = useMutation(api.remedies.addToFavorites);
  const removeFromFavorites = useMutation(api.remedies.removeFromFavorites);
  const joinChallenge = useMutation(api.remedies.joinChallenge);
  const completeDay = useMutation(api.remedies.completeDay);

  const toggleFavorite = async () => {
    if (!userId || !id) return;
    
    if (isFavorited) {
      await removeFromFavorites({ userId, remedyId: id as Id<"remedies"> });
    } else {
      await addToFavorites({ userId, remedyId: id as Id<"remedies"> });
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing hair care remedy: ${currentRemedy?.title}!`,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const handleJoinChallenge = async () => {
    if (!userId || !id) return;

    try {
      await joinChallenge({ userId, remedyId: id as Id<"remedies"> });
    } catch (error) {
      console.error("Error joining challenge:", error);
    }
  };

  const handleDayClick = async (day: number) => {
    if (!userId || !id) return;

    // If user hasn't joined yet and clicking day 1, join them first
    if (!hasJoined && day === 1) {
      try {
        await joinChallenge({ userId, remedyId: id as Id<"remedies"> });
        // After joining, open the modal
        setSelectedDay(day);
        setModalVisible(true);
      } catch (error) {
        console.error("Error joining challenge:", error);
      }
      return;
    }

    // Check if day is unlocked
    const isUnlocked = hasJoined && (day === 1 || (challengeProgress?.completedDays.includes(day - 1) || false));
    
    if (!isUnlocked) {
      // Day is locked, show message or do nothing
      return;
    }

    // Open modal for this day
    setSelectedDay(day);
    setModalVisible(true);
  };

  const handleCompleteDay = async () => {
    if (!userId || !id) return;
    
    // This will throw an error if daily limit is reached
    // The error will be caught by the modal
    await completeDay({ userId, remedyId: id as Id<"remedies">, day: selectedDay });
  };

  // Determine button text and action
  const hasJoined = !!challengeProgress;
  const currentDay = challengeProgress?.currentDay || 1;
  const completedDays = new Set(challengeProgress?.completedDays || []);
  
  const buttonText = hasJoined ? `Start Day ${currentDay}` : "Join Challenge";
  
  const handleButtonClick = () => {
    if (hasJoined) {
      // Open modal for current day
      handleDayClick(currentDay);
    } else {
      // Join challenge
      handleJoinChallenge();
    }
  };

  // Get tasks and instructions for selected day
  const tasksForSelectedDay = currentRemedy?.dailyTasks?.[selectedDay - 1] || [
    "Hydrating Hair Mask",
    "Scalp Massage",
    "Mindful Meditation",
  ];
  
  const instructionsForSelectedDay = currentRemedy?.dailyInstructions?.[selectedDay - 1];

  if (!currentRemedy) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={[styles.loadingText, { color: COLORS.onSurfaceVariant }]}>
          Loading remedy details...
        </Text>
      </View>
    );
  }

  // Generate days array based on steps count (assuming each step is a day)
  const totalDays = currentRemedy.steps || 14;
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      {/* Day Detail Modal */}
      <DayDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        challengeTitle={currentRemedy?.title || "Hair Care Challenge"}
        day={selectedDay}
        tasks={tasksForSelectedDay}
        taskInstructions={instructionsForSelectedDay}
        onComplete={handleCompleteDay}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header with Hero Image */}
        <ImageBackground
          source={{ uri: getRemedyImage(currentRemedy.title) }}
          style={styles.heroImage}
          imageStyle={styles.heroImageStyle}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0)"]}
            style={styles.headerGradient}
          >
            <SafeAreaView edges={["top"]} style={styles.headerSafeArea}>
              <View style={styles.headerButtons}>
                <Pressable
                  onPress={() => router.back()}
                  style={({ pressed }) => [
                    styles.iconButton,
                    { opacity: pressed ? 0.7 : 1 },
                  ]}
                >
                  <MaterialIcons name="arrow-back" size={24} color={COLORS.onSurface} />
                </Pressable>
                <View style={styles.rightButtons}>
                  <Pressable
                    onPress={toggleFavorite}
                    style={({ pressed }) => [
                      styles.iconButton,
                      { opacity: pressed ? 0.7 : 1 },
                    ]}
                  >
                    <MaterialIcons
                      name={isFavorited ? "favorite" : "favorite-border"}
                      size={24}
                      color={isFavorited ? COLORS.primary : COLORS.onSurface}
                    />
                  </Pressable>
                  <Pressable
                    onPress={handleShare}
                    style={({ pressed }) => [
                      styles.iconButton,
                      { opacity: pressed ? 0.7 : 1 },
                    ]}
                  >
                    <MaterialIcons name="share" size={24} color={COLORS.onSurface} />
                  </Pressable>
                </View>
              </View>
            </SafeAreaView>
          </LinearGradient>
        </ImageBackground>

        {/* Content Card */}
        <Animated.View entering={FadeIn} style={styles.contentCard}>
          {/* Title and Meta Info */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{currentRemedy.title}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <MaterialIcons name="calendar-today" size={16} color={COLORS.accent} />
                <Text style={styles.metaText}>{totalDays} Days</Text>
              </View>
              <View style={styles.metaItem}>
                <MaterialIcons name="schedule" size={16} color={COLORS.accent} />
                <Text style={styles.metaText}>{currentRemedy.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <MaterialIcons name="spa" size={16} color={COLORS.accent} />
                <Text style={styles.metaText}>Natural Oils</Text>
              </View>
            </View>
            <Text style={styles.description}>
              {currentRemedy.description ||
                "Embark on a transformative journey to revitalize your hair. Harness the power of natural oils and herbs to achieve radiant shine and enhanced strength."}
            </Text>
          </View>

          {/* Join Challenge / Start Day Button */}
          <Animated.View entering={FadeInDown.delay(200)}>
            <Pressable
              onPress={handleButtonClick}
              style={({ pressed }) => [
                styles.joinButton,
                { opacity: pressed ? 0.9 : 1 },
              ]}
            >
              <Text style={styles.joinButtonText}>{buttonText}</Text>
            </Pressable>
          </Animated.View>

          {/* Schedule Section */}
          <Animated.View entering={FadeInDown.delay(300)} style={styles.scheduleSection}>
            <Text style={styles.sectionTitle}>Schedule</Text>
            <Text style={styles.sectionSubtitle}>Track your daily progress.</Text>
            <View style={styles.daysGrid}>
              {days.map((day, index) => {
                const isCompleted = completedDays.has(day);
                const isUnlocked = (day === 1) || (hasJoined && completedDays.has(day - 1));
                const isLastDay = day === totalDays;
                const showArrow = index < days.length - 1 && (index + 1) % 4 !== 0;

                return (
                  <React.Fragment key={day}>
                    <Pressable
                      onPress={() => handleDayClick(day)}
                      disabled={!isUnlocked}
                      style={({ pressed }) => [
                        styles.dayCircle,
                        isCompleted && styles.dayCircleCompleted,
                        !isUnlocked && styles.dayCircleLocked,
                        { opacity: pressed ? 0.8 : !isUnlocked ? 0.5 : 1 },
                      ]}
                    >
                      {isCompleted && !isLastDay ? (
                        <MaterialIcons name="check" size={20} color={COLORS.onPrimary} />
                      ) : isLastDay && isCompleted ? (
                        <MaterialIcons
                          name="sentiment-satisfied-alt"
                          size={24}
                          color={COLORS.onPrimary}
                        />
                      ) : (
                        <Text
                          style={[
                            styles.dayNumber,
                            isCompleted && styles.dayNumberCompleted,
                          ]}
                        >
                          {day}
                        </Text>
                      )}
                    </Pressable>
                    {showArrow && (
                      <MaterialIcons
                        name="arrow-forward"
                        size={16}
                        color={`${COLORS.onSurfaceVariant}50`}
                        style={styles.arrowIcon}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </View>
          </Animated.View>

          {/* Natural Ingredients Section */}
          <Animated.View entering={FadeInDown.delay(400)} style={styles.ingredientsSection}>
            <Text style={styles.sectionTitle}>Natural Ingredients Used</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.ingredientsScroll}
            >
              {currentRemedy.ingredients?.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.ingredientCircle}>
                    <MaterialIcons name="eco" size={40} color={COLORS.accent} />
                  </View>
                  <Text style={styles.ingredientName}>{ingredient}</Text>
                </View>
              )) || (
                <>
                  <View style={styles.ingredientItem}>
                    <View style={styles.ingredientCircle}>
                      <MaterialIcons name="eco" size={40} color={COLORS.accent} />
                    </View>
                    <Text style={styles.ingredientName}>Coconut Oil</Text>
                  </View>
                  <View style={styles.ingredientItem}>
                    <View style={styles.ingredientCircle}>
                      <MaterialIcons name="local-florist" size={40} color={COLORS.accent} />
                    </View>
                    <Text style={styles.ingredientName}>Aloe Vera</Text>
                  </View>
                  <View style={styles.ingredientItem}>
                    <View style={styles.ingredientCircle}>
                      <MaterialIcons name="grass" size={40} color={COLORS.accent} />
                    </View>
                    <Text style={styles.ingredientName}>Rosemary</Text>
                  </View>
                </>
              )}
            </ScrollView>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  // Hero Image
  heroImage: {
    width: "100%",
    height: 320,
  },
  heroImageStyle: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  headerGradient: {
    flex: 1,
  },
  headerSafeArea: {
    flex: 1,
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rightButtons: {
    flexDirection: "row",
    gap: 8,
  },
  // Content Card
  contentCard: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 24,
    paddingTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  // Title Section
  titleSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.onSurface,
    lineHeight: 32,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    fontWeight: "500",
  },
  description: {
    fontSize: 15,
    lineHeight: 22.5,
    color: COLORS.onSurfaceVariant,
  },
  // Join Button
  joinButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.onPrimary,
  },
  // Schedule Section
  scheduleSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    fontWeight: "500",
    marginBottom: 16,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    alignItems: "center",
  },
  dayCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceContainer,
    borderWidth: 1,
    borderColor: COLORS.outline,
    justifyContent: "center",
    alignItems: "center",
  },
  dayCircleCompleted: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dayCircleLocked: {
    backgroundColor: COLORS.surfaceContainer,
    borderColor: COLORS.outline,
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.onSurface,
  },
  dayNumberCompleted: {
    color: COLORS.onPrimary,
  },
  arrowIcon: {
    marginHorizontal: -4,
  },
  // Ingredients Section
  ingredientsSection: {
    marginBottom: 24,
  },
  ingredientsScroll: {
    gap: 16,
    paddingVertical: 8,
  },
  ingredientItem: {
    alignItems: "center",
    width: 96,
  },
  ingredientCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.surfaceContainer,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ingredientName: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.onSurfaceVariant,
    textAlign: "center",
  },
});

