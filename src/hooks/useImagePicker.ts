// hooks/useImagePicker.ts
import { launchCamera, launchImageLibrary, Asset } from 'react-native-image-picker';
import { requestPermission } from '../utils/permissions';

export type ImageResult = {
    uri: string;
    fileName: string;
    type: string;
    fileSize: number;
} | null;

const generateRandomFileName = (ext: string = 'jpg') => {
    const random = Math.random().toString(36).substring(2, 10);
    const timestamp = Date.now();
    return `IMG_${timestamp}_${random}.${ext}`;
};

const processImageAsset = (asset: Asset): ImageResult => {
    const uri = asset.uri || '';
    const type = asset.type || 'image/jpeg';
    const ext = type.split('/')[1] || 'jpg';
    const fileSize = asset.fileSize || 0;

    return {
        uri,
        fileName: generateRandomFileName(ext),
        type,
        fileSize,
    };
};

export const useImagePicker = () => {

    const openCamera = async (): Promise<ImageResult> => {
        const hasPermission = await requestPermission('camera');
        if (!hasPermission) return null;

        const response = await launchCamera({
            mediaType: 'photo',
            quality: 0.6,
            saveToPhotos: true,
        });

        if (response.didCancel || response.errorCode) {
            console.log('Camera Error:', response.errorMessage);
            return null;
        }

        return processImageAsset(response.assets?.[0] as Asset);
    };

    const openGallery = async (): Promise<ImageResult> => {
        // ✅ No permission request needed for Android 13+ with ImagePicker
        const response = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.6,
            selectionLimit: 1,
        });

        if (response.didCancel || response.errorCode) {
            console.log('Gallery Error:', response.errorMessage);
            return null;
        }

        return processImageAsset(response.assets?.[0] as Asset);
    };

    return {
        openCamera,
        openGallery,
    };
};
