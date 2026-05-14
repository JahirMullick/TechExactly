import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import ENV from "./env";

export const firebaseAuth = auth();
export const firebaseDB = firestore();

/* Collections */

export const USERS_COLLECTION =
  firebaseDB.collection(ENV.FIREBASE.COLLECTIONS.USERS!);

export const TASKS_COLLECTION =
  firebaseDB.collection(ENV.FIREBASE.COLLECTIONS.TASKS!);