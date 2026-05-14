import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import QueryClientProviderWrapper from './src/services/tanstackQuery/QueryClientProviderWrapper';

import { StatusBar } from 'react-native';
import { toastConfig } from './src/utils/toastConfig';
import Toast from 'react-native-toast-message';
import { createNavigationContainerRef } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { requestUserPermission, getFCMToken, setupFCMListener } from './src/services/firebase/fcm.service';

import { Provider, useDispatch } from 'react-redux';
import { store } from './src/store/redux/store';
import { getThemePreference } from './src/store/asyncStorage/storageService';
import { updateTheme, ThemeType } from './src/theme/theme/themeSlice';

export const navigationRef = createNavigationContainerRef();

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initTheme = async () => {
      const savedTheme = await getThemePreference();
      if (savedTheme && (savedTheme === ThemeType.LIGHT || savedTheme === ThemeType.DARK)) {
        dispatch(updateTheme(savedTheme as ThemeType));
      }
    };
    initTheme();
  }, [dispatch]);

  return (
    <QueryClientProviderWrapper>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="dark-content"
          />
           <RootNavigator/>
        </>
      </GestureHandlerRootView>
      <Toast config={toastConfig}/>
    </QueryClientProviderWrapper>
  );
};

function App(): React.JSX.Element {
  useEffect(() => {
    // Request permission and get token
    const setupFCM = async () => {
      const hasPermission = await requestUserPermission();
      if (hasPermission) {
        await getFCMToken();
      }
    };
    setupFCM();

    // Setup foreground listener
    const unsubscribe = setupFCMListener();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
