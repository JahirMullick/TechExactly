// here network status
import NetInfo from '@react-native-community/netinfo';

// Get current network status once
export const getNetworkStatus = async () => {
    const state = await NetInfo.fetch();
    return {
        isConnected: state.isConnected,
        type: state.type,
    };
};

// Listen to network changes
export const subscribeToNetworkChanges = (
    callback: (state: { isConnected: boolean | null; type: string }) => void
) => {
    return NetInfo.addEventListener((state) => {
        callback({
            isConnected: state.isConnected,
            type: state.type,
        });
    });
};


// usage
// const { isConnected } = await getNetworkStatus();
// if (!isConnected) {
//     throw new Error('No internet connection');
// }

// useEffect(() => {
//     const unsubscribe = subscribeToNetworkChanges(({ isConnected }) => {
//         if (!isConnected) {
//             Alert.alert('Connection Lost', 'You are offline');
//         }
//     });

//     return () => unsubscribe();
// }, []);