import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "../../contexts/ThemeContext";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { getUserId } from "../../utils/userSession";
import { resetApp } from "../../utils/resetApp";
import ProfileModal from "../../components/ProfileModal";

interface SettingItem {
  id: string;
  title: string;
  icon: string;
  type: "action" | "toggle" | "navigation";
  onPress?: () => void;
}

export default function SettingsScreen() {
  const { colors, theme, toggleTheme } = useTheme();
  const [userId, setUserId] = useState<string>("");
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    getUserId().then(setUserId);
  }, []);

  const profile = useQuery(api.profiles.getProfile, userId ? { userId } : "skip");

  const handleReset = async () => {
    Alert.alert(
      "Reset App?",
      "This will clear all your data and return you to the welcome screen. Close and reopen the app after confirming.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await resetApp();
            Alert.alert(
              "Done! ✅",
              "App data cleared. Please close and reopen the app to see the welcome screen.",
              [{ text: "OK" }]
            );
          }
        }
      ]
    );
  };

  const settings: SettingItem[] = [
    {
      id: "profile",
      title: "Edit Profile",
      icon: "👤",
      type: "navigation",
      onPress: () => setShowProfile(true),
    },
    {
      id: "theme",
      title: theme === "light" ? "Dark Mode" : "Light Mode",
      icon: theme === "light" ? "🌙" : "☀️",
      type: "toggle",
      onPress: toggleTheme,
    },
    {
      id: "reset",
      title: "Reset App Data",
      icon: "🔄",
      type: "action",
      onPress: handleReset,
    },
  ];

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.overlay }]}>
              ⚙️ Settings
            </Text>
            <Text style={[styles.subtitle, { color: colors.overlay }]}>
              Manage your preferences
            </Text>
          </View>

          {/* Profile Summary */}
          {profile && (
            <Animated.View entering={FadeInDown.delay(100)}>
              <View
                style={[
                  styles.profileSummary,
                  { backgroundColor: colors.cardBackground, borderColor: colors.border },
                ]}
              >
                <View style={styles.profileIcon}>
                  <Text style={styles.profileEmoji}>👤</Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={[styles.profileName, { color: colors.text }]}>
                    {profile.name || "User"}
                  </Text>
                  {profile.hairType && (
                    <Text style={[styles.profileDetail, { color: colors.textSecondary }]}>
                      {profile.hairType.charAt(0).toUpperCase() + profile.hairType.slice(1)} hair
                      {profile.age && ` • ${profile.age} years old`}
                    </Text>
                  )}
                </View>
                <Pressable 
                  onPress={() => setShowProfile(true)}
                  style={[styles.editButton, { backgroundColor: colors.primaryLight }]}
                >
                  <Text style={[styles.editButtonText, { color: colors.primary }]}>
                    Edit
                  </Text>
                </Pressable>
              </View>
            </Animated.View>
          )}

          {/* Hair Profile Details */}
          {profile && (
            <>
              {profile.porosity && (
                <Animated.View entering={FadeInDown.delay(200)}>
                  <View
                    style={[
                      styles.detailCard,
                      { backgroundColor: colors.cardBackground, borderColor: colors.border },
                    ]}
                  >
                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                      Porosity
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {profile.porosity.charAt(0).toUpperCase() + profile.porosity.slice(1)}
                    </Text>
                  </View>
                </Animated.View>
              )}

              {profile.thickness && (
                <Animated.View entering={FadeInDown.delay(250)}>
                  <View
                    style={[
                      styles.detailCard,
                      { backgroundColor: colors.cardBackground, borderColor: colors.border },
                    ]}
                  >
                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                      Thickness
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {profile.thickness.charAt(0).toUpperCase() + profile.thickness.slice(1)}
                    </Text>
                  </View>
                </Animated.View>
              )}

              {profile.hairConcerns && profile.hairConcerns.length > 0 && (
                <Animated.View entering={FadeInDown.delay(300)}>
                  <View
                    style={[
                      styles.detailCard,
                      { backgroundColor: colors.cardBackground, borderColor: colors.border },
                    ]}
                  >
                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                      Concerns
                    </Text>
                    <View style={styles.tagsContainer}>
                      {profile.hairConcerns.map((concern, index) => (
                        <View
                          key={index}
                          style={[styles.tag, { backgroundColor: colors.primaryLight }]}
                        >
                          <Text style={[styles.tagText, { color: colors.primary }]}>
                            {concern}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </Animated.View>
              )}

              {profile.hairGoals && profile.hairGoals.length > 0 && (
                <Animated.View entering={FadeInDown.delay(350)}>
                  <View
                    style={[
                      styles.detailCard,
                      { backgroundColor: colors.cardBackground, borderColor: colors.border },
                    ]}
                  >
                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                      Goals
                    </Text>
                    <View style={styles.tagsContainer}>
                      {profile.hairGoals.map((goal, index) => (
                        <View
                          key={index}
                          style={[styles.tag, { backgroundColor: colors.success + "20" }]}
                        >
                          <Text style={[styles.tagText, { color: colors.success }]}>
                            {goal}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </Animated.View>
              )}
            </>
          )}

          {/* Settings List */}
          <View style={styles.settingsSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              App Settings
            </Text>
            {settings.map((setting, index) => (
              <Animated.View
                key={setting.id}
                entering={FadeInDown.delay(400 + index * 50)}
              >
                <Pressable
                  onPress={setting.onPress}
                  style={[
                    styles.settingItem,
                    { backgroundColor: colors.cardBackground, borderColor: colors.border },
                  ]}
                >
                  <Text style={styles.settingIcon}>{setting.icon}</Text>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>
                    {setting.title}
                  </Text>
                  <Text style={styles.settingArrow}>›</Text>
                </Pressable>
              </Animated.View>
            ))}
          </View>

          {/* App Info */}
          <View style={styles.appInfo}>
            <Text style={[styles.appInfoText, { color: colors.textSecondary }]}>
              Hair Care Routine App v1.0
            </Text>
            <Text style={[styles.appInfoText, { color: colors.textSecondary }]}>
              Made with 💖 for healthy hair
            </Text>
          </View>
        </ScrollView>

        {/* Profile Modal */}
        {showProfile && userId && (
          <ProfileModal
            userId={userId}
            onClose={() => setShowProfile(false)}
          />
        )}
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
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
  profileSummary: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 245, 235, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileEmoji: {
    fontSize: 32,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileDetail: {
    fontSize: 14,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  detailCard: {
    marginHorizontal: 24,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
  },
  settingsSection: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  settingArrow: {
    fontSize: 24,
    color: "#999",
  },
  appInfo: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  appInfoText: {
    fontSize: 12,
    marginBottom: 4,
  },
});

