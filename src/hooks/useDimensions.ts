// hooks/useDimensions.ts
import { Dimensions, ScaledSize, PixelRatio } from 'react-native';
import { useState, useEffect, useMemo } from 'react';

export interface DimensionsData {
  screenWidth: number;
  screenHeight: number;
  isPortrait: boolean;
  isTablet: boolean;
  wp: (widthPercent: number) => number;
  hp: (heightPercent: number) => number;
}

export type OrientationChangeCallback = (dimensions: DimensionsData) => void;

export const useDimensions = (onOrientationChange?: OrientationChangeCallback) => {
  const [dimensions, setDimensions] = useState<DimensionsData>(() => {
    const { width, height } = Dimensions.get('window');

    const wp = (widthPercent: number) =>
      PixelRatio.roundToNearestPixel((width * widthPercent) / 100);

    const hp = (heightPercent: number) =>
      PixelRatio.roundToNearestPixel((height * heightPercent) / 100);

    return {
      screenWidth: width,
      screenHeight: height,
      isPortrait: height >= width,
      isTablet: Math.min(width, height) >= 600,
      wp,
      hp,
    };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }: { window: ScaledSize }) => {
      const wp = (widthPercent: number) =>
        PixelRatio.roundToNearestPixel((window.width * widthPercent) / 100);

      const hp = (heightPercent: number) =>
        PixelRatio.roundToNearestPixel((window.height * heightPercent) / 100);

      const newDimensions: DimensionsData = {
        screenWidth: window.width,
        screenHeight: window.height,
        isPortrait: window.height >= window.width,
        isTablet: Math.min(window.width, window.height) >= 600,
        wp,
        hp,
      };

      if (onOrientationChange) {
        onOrientationChange(newDimensions);
      }

      setDimensions(newDimensions);
    });

    return () => subscription?.remove();
  }, [onOrientationChange]);

  return dimensions;
};

export const getDeviceType = (): 'small' | 'medium' | 'large' => {
  const { width } = Dimensions.get('window');
  if (width < 375) return 'small';
  if (width < 768) return 'medium';
  return 'large';
};
