import { getRealm } from "./realm.service";
import uuid from "react-native-uuid";
import auth from "@react-native-firebase/auth";

export const createTaskOffline = async (title: string, description?: string) => {
  const realm = await getRealm();
  const user = auth().currentUser;

  const newId = uuid.v4() as string;
  realm.write(() => {
    realm.create("Task", {
      id: newId,
      userId: user?.uid || "",
      title,
      description,
      status: "pending",
      synced: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
  
  return { id: newId };
};

export const updateTaskOffline = async (id: string, title?: string, description?: string, status?: string) => {
  const realm = await getRealm();
  realm.write(() => {
    const task = realm.objectForPrimaryKey<any>("Task", id);
    if (task) {
      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (status !== undefined) task.status = status;
      task.updatedAt = new Date();
      task.synced = false;
    }
  });
};

export const deleteTaskOffline = async (id: string) => {
  const realm = await getRealm();
  realm.write(() => {
    const task = realm.objectForPrimaryKey<any>("Task", id);
    if (task) {
      realm.delete(task);
    }
  });
};

export const getTasksOffline = async () => {
  const realm = await getRealm();
  return realm.objects("Task");
};