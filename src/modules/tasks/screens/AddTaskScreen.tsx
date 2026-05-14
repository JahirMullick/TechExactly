import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../../components/common/AppHeader";
import { createTaskOffline, updateTaskOffline } from "../../../services/realm/task.realm.service";
import { syncTasks } from "../../../services/sync/sync.service";
import Toast from "react-native-toast-message";
import { requestNotificationPermission, scheduleTaskReminder } from "../../../services/notificationService";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/redux/store";
import { ThemeType } from "../../../theme/theme/themeSlice";

const AddTaskScreen = ({ navigation, route }: any) => {
  const isEditing = route?.params?.isEdit;
  const taskId = route?.params?.taskId;

  const themePreference = useSelector((state: RootState) => state.theme.themePreference);
  const isDarkMode = themePreference === ThemeType.DARK;
  
  // Computed theme styles
  const bgColor = isDarkMode ? "#111827" : "#FFFFFF";
  const textColor = isDarkMode ? "#F9FAFB" : "#111827";
  const labelColor = isDarkMode ? "#D1D5DB" : "#374151";
  const inputBgColor = isDarkMode ? "#1F2937" : "#F9FAFB";
  const inputBorderColor = isDarkMode ? "#374151" : "#F3F4F6";

  const [title, setTitle] = useState(route?.params?.title || "");
  const [description, setDescription] = useState(route?.params?.description || "");
  const [remindMe, setRemindMe] = useState(false);
  
  // Update state if params change (e.g. navigation reuse)
  useEffect(() => {
    if (route?.params) {
      setTitle(route.params.title || "");
      setDescription(route.params.description || "");
    }
    
    // Request permissions on mount
    requestNotificationPermission();
  }, [route?.params]);

  const [loading, setLoading] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescFocused, setIsDescFocused] = useState(false);

  const isValid = title.trim().length > 0;

  const handleSave = async () => {
    if (!isValid) return;
    
    Keyboard.dismiss();
    setLoading(true);
    
    try {
      let currentTaskId = taskId;
      if (isEditing && taskId) {
        await updateTaskOffline(taskId, title.trim(), description.trim());
        Toast.show({ type: "success", text1: "Task updated successfully" });
      } else {
        const newTask = await createTaskOffline(title.trim(), description.trim());
        currentTaskId = newTask.id;
        Toast.show({ type: "success", text1: "Task saved successfully" });
      }
      
      // Schedule reminder if toggled (Demo: triggers in 15 seconds)
      if (remindMe && currentTaskId) {
         const triggerDate = new Date(Date.now() + 15 * 1000); // 15 seconds from now
         await scheduleTaskReminder(currentTaskId, title.trim(), triggerDate);
         Toast.show({ type: "success", text1: "Reminder set for 15 seconds!" });
      }
      
      // Attempt auto-sync with Firebase if we are online
      syncTasks().catch((err) => console.log("Auto-sync deferred (offline)", err));
      
      navigation.goBack();
    } catch (error) {
      Toast.show({ type: "error", text1: "Failed to save task" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]}>
      <AppHeader title={isEditing ? "Edit Task" : "New Task"} navigation={navigation} isBack={true} isDarkMode={isDarkMode} />
      
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: labelColor }]}>Task Title</Text>
            <TextInput
              placeholder="What do you need to do?"
              style={[
                styles.input,
                { backgroundColor: inputBgColor, borderColor: inputBorderColor, color: textColor },
                isTitleFocused && styles.inputFocused
              ]}
              value={title}
              onChangeText={setTitle}
              editable={!loading}
              placeholderTextColor="#9CA3AF"
              onFocus={() => setIsTitleFocused(true)}
              onBlur={() => setIsTitleFocused(false)}
              returnKeyType="next"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: labelColor }]}>Description <Text style={styles.labelOptional}>(Optional)</Text></Text>
            <TextInput
              placeholder="Add some details..."
              style={[
                styles.input, 
                styles.textArea,
                { backgroundColor: inputBgColor, borderColor: inputBorderColor, color: textColor },
                isDescFocused && styles.inputFocused
              ]}
              value={description}
              onChangeText={setDescription}
              editable={!loading}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
              placeholderTextColor="#9CA3AF"
              onFocus={() => setIsDescFocused(true)}
              onBlur={() => setIsDescFocused(false)}
            />
          </View>
          
          <TouchableOpacity 
            style={[styles.formGroup, { flexDirection: 'row', alignItems: 'center', marginTop: 10 }]} 
            onPress={() => setRemindMe(!remindMe)}
            activeOpacity={0.7}
          >
            <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: remindMe ? '#2563EB' : (isDarkMode ? '#4B5563' : '#D1D5DB'), backgroundColor: remindMe ? '#2563EB' : 'transparent', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                {remindMe && <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>✓</Text>}
            </View>
            <Text style={{ fontSize: 16, color: labelColor, fontWeight: '500' }}>Remind me (15 seconds demo)</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: bgColor, borderTopColor: inputBorderColor }]}>
          <TouchableOpacity 
            style={[
              styles.saveButton,
              isDarkMode && styles.saveButtonDark,
              (!isValid || loading) && styles.saveButtonDisabled
            ]} 
            onPress={handleSave}
            disabled={!isValid || loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={[
                styles.saveButtonText,
                (!isValid || loading) && styles.saveButtonTextDisabled
              ]}>
                Save Task
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: "#FFFFFF" 
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: { 
    padding: 24,
    paddingBottom: 40,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  labelOptional: {
    color: "#9CA3AF",
    fontWeight: "400",
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1.5,
    borderColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    fontSize: 16,
    color: "#111827",
    minHeight: 56, // Accessible touch target
  },
  inputFocused: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },
  textArea: {
    minHeight: 140,
    paddingTop: 16,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  saveButton: {
    backgroundColor: "#0F172A",
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonDark: {
    backgroundColor: "#374151",
    shadowColor: "#000",
  },
  saveButtonDisabled: {
    backgroundColor: "#F3F4F6",
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  saveButtonTextDisabled: {
    color: "#9CA3AF",
  },
});