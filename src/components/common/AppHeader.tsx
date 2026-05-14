import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import Svg, { Path, Circle } from "react-native-svg";
import { clearRealmData } from "../../services/realm/realm.service";
import { clearUserData } from "../../store/asyncStorage/storageService";

interface AppHeaderProps {
  title: string;
  navigation: any;
  isBack?: boolean;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

const BackIcon = ({ color }: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 18l-6-6 6-6" />
  </Svg>
);

const SunIcon = ({ color }: { color: string }) => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="4" />
    <Path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </Svg>
);

const MoonIcon = ({ color }: { color: string }) => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </Svg>
);

const AppHeader = ({ title, navigation, isBack, onThemeToggle, isDarkMode = false }: AppHeaderProps) => {
  const handleLogout = async () => {
    try {
      await clearRealmData();
      await clearUserData();
      await auth().signOut();
      navigation.replace("Auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const isLight = !isDarkMode;
  const bgColor = isLight ? "#FFFFFF" : "#111827";
  const textColor = isLight ? "#111827" : "#F9FAFB";
  const iconColor = isLight ? "#374151" : "#D1D5DB";

  return (
    <SafeAreaView edges={["top"]} style={[styles.safeArea, { backgroundColor: bgColor }]}>
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <View style={styles.leftContainer}>
          {isBack && (
            <TouchableOpacity 
              onPress={handleBack} 
              style={styles.actionButton}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <BackIcon color={iconColor} />
            </TouchableOpacity>
          )}
          <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        </View>

        <View style={styles.rightContainer}>
          {onThemeToggle && (
            <TouchableOpacity 
              onPress={onThemeToggle} 
              style={styles.actionButton}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {isDarkMode ? <SunIcon color={iconColor} /> : <MoonIcon color={iconColor} />}
            </TouchableOpacity>
          )}

          {!isBack && (
            <TouchableOpacity 
              onPress={handleLogout} 
              style={styles.actionButton}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={[styles.logoutText, { color: isLight ? "#EF4444" : "#F87171" }]}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFFFFF",
  },
  container: {
    height: 60,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
  },
});