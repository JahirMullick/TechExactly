import Toast from 'react-native-toast-message';

type ToastData = string | null | undefined;

const sanitizeMessage = (data: ToastData): string => data ?? '';

// For short messages, we'll map them to a simple 'info' toast with duration
export const ShortTopToaster = (data: ToastData) =>
    Toast.show({ type: 'info', text1: sanitizeMessage(data), position: 'top', visibilityTime: 2000 });

export const LongTopToaster = (data: ToastData) =>
    Toast.show({ type: 'info', text1: sanitizeMessage(data), position: 'top', visibilityTime: 4000 });

export const ShortCenterToaster = (data: ToastData) =>
    Toast.show({ type: 'info', text1: sanitizeMessage(data), position: 'top', visibilityTime: 2000 });

export const LongCenterToaster = (data: ToastData) =>
    Toast.show({ type: 'info', text1: sanitizeMessage(data), position: 'top', visibilityTime: 4000 });

export const ShortBottomToaster = (data: ToastData) =>
    Toast.show({ type: 'info', text1: sanitizeMessage(data), position: 'bottom', visibilityTime: 2000 });

export const LongBottomToaster = (data: ToastData) =>
    Toast.show({ type: 'info', text1: sanitizeMessage(data), position: 'bottom', visibilityTime: 4000 });

export const ErrorToaster = (data: ToastData) =>
    Toast.show({ type: 'error', text1: sanitizeMessage(data), position: 'bottom', visibilityTime: 3000 });

export const SuccessToaster = (data: ToastData) =>
    Toast.show({ type: 'success', text1: sanitizeMessage(data), position: 'bottom', visibilityTime: 3000 });

// Optional adapter object for legacy usage
export const ToastAdapter = {
    ShortTopToaster,
    LongTopToaster,
    ShortCenterToaster,
    LongCenterToaster,
    ShortBottomToaster,
    LongBottomToaster,
    ErrorToaster,
    SuccessToaster,
};