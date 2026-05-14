import { setData, getData, removeData, removeMultiple } from './asyncStorage';
import {
  USER_DATA,
  USER_ID,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  FCM_TOKEN,
  THEME_PREFERENCE
} from '../../constants/storageKeys';
import { User, AuthTokens } from '../../types/user';

// Save user data (after login or profile update)
export async function saveUserData(user: User): Promise<boolean> {
  const userSaved = await setData(USER_DATA, user);
  const idSaved = await setData(USER_ID, user.id);
  return userSaved && idSaved;
}

// Get user data
export async function getUserData(): Promise<User | null> {
  return await getData<User>(USER_DATA);
}

// Get user ID
export async function getUserId(): Promise<string | null> {
  return await getData<string>(USER_ID);
}

// Update user data (merge with existing)
export async function updateUserData(updates: Partial<User>): Promise<boolean> {
  const currentUser = await getUserData();
  if (currentUser) {
    const updatedUser = { ...currentUser, ...updates };
    return await setData(USER_DATA, updatedUser);
  }
  return false;
}

// Save auth tokens
export async function saveAuthTokens(tokens: AuthTokens): Promise<boolean> {
  const accessSaved = await setData(ACCESS_TOKEN, tokens.access_token);
  const refreshSaved = await setData(REFRESH_TOKEN, tokens.refresh_token);
  return accessSaved && refreshSaved;
}

// Get auth token
export async function getAuthToken(): Promise<string | null> {
  return await getData<string>(ACCESS_TOKEN);
}

// Get refresh token
export async function getRefreshToken(): Promise<string | null> {
  return await getData<string>(REFRESH_TOKEN);
}

// Save FCM token
export async function saveFCMToken(token: string): Promise<boolean> {
  return await setData(FCM_TOKEN, token);
}

// Get FCM token
export async function getFCMToken(): Promise<string | null> {
  return await getData<string>(FCM_TOKEN);
}

// Clear user data (logout)
export async function clearUserData(): Promise<boolean> {
  return await removeMultiple([
    USER_DATA,
    USER_ID,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    FCM_TOKEN,
  ]);
}

// Check if user is logged in
export async function isLoggedIn(): Promise<boolean> {
  const token = await getAuthToken();
  return !!token;
}

// Save theme preference
export async function saveThemePreference(theme: string): Promise<boolean> {
  return await setData(THEME_PREFERENCE, theme);
}

// Get theme preference
export async function getThemePreference(): Promise<string | null> {
  return await getData<string>(THEME_PREFERENCE);
}
