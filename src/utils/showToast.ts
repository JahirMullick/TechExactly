import Toast from 'react-native-toast-message';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom' ;

interface ShowToastOptions {
    type: ToastType;
    title: string;
    message?: string;
    position?: ToastPosition;
    duration?: number;
    autoHide?: boolean;
    showButton?: boolean;
    buttonLabel?: string;
    onButtonPress?: () => void;
    topOffset?: number;
    bottomOffset?: number;
}

/**
 * Show a custom toast notification
 * @param options - Toast configuration options
 */
export const showToast = ({
    type,
    title,
    message,
    position = "top",
    duration = 3000,
    autoHide = true,
    showButton = false,
    buttonLabel,
    onButtonPress,
    topOffset = 50,
    bottomOffset = 40,
}: ShowToastOptions) => {
    Toast.show({
        type,
        text1: title,
        text2: message,
        position,
        visibilityTime: duration,
        autoHide,
        topOffset,
        bottomOffset,
        props: {
            showButton,
            buttonLabel,
            onButtonPress: () => {
                Toast.hide();
                onButtonPress?.();
            },
        },
    });
};

/**
 * Show success toast
 */
export const showSuccessToast = (
    title: string,
    message?: string,
    options?: Partial<Omit<ShowToastOptions, 'type' | 'title' | 'message'>>
) => {
    showToast({
        type: 'success',
        title,
        message,
        duration: 2000,
        ...options,
    });
};

/**
 * Show error toast
 */
export const showErrorToast = (
    title: string,
    message?: string,
    options?: Partial<Omit<ShowToastOptions, 'type' | 'title' | 'message'>>
) => {
    showToast({
        type: 'error',
        title,
        message,
        duration: 4000,
        ...options,
    });
};

/**
 * Show warning toast
 */
export const showWarningToast = (
    title: string,
    message?: string,
    options?: Partial<Omit<ShowToastOptions, 'type' | 'title' | 'message'>>
) => {
    showToast({
        type: 'warning',
        title,
        message,
        duration: 3500,
        ...options,
    });
};

/**
 * Show info toast
 */
export const showInfoToast = (
    title: string,
    message?: string,
    options?: Partial<Omit<ShowToastOptions, 'type' | 'title' | 'message'>>
) => {
    showToast({
        type: 'info',
        title,
        message,
        duration: 3000,
        ...options,
    });
};

/**
 * Hide the currently visible toast
 */
export const hideToast = () => {
    Toast.hide();
};
