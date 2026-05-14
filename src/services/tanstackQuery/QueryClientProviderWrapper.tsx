import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React, { useEffect, useRef, ReactNode } from 'react';
import { NetworkStatus, ToastAdapter } from '../../adapter';

type Props = {
  children: ReactNode;
};

// Create QueryClient outside component to avoid recreating it
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
      refetchOnWindowFocus: false,
      refetchOnMount: false, // Changed to prevent double calls
      refetchOnReconnect: true,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Ensure interceptors are setup only once
let interceptorsSetup = false;

const QueryClientProviderWrapper = ({ children }: Props): React.JSX.Element => {
  const hasShownOfflineToast = useRef<boolean>(false);
  const networkUnsubscribe = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Set initial network status
    const initializeNetworkStatus = async (): Promise<void> => {
      try {
        const { isConnected } = await NetworkStatus.getNetworkStatus();
        onlineManager.setOnline(!!isConnected);

        if (!isConnected) {
          // ToastAdapter.ShortBottomToaster(
          //   'Please check your internet connection'
          // );
          hasShownOfflineToast.current = true;
        }
      } catch (error) {
        console.error('Failed to get initial network status:', error);
      }
    };

    initializeNetworkStatus();

    // Set up React Query's online manager with network listener
    onlineManager.setEventListener(() => {
      networkUnsubscribe.current = NetworkStatus.subscribeToNetworkChanges(({ isConnected, type }) => {
        console.log('Network state changed:', { isConnected, type });

        const connected = !!isConnected;
        onlineManager.setOnline(connected);

        if (!connected && !hasShownOfflineToast.current) {
          // ToastAdapter.ShortBottomToaster(
          //   'Please check your internet connection'
          // );
          hasShownOfflineToast.current = true;
        } else if (connected && hasShownOfflineToast.current) {
          // ToastAdapter.ShortBottomToaster('Connection restored');
          hasShownOfflineToast.current = false;
        }
      });

      return networkUnsubscribe.current;
    });

    return () => {
      // Cleanup network subscription
      if (networkUnsubscribe.current) {
        networkUnsubscribe.current();
        networkUnsubscribe.current = null;
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryClientProviderWrapper;
