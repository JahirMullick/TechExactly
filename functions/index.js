const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

// Initialize the Firebase Admin SDK
admin.initializeApp();

// Listen for any new document created in the 'tasks' collection
exports.sendTaskSyncNotification = onDocumentCreated("tasks/{taskId}", async (event) => {
    const snap = event.data;
    if (!snap) return;

    const taskData = snap.data();
    
    // Get the user ID of the person who created the task
    const userId = taskData.userId;
    
    if (!userId) return console.log("No userId found for task.");

    // Look up the user's FCM token from the 'users' collection
    const userDoc = await admin.firestore().collection("users").doc(userId).get();
    const fcmToken = userDoc.data()?.fcmToken;

    if (!fcmToken) {
        return console.log(`User ${userId} does not have an FCM token saved.`);
    }

    // Construct the push notification payload
    const payload = {
      notification: {
        title: "New Task Synced!",
        body: `Your task "${taskData.title}" was successfully backed up to the cloud.`
      },
      token: fcmToken
    };

    // Send the message
    try {
      const response = await admin.messaging().send(payload);
      console.log("Successfully sent notification:", response);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
});