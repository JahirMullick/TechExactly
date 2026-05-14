// all permisions define here
import { PermissionsAndroid as RNPermissionsAndroid, Platform } from 'react-native';

export type PermissionScope = 'camera' | 'gallery' | 'file' | 'notification' | 'all';

export async function requestPermission(scope: PermissionScope): Promise<boolean> {
    if (Platform.OS !== 'android') return true;

    try {
        const sdk33OrAbove = Platform.Version >= 33;

        switch (scope) {
            case 'camera':
                return await requestCameraPermission();

            case 'gallery':
                return sdk33OrAbove
                    ? await requestReadMediaImagesPermission()
                    : await requestReadExternalStoragePermission();

            case 'file':
                return sdk33OrAbove
                    ? await requestFileAccessForSDK33Plus()
                    : await requestFileAccessForLegacySDK();

            case 'notification':
                return await requestNotificationPermission();

            case 'all':
                if (sdk33OrAbove) {
                    const [camera, gallery, file, notification] = await Promise.all([
                        requestCameraPermission(),
                        requestReadMediaImagesPermission(),
                        requestWriteExternalStoragePermission(),
                        requestNotificationPermission()
                    ]);
                    return camera && gallery && file && notification;
                } else {
                    const [camera, gallery, write, notification] = await Promise.all([
                        requestCameraPermission(),
                        requestReadExternalStoragePermission(),
                        requestWriteExternalStoragePermission(),
                        requestNotificationPermission()
                    ]);
                    return camera && gallery && write && notification;
                }
        }
    } catch (error) {
        console.warn('Permission error:', error);
        return false;
    }
}

// ----------------- Individual Permissions -----------------

async function requestCameraPermission(): Promise<boolean> {
    const result = await RNPermissionsAndroid.request(
        RNPermissionsAndroid.PERMISSIONS.CAMERA,
        {
            title: 'Camera Permission',
            message: 'This app needs access to your camera.',
            buttonPositive: 'OK',
        }
    );
    return result === RNPermissionsAndroid.RESULTS.GRANTED;
}

async function requestReadMediaImagesPermission(): Promise<boolean> {
    const result = await RNPermissionsAndroid.request(
        RNPermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
            title: 'Gallery Permission',
            message: 'This app needs permission to access your images.',
            buttonPositive: 'OK',
        }
    );
    return result === RNPermissionsAndroid.RESULTS.GRANTED;
}

async function requestReadExternalStoragePermission(): Promise<boolean> {
    const result = await RNPermissionsAndroid.request(
        RNPermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
            title: 'Read Storage',
            message: 'App needs permission to read files from your device.',
            buttonPositive: 'OK',
        }
    );
    return result === RNPermissionsAndroid.RESULTS.GRANTED;
}

async function requestWriteExternalStoragePermission(): Promise<boolean> {
    const result = await RNPermissionsAndroid.request(
        RNPermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
            title: 'Write Storage',
            message: 'App needs permission to save files to your device.',
            buttonPositive: 'OK',
        }
    );
    return result === RNPermissionsAndroid.RESULTS.GRANTED;
}

async function requestNotificationPermission(): Promise<boolean> {
    const result = await RNPermissionsAndroid.request(
        RNPermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
            title: 'Notification Permission',
            message: 'App wants to send you push notifications.',
            buttonPositive: 'Allow',
        }
    );
    return result === RNPermissionsAndroid.RESULTS.GRANTED;
}

// ----------------- Composite Logic -----------------

async function requestFileAccessForLegacySDK(): Promise<boolean> {
    const read = await requestReadExternalStoragePermission();
    const write = await requestWriteExternalStoragePermission();
    return read && write;
}

async function requestFileAccessForSDK33Plus(): Promise<boolean> {
    const gallery = await requestReadMediaImagesPermission();
    const write = await requestWriteExternalStoragePermission();
    return gallery && write;
}

// usage

// Request camera only
// await Permissions.requestPermission('camera');

// // Request all permissions at once
// await Permissions.requestPermission('all');