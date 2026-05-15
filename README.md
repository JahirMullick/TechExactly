# TechExactly — Task Management App

A cross-platform (Android & iOS) task management app built with **React Native** and **TypeScript**.  
The app lets users sign up, log in, create/edit/delete tasks, and keeps everything working **even without internet**. When the connection comes back, all offline changes sync automatically to the cloud.

> **GitHub Repository:** [github.com/JahirMullick/TechExactly](https://github.com/JahirMullick/TechExactly)
> **Download APK:** [Google Drive](https://drive.google.com/drive/folders/1RGjQmg59UoSqPmvEQozzdiaOPuY74ZQH)

---

## Table of Contents

- [Architecture](#architecture)
- [Libraries Used](#libraries-used)
- [Folder Structure](#folder-structure)
- [How to Run](#how-to-run)
- [Performance Optimizations](#performance-optimizations)
- [Known Limitations](#known-limitations)

---

## Architecture

The app follows an **offline-first** approach. Here is how each part works:

### 1. Local Database as the Single Source of Truth

All task data is read from and written to a local **Realm** database. This means the app works perfectly even if there is no internet at all. The UI always talks to Realm — never directly to the cloud.

### 2. Background Cloud Sync

After every create, edit, or delete action, the app calls a `syncTasks()` function:

- **Offline → Online:** Any task marked as `synced: false` in Realm gets uploaded to **Firebase Firestore**.
- **Online → Offline:** Any new or updated task in Firestore (that the user doesn't have locally) gets downloaded into Realm.
- **Conflict Handling:** If the same task exists locally and in the cloud, the one with the **latest `updatedAt` timestamp wins** (last write wins).
- **Real-time Listener:** A Firestore `onSnapshot` listener runs in the background so that changes from the cloud show up instantly on the device.

### 3. State Management with Redux Toolkit

Redux Toolkit manages global app state. Right now, it handles the **dark/light theme preference** through a `themeSlice`. The theme choice is also saved in AsyncStorage so it survives app restarts.

### 4. Navigation (Auth Stack + App Stack)

React Navigation splits the app into two stacks:

- **Auth Stack** → Login and Signup screens (shown when the user is not logged in).
- **Task Stack** → Task List and Add/Edit Task screens (shown after login).

A `RootNavigator` checks the Firebase auth session. If a user is logged in, it shows the Task Stack. Otherwise, it shows the Auth Stack.

### 5. Push Notifications

- **Local Reminders:** The app uses **Notifee** to schedule time-based local notifications (e.g., "Don't forget: Buy groceries").
- **Server Push (Bonus):** A **Firebase Cloud Function** (Gen 2) listens for new documents in the `tasks` Firestore collection. When a task is synced to the cloud, the function sends a push notification to the user's device via **Firebase Cloud Messaging (FCM)**.

### 6. Multi-Environment Setup

The app uses `react-native-config` to load different `.env` files for each environment:

| Environment | Env File            | Run Command            |
|-------------|---------------------|------------------------|
| Development | `.env.development`  | `yarn android`         |
| Staging     | `.env.staging`      | `yarn android:staging` |
| Production  | `.env.production`   | `yarn android:prod`    |

Each env file contains keys like `APP_NAME`, `API_BASE_URL`, `GOOGLE_WEB_CLIENT_ID`, and Firestore collection names. This keeps sensitive values separate and makes it easy to switch between environments.

---

## Libraries Used

| Library | What It Does |
|---------|--------------|
| **React Native 0.84** | The core framework for building cross-platform mobile apps. |
| **TypeScript** | Adds static type checking so bugs are caught before the app runs. |
| **Realm** | A fast local database. Stores all tasks on the device for offline use. |
| **Firebase Auth** | Handles user sign-up and login with email and password. |
| **Firebase Firestore** | Cloud NoSQL database where tasks are synced when online. |
| **Firebase Cloud Messaging (FCM)** | Delivers server-side push notifications to devices. |
| **Firebase Cloud Functions (Gen 2)** | Runs backend code (sends push notifications) when a new task is written to Firestore. |
| **Notifee** | Creates and schedules local push notifications and displays FCM messages in the foreground. |
| **Redux Toolkit** | Manages global state (theme preference). |
| **React Redux** | Connects Redux state to React components. |
| **React Navigation** | Handles screen navigation with native stack navigators. |
| **React Native Config** | Reads environment-specific variables from `.env` files. |
| **NetInfo** | Checks if the device is online or offline to decide when to sync. |
| **AsyncStorage** | Stores small key-value data (like theme preference) that persists across sessions. |
| **React Native Gesture Handler** | Provides smooth, native-level touch and gesture handling. |
| **React Native Screens** | Uses native screen components for better navigation performance. |
| **React Native Safe Area Context** | Makes sure UI content stays within the safe area on notched devices. |
| **Axios** | HTTP client for any REST API calls. |
| **React Query (TanStack)** | Data-fetching library with caching and auto-refetch support. |
| **Redux Logger** | Logs every Redux action in the console during development. |
| **cross-env** | Sets environment variables in npm scripts across all operating systems. |

---

## Folder Structure

The project uses a **modular, feature-based** folder structure. Each feature (auth, tasks) has its own screens, services, and slices — making the codebase easy to scale.

```
tech-exactly/
├── App.tsx                      # App entry point — sets up Redux, FCM, navigation
├── index.js                     # React Native entry + background message handler
├── package.json                 # Dependencies and scripts
├── firebase.json                # Firebase project configuration
├── .env.development             # Dev environment variables
├── .env.staging                 # Staging environment variables
├── .env.production              # Production environment variables
│
├── functions/                   # Firebase Cloud Functions (server-side code)
│   └── index.js                 # Listens for new tasks in Firestore → sends push notification
│
├── src/
│   ├── adapter/                 # Thin wrappers around external libraries (toast, network)
│   ├── assets/                  # Images, icons, fonts
│   ├── components/              # Reusable UI components
│   │   ├── common/              # Shared components (buttons, inputs, etc.)
│   │   └── CustomToast/         # Custom toast notification component
│   │
│   ├── config/                  # App configuration
│   │   ├── env.ts               # Reads values from .env files
│   │   └── firebase.ts          # Firebase initialization config
│   │
│   ├── constants/               # App-wide constant values
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuthSession.ts    # Tracks Firebase auth state (logged in or not)
│   │   ├── useNetwork.ts        # Monitors internet connectivity
│   │   ├── useDimensions.ts     # Responsive dimension helpers
│   │   └── ...                  # Other utility hooks
│   │
│   ├── i18n/                    # Internationalization (language support)
│   │
│   ├── models/                  # Database schemas
│   │   └── task.schema.ts       # Realm schema for the Task object
│   │
│   ├── modules/                 # Feature modules (core app features)
│   │   ├── auth/                # Authentication feature
│   │   │   ├── screens/         # Login, Signup, Splash screens
│   │   │   ├── authService.ts   # Firebase auth API calls
│   │   │   └── authSlice.ts     # Redux slice for auth state
│   │   │
│   │   └── tasks/               # Task management feature
│   │       ├── screens/         # TaskList, AddTask screens
│   │       ├── taskService.ts   # Task business logic
│   │       ├── taskSlice.ts     # Redux slice for task state
│   │       └── types.ts         # TypeScript types for tasks
│   │
│   ├── navigation/              # Screen navigation
│   │   ├── RootNavigator.tsx    # Decides: show Auth Stack or Task Stack
│   │   ├── AuthNavigator.tsx    # Auth stack (Login → Signup)
│   │   └── TaskNavigator.tsx    # Task stack (TaskList → AddTask)
│   │
│   ├── services/                # Data and integration services
│   │   ├── firebase/            # Firebase-related services
│   │   │   ├── fcm.service.ts   # FCM token registration + foreground listener
│   │   │   └── firebase.service.ts  # Firestore CRUD operations
│   │   │
│   │   ├── realm/               # Local database services
│   │   │   ├── realm.service.ts     # Opens and returns Realm instance
│   │   │   └── task.realm.service.ts # Create, read, update, delete tasks in Realm
│   │   │
│   │   ├── sync/                # Offline ↔ Online sync logic
│   │   │   └── sync.service.ts  # Uploads unsynced tasks + downloads new ones
│   │   │
│   │   ├── notificationService.ts  # Schedule/cancel local task reminders
│   │   ├── networkService.ts       # Network status checker
│   │   └── tanstackQuery/          # React Query client setup
│   │
│   ├── store/                   # State management
│   │   ├── redux/               # Redux store, slices, typed hooks
│   │   │   ├── store.ts         # Configures the Redux store
│   │   │   ├── useAppDispatch.ts
│   │   │   └── useAppSelector.ts
│   │   └── asyncStorage/        # AsyncStorage helpers (theme persistence)
│   │
│   ├── theme/                   # Theming system
│   │   ├── color/               # Color definitions (light + dark palettes)
│   │   └── theme/
│   │       ├── themeSlice.ts    # Redux slice for dark/light mode toggle
│   │       └── useTheme.ts      # Hook to access current theme colors
│   │
│   ├── types/                   # Shared TypeScript types
│   └── utils/                   # Utility functions
│       ├── permissions.ts       # Runtime permission helpers
│       ├── showToast.ts         # Toast notification helpers
│       └── toastConfig.tsx      # Toast display configuration
│
├── android/                     # Android native project
└── ios/                         # iOS native project
```

---

## How to Run

### Prerequisites

- **Node.js** ≥ 22.11.0
- **Yarn** (recommended) or npm
- **React Native CLI** set up ([official guide](https://reactnative.dev/docs/environment-setup))
- **Android Studio** (for Android) and/or **Xcode** (for iOS)
- **Firebase project** with Auth, Firestore, and Cloud Messaging enabled

### Step 1 — Clone the Repository

```bash
git clone https://github.com/JahirMullick/TechExactly.git
cd TechExactly
```

### Step 2 — Add Firebase Config Files

You must add your own Firebase configuration files (these are not included in the repo for security):

- **Android:** Place `google-services.json` inside `android/app/`
- **iOS:** Place `GoogleService-Info.plist` inside `ios/`

### Step 3 — Set Up Environment Files

The app uses `.env` files to manage different environments. Create them in the project root:

```
# .env.development
APP_NAME=Tech Exactly
API_BASE_URL=https://dev-api.example.com
GOOGLE_WEB_CLIENT_ID=your_dev_google_web_client_id
FIREBASE_USERS_COLLECTION=users
FIREBASE_TASKS_COLLECTION=tasks
```

```
# .env.staging
APP_NAME=Tech Exactly Staging
API_BASE_URL=https://staging-api.example.com
GOOGLE_WEB_CLIENT_ID=your_staging_google_web_client_id
FIREBASE_USERS_COLLECTION=users
FIREBASE_TASKS_COLLECTION=tasks
```

```
# .env.production
APP_NAME=Tech Exactly
API_BASE_URL=https://api.example.com
GOOGLE_WEB_CLIENT_ID=your_prod_google_web_client_id
FIREBASE_USERS_COLLECTION=users
FIREBASE_TASKS_COLLECTION=tasks
```

### Step 4 — Install Dependencies

```bash
yarn install

# For iOS only:
cd ios && pod install && cd ..
```

### Step 5 — Run the App

| Environment | Android | iOS |
|-------------|---------|-----|
| **Development** | `yarn android` | `yarn ios` |
| **Staging** | `yarn android:staging` | — |
| **Production** | `yarn android:prod` | — |

### Step 6 — Build APK (Optional)

```bash
# Debug APK (development)
yarn build:apk:dev

# Release APK (staging)
yarn build:apk:staging

# Release APK (production)
yarn build:apk:prod

# AAB for Play Store (production)
yarn build:aab:prod
```

### Step 7 — Deploy Cloud Functions (Optional)

If you want the server-side push notification feature:

```bash
cd functions
npm install
firebase deploy --only functions
```

---

## Performance Optimizations

1. **FlatList Optimizations** — The task list screen uses React Native's `FlatList` with optimized props (`keyExtractor`, `getItemLayout`, etc.) for smooth scrolling with large numbers of tasks.

2. **Lazy Loading of Screens** — Both the Auth and Task navigators use `React.lazy()` with `Suspense` to load screen components only when they are needed, reducing the initial bundle load time.

3. **Realm for Local Reads** — Since the UI reads from the local Realm database instead of making network calls, the task list loads instantly — no loading spinners needed.

4. **Typed Redux Hooks** — Custom `useAppDispatch` and `useAppSelector` hooks provide proper TypeScript types, preventing unnecessary re-renders from wrong state selections.

---

## Known Limitations

1. **Email/Password Only** — The app only supports email and password login. Google Sign-In code exists in the codebase but is not actively wired up.

2. **Simple Conflict Resolution** — If two devices use the same account and edit the same task while both are offline, then come online at the same time, the **last write wins**. There is no field-level merging.

3. **No True Background Sync** — React Native doesn't guarantee that background timers keep running when the OS puts the app to sleep. The app syncs aggressively when it's open, but a full background sync would need native OS job schedulers (like Android's WorkManager).

4. **Offline Deletions Edge Case** — If you delete a task while offline, the local Realm record is removed immediately. When the internet comes back, the sync logic may fail to delete the corresponding Firestore document because the local record (with the task ID) is already gone. A proper fix would be to use a "tombstone" system (marking tasks as deleted instead of actually removing them).

5. **iOS Staging/Production Scripts** — The `package.json` only has iOS run commands for the development environment. Staging and production iOS builds would need additional configuration.

---

## License

This project was built as a take-home assignment for **TechExactly**.