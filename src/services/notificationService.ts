import notifee, { TimestampTrigger, TriggerType, AndroidImportance } from '@notifee/react-native';

// Request permissions on Android 13+ and iOS
export const requestNotificationPermission = async () => {
  await notifee.requestPermission();
};

export const scheduleTaskReminder = async (taskId: string, title: string, triggerDate: Date) => {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'task-reminders',
    name: 'Task Reminders',
    importance: AndroidImportance.HIGH,
  });

  // Create a time-based trigger
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: triggerDate.getTime(),
  };

  // Create a trigger notification
  await notifee.createTriggerNotification(
    {
      id: taskId,
      title: 'Task Reminder',
      body: `Don't forget: ${title}`,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
      },
    },
    trigger,
  );
};

export const cancelTaskReminder = async (taskId: string) => {
  await notifee.cancelNotification(taskId);
};