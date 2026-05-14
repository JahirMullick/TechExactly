# TechExactly Task Management App

A robust, offline-first, cloud-synced Task Management application built with React Native for the TechExactly Technical Assignment.

## 🏗️ Architecture Choice

The architecture is explicitly designed for an **Offline-First Data Flow**:
- **Single Source of Truth (Local)**: The application's UI strictly reads from and writes to the local **Realm Database** (`task.realm.service.ts`). This guarantees the app is infinitely usable regardless of network conditions.
- **Background Synchronization**: Upon any CRUD action (Create, Edit, Delete), the app triggers a `syncTasks()` algorithm. If the user is online, unsynced local data is instantly securely vaulted into a Google Firebase / Firestore server. Any structural conflicts automatically resolve in favor of the cloud's freshness timestamps.
- **State Management**: **Redux Toolkit** dictates pure application states — principally, standardizing UI behaviors like global Dark Mode / Theming dynamically across cached Navigation stacks without prop-drilling or stale renders.
- **Serverless Automation**: **Firebase Cloud Functions (Gen 2)** is utilized off-board to automate the delivery of Push Notifications back towards user devices the exact moment the Firestore network registers a newly synchronized task record. 

## 📚 Core Libraries Used

* **React Native (v0.84)** / **TypeScript**: Mobile Framework + Static Type Safety.
* **Realm (`realm`)**: Ultra-fast local database for offline persistence and querying.
* **Firebase (`@react-native-firebase/app`, `auth`, `firestore`, `messaging`)**: Cloud Identity, NoSQL online sync storage, and FCM Notification channels.
* **Redux Toolkit (`@reduxjs/toolkit`)**: Global state container managing the Theme states (`themeSlice.ts`).
* **Notifee (`@notifee/react-native`)**: Handles local scheduled task reminder triggers and formats remote FCM foreground heads-up banners on Android/iOS.
* **React Native Config**: Securely segregates environment variables.
* **React Navigation**: Fluid Native Screen Routing.

## 🚀 How To Run The App

### 1. Configure the Environment
We use `.env` files to control configuration profiles securely out of version control.
Inside the project root, rename the generated sample files into actual configurations:
- `cp .env.development.sample .env.development`
- `cp .env.production.sample .env.production`

Ensure Firebase credentials are fundamentally configured. **Note: You must drop your own `google-services.json` into the `android/app` directory and your own `GoogleService-Info.plist` into the `ios/` directory, as the developer's original files have been removed for security purposes.**

### 2. Dependency Installation
```bash
yarn install
cd ios && pod install && cd ..
```

### 3. Running Environments

**Run Development Build (Points to `.env.development`):**
```bash
yarn android
yarn ios
```

**Run Staging Build (Points to `.env.staging`):**
```bash
yarn android:staging
```

**Run Production Build (Points to `.env.production`):**
```bash
yarn android:prod
```

### 4. Deploying Firebase Cloud Functions
If you need to initialize or update the Push Notification backend listeners:
```bash
cd functions
npm install
firebase deploy --only functions
```

## ⚠️ Known Limitations

1. **Authentication Restrictions**: Registration exclusively relies on Email/Password. Social OAuth mechanisms have been stripped and are structurally dormant.
2. **Conflict Resolution Naivety**: If two physical devices use the same exact login and manipulate the exact same task item whilst offline, then both rejoin the internet simultaneously, it's a strict `Latest Write Wins` implementation; there is no granular merging of individual string variables.
3. **Background Sync Process**: React Native doesn't perfectly guarantee background thread longevity on standard timers when the OS force-sleeps the App. True background batching requires native OS JobSchedulers which aren't fully flushed out here beyond aggressive manual/active-mount re-sync attempts.
4. **Offline Deletions**: Deletions performed completely offline will permanently wipe the Realm record. The current logic effectively tries to instantly erase the Firebase node if connected, but there is an edge case where an offline delete deletes a Realm object that later fails to wipe from Firebase once the internet returns due to the local `taskId` node already missing. A tombstone syncing system (archiving nodes as 'deleted' rather than purging) would be required for strict multi-device architectural security.