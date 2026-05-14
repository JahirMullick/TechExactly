// image picker functions here
import { Platform } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { Permissions } from '.';

export interface UploadedFile {
    uri: string;
    type?: string;
    name?: string;
    size?: number;
}

/**
 * Pick an image from the device gallery.
 */
export function pickImageFromGallery(): Promise<UploadedFile | null> {
    return new Promise(async (resolve) => {
        try {
            const granted = await Permissions.requestPermission('gallery');
            if (!granted) return resolve(null);

            const options: ImagePicker.ImageLibraryOptions = {
                mediaType: 'photo',
                quality: 0.4,
            };

            ImagePicker.launchImageLibrary(options, (response) => {
                if (response.didCancel || response.errorCode || !response.assets?.[0]) {
                    return resolve(null);
                }

                const asset = response.assets[0];
                const file: UploadedFile = {
                    uri: Platform.OS === 'ios' ? decodeURI(asset.uri!) : asset.uri!,
                    type: asset.type,
                    name: asset.fileName,
                    size: asset.fileSize,
                };

                resolve(file);
            });
        } catch (err) {
            console.warn('pickImageFromGallery error:', err);
            resolve(null);
        }
    });
}

/**
 * Capture an image using the device camera.
 */
export function captureImageWithCamera(): Promise<UploadedFile | null> {
    return new Promise(async (resolve) => {
        try {
            const granted = await Permissions.requestPermission('camera');
            if (!granted) return resolve(null);

            const options: ImagePicker.CameraOptions = {
                mediaType: 'photo',
                quality: 0.4,
            };

            ImagePicker.launchCamera(options, (response) => {
                if (response.didCancel || response.errorCode || !response.assets?.[0]) {
                    return resolve(null);
                }

                const asset = response.assets[0];
                const file: UploadedFile = {
                    uri: Platform.OS === 'ios' ? decodeURI(asset.uri!) : asset.uri!,
                    type: asset.type,
                    name: asset.fileName,
                    size: asset.fileSize,
                };

                resolve(file);
            });
        } catch (err) {
            console.warn('captureImageWithCamera error:', err);
            resolve(null);
        }
    });
}


// usage
// const imageFromGallery = await ImagePicker.pickImageFromGallery();
// const imageFromCamera = await ImagePicker.captureImageWithCamera();