import React from 'react';
import { BaseToastProps } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { ErrorToast, SuccessToast, WarningToast, InfoToast } from '../components/CustomToast/CustomToast';

export const toastConfig = {
    // Error Toast
    error: ({ text1, text2, props }: BaseToastProps) => (
        <ErrorToast
            text1={text1}
            text2={text2}
            props={{
                bgColor: props?.bgColor || 'white',
                showButton: props?.showButton,
                buttonLabel: props?.buttonLabel,
                onButtonPress: props?.onButtonPress,
                onClose: () => Toast.hide(),
            }}
        />
    ),

    // Success Toast
    success: ({ text1, text2, props }: BaseToastProps) => (
        <SuccessToast
            text1={text1}
            text2={text2}
            props={{
                bgColor: props?.bgColor || 'white',
                showButton: props?.showButton,
                buttonLabel: props?.buttonLabel,
                onButtonPress: props?.onButtonPress,
                onClose: () => Toast.hide(),
            }}
        />
    ),

    // Warning Toast
    warning: ({ text1, text2, props }: BaseToastProps) => (
        <WarningToast
            text1={text1}
            text2={text2}
            props={{
                bgColor: props?.bgColor || 'white',
                showButton: props?.showButton,
                buttonLabel: props?.buttonLabel,
                onButtonPress: props?.onButtonPress,
                onClose: () => Toast.hide(),
            }}
        />
    ),

    // Info Toast
    info: ({ text1, text2, props }: BaseToastProps) => (
        <InfoToast
            text1={text1}
            text2={text2}
            props={{
                bgColor: props?.bgColor || 'white',
                showButton: props?.showButton,
                buttonLabel: props?.buttonLabel,
                onButtonPress: props?.onButtonPress,
                onClose: () => Toast.hide(),
            }}
        />
    ),
};
