import Realm from "realm";
import { Task } from "../../models/task.schema";

let realmInstance: Realm | null = null;

export const getRealm = async () => {
  if (!realmInstance) {
    realmInstance = await Realm.open({
      schema: [Task],
      schemaVersion: 1,
    });
  }

  return realmInstance;
};

export const clearRealmData = async () => {
  const realm = await getRealm();
  realm.write(() => {
    realm.deleteAll();
  });
};