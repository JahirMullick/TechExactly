import React, { Suspense } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";

// Lazy loading of screens
const TaskListScreen = React.lazy(() => import("../modules/tasks/screens/TaskListScreen"));
const AddTaskScreen = React.lazy(() => import("../modules/tasks/screens/AddTaskScreen"));

export type TaskStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
};

const Stack = createNativeStackNavigator<TaskStackParamList>();

export default function TaskNavigator() {
  return (
    <Suspense fallback={
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    }>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TaskList" component={TaskListScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
      </Stack.Navigator>
    </Suspense>
  );
}