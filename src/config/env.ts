import Config from "react-native-config";

const ENV = {
  APP_NAME: Config.APP_NAME,

  API: {
    BASE_URL: Config.API_BASE_URL,
  },

  FIREBASE: {
    WEB_CLIENT_ID: Config.GOOGLE_WEB_CLIENT_ID,

    COLLECTIONS: {
      USERS: Config.FIREBASE_USERS_COLLECTION,
      TASKS: Config.FIREBASE_TASKS_COLLECTION,
    },
  },
};

export default ENV;