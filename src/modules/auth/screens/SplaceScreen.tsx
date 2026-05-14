import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import useAuthSession from "../../../hooks/useAuthSession";

const SplashScreen = ({ navigation }: any) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tech Exactly</Text>
      <Text style={styles.subtitle}>Task Management System</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
});