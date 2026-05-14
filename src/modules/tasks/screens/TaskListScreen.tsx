import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  RefreshControl,
  Alert 
} from "react-native";
import AppHeader from "../../../components/common/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTasksOffline, deleteTaskOffline, updateTaskOffline } from "../../../services/realm/task.realm.service";
import { syncTasks, startRealtimeSync } from "../../../services/sync/sync.service";
import { deleteTaskFromFirebase } from "../../../services/firebase/firebase.service";
import Toast from "react-native-toast-message";
import { EditIcon, DeleteIcon } from "../../../assets/iconsComponents";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/redux/store";
import { updateTheme, ThemeType } from "../../../theme/theme/themeSlice";
import { saveThemePreference } from "../../../store/asyncStorage/storageService";

const TaskListScreen = ({ navigation }: any) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  
  const dispatch = useDispatch();
  const themePreference = useSelector((state: RootState) => state.theme.themePreference);
  const isDarkMode = themePreference === ThemeType.DARK;

  const fetchTasks = async () => {
    try {
      const offlineTasks = await getTasksOffline();
      
      const mapTasks = (tasksCollection: any) => {
        return Array.from(tasksCollection).map((t: any) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          synced: t.synced,
          status: t.status
        }));
      };

      setTasks(mapTasks(offlineTasks));
      
      // Setup Realm listener so UI updates instantly when background sync changes data
      offlineTasks.addListener((collection: any) => {
          setTasks(mapTasks(collection));
      });
      
    } catch (error) {
      Toast.show({ type: "error", text1: "Failed to load tasks" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    
    // Start firebase realtime sync
    let unsubscribeFirebase: any;
    const setupSync = async () => {
        unsubscribeFirebase = await startRealtimeSync();
    };
    setupSync();
    
    return () => {
        if(unsubscribeFirebase) {
            unsubscribeFirebase();
        }
    }
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncTasks(); // Manual sync still works to force push offline changes
      Toast.show({ type: "success", text1: "Sync completed" });
    } finally {
      setSyncing(false);
    }
  };

  const handleDelete = (task: any) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              if (task.synced) {
                try {
                  await deleteTaskFromFirebase(task.id);
                } catch (e) {
                  console.log("Failed to delete from firebase, deleting locally anyway", e);
                }
              }
              await deleteTaskOffline(task.id);
              Toast.show({ type: "success", text1: "Task deleted" });
              
              // Attempt auto-sync to propagate deletions
              syncTasks().catch((err) => console.log("Auto-sync deferred (offline)", err));
            } catch (error) {
              Toast.show({ type: "error", text1: "Failed to delete task" });
            }
          }
        }
      ]
    );
  };

  const handleEdit = (task: any) => {
    navigation.navigate("AddTask", {
      isEdit: true,
      taskId: task.id,
      title: task.title,
      description: task.description,
    });
  };

  const handleToggleStatus = async (task: any) => {
    if (task.status === "completed") {
      return; // Do not allow unchecking a completed task
    }

    Alert.alert(
      "Complete Task",
      "Are you sure you want to mark this task as completed? You cannot undo this action.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm", 
          onPress: async () => {
            try {
              await updateTaskOffline(task.id, undefined, undefined, "completed");
              syncTasks().catch((err) => console.log("Auto-sync deferred (offline)", err));
            } catch (error) {
              console.log("Failed to toggle task status", error);
            }
          }
        }
      ]
    );
  };

  const toggleTheme = async () => {
    const newTheme = isDarkMode ? ThemeType.LIGHT : ThemeType.DARK;
    dispatch(updateTheme(newTheme));
    await saveThemePreference(newTheme);
  };

  // Computed theme styles
  const bgColor = isDarkMode ? "#111827" : "#F9FAFB";
  const textColor = isDarkMode ? "#F9FAFB" : "#111827";
  const cardColor = isDarkMode ? "#1F2937" : "#FFFFFF";
  const subtextColor = isDarkMode ? "#9CA3AF" : "#6B7280";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }} edges={["bottom"]}>
      <AppHeader 
        title="My Tasks" 
        navigation={navigation} 
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
      />
      
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: textColor }]}>Tasks</Text>
          <Text style={styles.taskCount}>{tasks.length} items</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#2563EB" style={{ flex: 1 }} />
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={syncing} onRefresh={handleSync} tintColor="#2563EB" />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>No tasks yet</Text>
                <Text style={styles.emptyText}>Tap the button below to add your first task.</Text>
              </View>
            }
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={7}
            removeClippedSubviews={true}
            renderItem={({ item }) => (
              <View style={[styles.taskCard, { backgroundColor: cardColor, opacity: item.status === 'completed' ? 0.7 : 1 }]}>
                <View style={[styles.taskInfo, { flexDirection: "row", alignItems: "flex-start" }]}>
                  <TouchableOpacity 
                    onPress={() => handleToggleStatus(item)} 
                    style={{ marginRight: 12, marginTop: 4 }}
                    disabled={item.status === 'completed'}
                  >
                    <View style={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: 12, 
                      borderWidth: 2, 
                      borderColor: item.status === 'completed' ? '#10B981' : '#D1D5DB', 
                      backgroundColor: item.status === 'completed' ? '#10B981' : 'transparent',
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      {item.status === 'completed' && <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>✓</Text>}
                    </View>
                  </TouchableOpacity>
                  
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.taskTitle, { color: textColor, textDecorationLine: item.status === 'completed' ? 'line-through' : 'none' }]}>
                      {item.title}
                    </Text>
                  
                    {item.description ? (
                      <Text style={[styles.taskDesc, { color: subtextColor, marginTop: 4, textDecorationLine: item.status === 'completed' ? 'line-through' : 'none' }]} numberOfLines={2}>
                        {item.description}
                      </Text>
                    ) : null}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                      <View style={[
                        styles.statusBadge, 
                        item.synced ? styles.statusBadgeSynced : styles.statusBadgeLocal,
                        styles.statusBadgeInline,
                        { marginTop: 0 }
                      ]}>
                        <Text style={[
                          { fontSize: 13, fontWeight: "500" },
                          item.synced ? styles.statusTextSynced : styles.statusTextLocal
                        ]}>
                          {item.synced ? "Synced" : "Local Only"}
                        </Text>
                      </View>
                      
                      <View style={styles.actionRow}>
                        {item.status !== 'completed' && (
                          <TouchableOpacity onPress={() => handleEdit(item)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} style={styles.actionButton}>
                            <EditIcon width={28} height={28} fillColor="#6B7280" />
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={() => handleDelete(item)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} style={styles.actionButton}>
                          <DeleteIcon width={28} height={28} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        )}

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.primaryButton, isDarkMode && styles.primaryButtonDark]}
            onPress={() => navigation.navigate("AddTask")}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>+ Add Task</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.secondaryButton, isDarkMode && styles.secondaryButtonDark]}
            onPress={handleSync}
            disabled={syncing}
            activeOpacity={0.7}
          >
            {syncing ? (
              <ActivityIndicator size="small" color={textColor} />
            ) : (
              <Text style={[styles.secondaryButtonText, { color: textColor }]}>
                Manual Sync
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: { 
    fontSize: 28, 
    fontWeight: "800", 
    letterSpacing: -0.5,
  },
  taskCount: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 150, // space behind absolute footer
    minHeight: '100%',
  },
  taskCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.03)",
  },
  taskInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 12,
    lineHeight: 22,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
  taskDesc: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeInline: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  statusBadgeSynced: {
    backgroundColor: "#DCFCE7",
  },
  statusTextSynced: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "600",
  },
  statusBadgeLocal: {
    backgroundColor: "#FEF9C3",
  },
  statusTextLocal: {
    color: "#854D0E",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 40,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: "transparent",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#0F172A",
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonDark: {
    backgroundColor: "#374151",
    shadowColor: "#000",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  secondaryButton: {
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  secondaryButtonDark: {
    backgroundColor: "#1F2937",
    borderColor: "#374151",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});