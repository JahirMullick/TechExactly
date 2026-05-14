import { getNetworkStatus } from "../../adapter/network/networkStatus";
import { ShortBottomToaster } from "../../adapter/toast/toastAdapter";
import { uploadTaskToFirebase } from "../firebase/firebase.service";
import { getRealm } from "../realm/realm.service";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import ENV from "../../config/env";

export const syncTasks = async () => {
    const { isConnected } = await getNetworkStatus();

    if (!isConnected) {
        ShortBottomToaster("No internet connection - using offline mode");
        return;
    }

    const realm = await getRealm();
    const user = auth().currentUser;
    
    if (!user) return;

    // 1. Sync Offline to Online (Upload unsynced Realm changes to Firebase)
    const unsyncedTasks = realm.objects("Task").filtered("synced == false");

    for (let task of unsyncedTasks) {
        try {
            await uploadTaskToFirebase(task);
            realm.write(() => {
                task.synced = true;
            });
        } catch (error) {
            console.error("Task sync failed for offline data:", error);
        }
    }

    // 2. Sync Online to Offline (Download new Firebase data to Realm)
    const tasksCollection = firestore().collection(ENV.FIREBASE.COLLECTIONS.TASKS || "tasks");
    try {
        const snapshot = await tasksCollection.where('userId', '==', user.uid).get();
        if(!snapshot.empty) {
           realm.write(() => {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    let existingTask = realm.objectForPrimaryKey<any>("Task", doc.id);
                    
                    if (!existingTask) {
                         realm.create("Task", {
                             id: doc.id,
                             title: data.title,
                             description: data.description,
                             status: data.status,
                             userId: data.userId,
                             synced: true,
                             createdAt: data.createdAt ? new Date(data.createdAt.toMillis()) : new Date(),
                             updatedAt: data.updatedAt ? new Date(data.updatedAt.toMillis()) : new Date()
                         });
                    } else if (data.updatedAt && existingTask.updatedAt && typeof existingTask.updatedAt.getTime === 'function' && data.updatedAt.toMillis() > existingTask.updatedAt.getTime()) {
                         existingTask.title = data.title;
                         existingTask.description = data.description;
                         existingTask.status = data.status;
                         existingTask.updatedAt = new Date(data.updatedAt.toMillis());
                         existingTask.synced = true;
                    }
                });
           });
        }
        // Removed toast: Database synced directly
    } catch(err) {
        console.error("Error syncing from firebase to realm:", err);
    }
};

export const startRealtimeSync = async () => {
    const user = auth().currentUser;
    if (!user) return null;

    const realm = await getRealm();
    const tasksCollection = firestore().collection(ENV.FIREBASE.COLLECTIONS.TASKS || "tasks");

    const unsubscribe = tasksCollection
        .where('userId', '==', user.uid)
        .onSnapshot(
            snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added' || change.type === 'modified') {
                        const data = change.doc.data();
                        
                        realm.write(() => {
                            let existingTask = realm.objectForPrimaryKey<any>("Task", change.doc.id);
                            
                            if (!existingTask) {
                                realm.create("Task", {
                                    id: change.doc.id,
                                    title: data.title,
                                    description: data.description,
                                    status: data.status,
                                    userId: data.userId,
                                    synced: true,
                                    createdAt: data.createdAt ? new Date(data.createdAt.toMillis()) : new Date(),
                                    updatedAt: data.updatedAt ? new Date(data.updatedAt.toMillis()) : new Date()
                                });
                            } else if (data.updatedAt && existingTask.updatedAt && typeof existingTask.updatedAt.getTime === 'function' && data.updatedAt.toMillis() > existingTask.updatedAt.getTime()) {
                                existingTask.title = data.title;
                                existingTask.description = data.description;
                                existingTask.status = data.status;
                                existingTask.updatedAt = new Date(data.updatedAt.toMillis());
                                existingTask.synced = true;
                            }
                        });
                    } else if (change.type === 'removed') {
                        realm.write(() => {
                            let existingTask = realm.objectForPrimaryKey<any>("Task", change.doc.id);
                            if (existingTask) {
                                realm.delete(existingTask);
                            }
                        });
                    }
                });
            },
            error => {
                console.error("Realtime sync error:", error);
            }
        );

    return unsubscribe;
};