import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  FlatList,
  Dimensions,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeInDown,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

// Animated Sparkle Component
const AnimatedSparkle = ({ delay = 0, style }: { delay?: number; style?: any }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(0, { duration: delay }),
        withTiming(1.5, { duration: 750 }),
        withTiming(0, { duration: 750 })
      ),
      -1,
      false
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: delay }),
        withTiming(0.5, { duration: 375 }),
        withTiming(1, { duration: 375 }),
        withTiming(0, { duration: 750 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.sparkle, style, animatedStyle]} />;
};

// Pulsing Button Component
const PulsingNeonButton = ({ 
  onPress, 
  text, 
  textStyle 
}: { 
  onPress: () => void; 
  text: string; 
  textStyle: any;
}) => {
  const pulseScale = useSharedValue(1);
  const glowIntensity = useSharedValue(1);

  useEffect(() => {
    // Pulsing scale animation
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: 1200 }),
        withTiming(1, { duration: 1200 })
      ),
      -1,
      false
    );

    // Glow intensity animation
    glowIntensity.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 1200 }),
        withTiming(1, { duration: 1200 })
      ),
      -1,
      false
    );
  }, []);

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: 0.3 * glowIntensity.value,
  }));

  const glowMiddleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: 0.4 * glowIntensity.value,
  }));

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Animated.View 
          style={[
            styles.neonButtonWrapper, 
            pressed && styles.neonButtonWrapperPressed,
            pulseAnimatedStyle
          ]}
        >
          {/* Outer glow layers */}
          <Animated.View 
            style={[
              styles.glowOuter, 
              pressed && styles.glowOuterPressed,
              glowAnimatedStyle
            ]} 
          />
          <Animated.View 
            style={[
              styles.glowMiddle, 
              pressed && styles.glowMiddlePressed,
              glowMiddleAnimatedStyle
            ]} 
          />
          
          {/* Button gradient */}
          <LinearGradient
            colors={["#FF6B00", "#FF9B42"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.nextButton, pressed && styles.nextButtonPressed]}
          >
            {/* Inner glossy highlight */}
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0)"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 0.5 }}
              style={styles.glossOverlay}
            />
            <Text style={textStyle}>{text}</Text>
          </LinearGradient>
        </Animated.View>
      )}
    </Pressable>
  );
};

// Onboarding slide data
const slides = [
  {
    id: "1",
    title: "WELCOME TO HAIRCARE",
    description: "Discover the ideal hair care routine, tailored just for you!",
    image: require("../assets/home-screen/home-screen-background.png"),
  },
  {
    id: "2",
    title: "PERSONALIZED ROUTINES",
    description: "Get custom hair care plans based on your unique hair type and goals",
    image: require("../assets/home-screen/home-screen-background-1.png"),
  },
  {
    id: "3",
    title: "TRACK YOUR PROGRESS",
    description: "Complete daily challenges and watch your hair transform over time",
    image: require("../assets/home-screen/home-screen-background-2.png"),
  },
  {
    id: "4",
    title: "NATURAL REMEDIES",
    description: "Explore proven natural treatments and ingredients for healthy hair",
    image: require("../assets/home-screen/home-screen-background-4.png"),
  },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const handleSkip = () => {
    router.push("/onboarding");
  };

  const handleGetStarted = () => {
    router.push("/onboarding");
  };

  const renderSlide = ({ item }: { item: typeof slides[0] }) => (
    <View style={styles.slide}>
      <ImageBackground 
        source={item.image} 
        style={styles.imageBackground} 
        resizeMode="cover"
        imageStyle={styles.imageStyle}
      >
        {/* Content */}
        <View style={styles.slideContent}>
          <View style={styles.contentWrapper}>
            {/* Sparkle decorations */}
            <AnimatedSparkle delay={0} style={{ top: "35%", left: "20%", width: 8, height: 8 }} />
            <AnimatedSparkle delay={300} style={{ top: "40%", left: "75%", width: 12, height: 12 }} />
            <AnimatedSparkle delay={600} style={{ top: "50%", left: "30%", width: 6, height: 6 }} />
            <AnimatedSparkle delay={900} style={{ top: "55%", right: "15%", width: 10, height: 10 }} />

            {/* Spacer to push content down */}
            <View style={{ flex: 1 }} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      {currentIndex < slides.length - 1 && (
        <SafeAreaView style={styles.skipContainer} edges={["top"]}>
          <Pressable onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        </SafeAreaView>
      )}

      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(item) => item.id}
      />

      {/* Bottom Section with Text, Dots and Button */}
      <View style={styles.fixedBottomSection}>
        {/* Text Content */}
        <View style={styles.textContainer}>
          <Animated.Text entering={FadeInDown.delay(400)} style={styles.title}>
            {slides[currentIndex].title}
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(500)} style={styles.dividerLine} />
          <Animated.Text entering={FadeInDown.delay(600)} style={styles.description}>
            {slides[currentIndex].description}
          </Animated.Text>
        </View>

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentIndex && styles.activeDot]}
            />
          ))}
        </View>

        {/* Button */}
        <SafeAreaView style={styles.buttonSafeArea} edges={["bottom"]}>
          <View style={styles.buttonContainer}>
            {currentIndex < slides.length - 1 ? (
              <PulsingNeonButton 
                onPress={handleNext}
                text="Next"
                textStyle={styles.nextButtonText}
              />
            ) : (
              <PulsingNeonButton 
                onPress={handleGetStarted}
                text="Continue"
                textStyle={styles.continueButtonText}
              />
            )}
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  skipContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  skipButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  skipText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  slide: {
    width: width,
    height: height,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    alignSelf: "center",
    top: -100,
  },
  slideContent: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sparkle: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 100,
  },
  textContainer: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 34,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  dividerLine: {
    width: 60,
    height: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    marginBottom: 16,
  },
  description: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    maxWidth: 340,
    lineHeight: 40,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    marginBottom:6
  },
  fixedBottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0D0C16",
    borderTopEndRadius: 100,
    borderTopStartRadius: 100,
  },
  buttonSafeArea: {
    paddingTop: 20,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  activeDot: {
    width: 24,
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 32,
    paddingBottom: 30,
  },
  // Neon button wrapper for positioning glow layers
  neonButtonWrapper: {
    position: "relative",
    width: "100%",
  },
  neonButtonWrapperPressed: {
    transform: [{ scale: 0.98 }],
  },
  // Outer glow layer - soft orange neon effect
  glowOuter: {
    position: "absolute",
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 9999,
    backgroundColor: "#FF6B00",
    opacity: 0.3,
    shadowColor: "#FF6B00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  glowOuterPressed: {
    opacity: 0.5,
    shadowRadius: 25,
  },
  // Middle glow layer - creates depth
  glowMiddle: {
    position: "absolute",
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 9999,
    backgroundColor: "#FF8520",
    opacity: 0.4,
    shadowColor: "#FF8520",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 8,
  },
  glowMiddlePressed: {
    opacity: 0.6,
    shadowRadius: 18,
  },
  // Main button with gradient
  nextButton: {
    paddingVertical: 18,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#FF6B00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  nextButtonPressed: {
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  // Glossy overlay for shiny effect
  glossOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderRadius: 9999,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    zIndex: 1,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    zIndex: 1,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
