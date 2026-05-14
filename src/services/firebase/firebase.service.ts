import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import ENV from "../../config/env";

const tasksCollection = firestore().collection(
    ENV.FIREBASE.COLLECTIONS.TASKS || "tasks"
);

export const uploadTaskToFirebase = async (task: any) => {
    const user = auth().currentUser;

    if (!user) throw new Error("User not authenticated");

    return tasksCollection.doc(task.id).set({
        ...task,
        userId: user.uid,
    });
};

export const deleteTaskFromFirebase = async (taskId: string) => {
    const user = auth().currentUser;
    if (!user) throw new Error("User not authenticated");
    return tasksCollection.doc(taskId).delete();
};