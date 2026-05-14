// for alert message adapter here
import { Alert } from 'react-native';

type AlertData = string | null | undefined;

class AlertAdapter {
    private sanitizeMessage(data: AlertData): string {
        return data ?? '';
    }

    public showAlert(title: AlertData, message: AlertData): void {
        try {
            Alert.alert(
                this.sanitizeMessage(title),
                this.sanitizeMessage(message),
                [{ text: 'OK' }],
                { cancelable: true }
            );
        } catch (e) {
            if (__DEV__) {
                console.warn('Alert error:', e);
            }
        }
    }

    public showAlertWithActions(
        title: AlertData,
        message: AlertData,
        actions: { text: string; onPress?: () => void; style?: 'default' | 'cancel' | 'destructive' }[]
    ): void {
        try {
            Alert.alert(
                this.sanitizeMessage(title),
                this.sanitizeMessage(message),
                actions,
                { cancelable: true }
            );
        } catch (e) {
            if (__DEV__) {
                console.warn('Alert error:', e);
            }
        }
    }

    public showConfirm(
        title: AlertData,
        message: AlertData,
        onConfirm: () => void,
        onCancel?: () => void
    ): void {
        try {
            Alert.alert(
                this.sanitizeMessage(title),
                this.sanitizeMessage(message),
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: onCancel,
                    },
                    {
                        text: 'OK',
                        onPress: onConfirm,
                    },
                ],
                { cancelable: false }
            );
        } catch (e) {
            if (__DEV__) {
                console.warn('Alert error:', e);
            }
        }
    }
}

// Export singleton
export const alertAdapter = new AlertAdapter();


// usage
// Simple alert
// AlertAdapter.showAlert('Error', 'Something went wrong');

// // Alert with actions
// AlertAdapter.showAlertWithActions('Title', 'Do you agree?', [
//     { text: 'No', style: 'cancel' },
//     { text: 'Yes', onPress: () => console.log('Confirmed') },
// ]);

// // Confirm alert
// AlertAdapter.showConfirm('Confirm', 'Are you sure?', () => {
//     console.log('Confirmed');
// });