import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }

  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission granted for Android 13+');
    }
  }

  return enabled;
}

export const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log("FCM Token:", token);
      
      // Save the token to Firestore so your backend/server knows where to send the push
      const user = auth().currentUser;
      if (user) {
        await firestore().collection('users').doc(user.uid).set({
          fcmToken: token,
          updatedAt: firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      }

      return token;
    } catch (error) {
      console.error("Error getting FCM token:", error);
    }
};

export const setupFCMListener = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        // Display local push notification for foreground server push
        try {
            const channelId = await notifee.createChannel({
              id: 'fcm-server-push',
              name: 'Server Push Notifications',
              importance: AndroidImportance.HIGH,
            });

            await notifee.displayNotification({
              title: remoteMessage.notification?.title || 'New Notification',
              body: remoteMessage.notification?.body || 'You have a new message from server.',
              android: {
                channelId,
                importance: AndroidImportance.HIGH,
                pressAction: {
                  id: 'default',
                },
              },
            });
        } catch(e) {
            console.error("Foreground push failed: ", e);
        }
    });

    // Handle background messages via index.js normally
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });

    return unsubscribe;
}
