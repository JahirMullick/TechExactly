import React from 'react';
import { getDeviceType, useDimensions, DimensionsData } from './useDimensions';
import { Size, SizeKey } from '../constants/fontSize';

type DeviceType = 'small' | 'medium' | 'large';

const calculateFontSize = (
  baseFontSize: number,
  isTablet: boolean,
  customScaling?: {
    small?: number;
    medium?: number;
    large?: number;
  }
): number => {
  // Fallback for when device type isn't ready
  let deviceType: DeviceType;
  try {
    deviceType = getDeviceType();
  } catch (error) {
    console.warn('Device type detection failed, using default:', error);
    deviceType = 'medium'; // Safe fallback
  }
  
  // Default scaling - tablets get larger fonts, phones get smaller
  const scaling: Record<DeviceType, number> = {
    small: 0.75,    
    medium: 0.85,   
    large: 0.9,     
    ...customScaling,
  };

  if (isTablet) {
    const tabletScaling = 1.15;
    return Math.round(baseFontSize * tabletScaling);
  }

  const scaledSize = Math.round(baseFontSize * scaling[deviceType]);
  return Math.max(10, scaledSize);
};

// Optimized version using your useDimensions callback
export const useFontSize = (baseFontSize: number) => {
  const [fontSize, setFontSize] = React.useState<number>(() => {
    // Initialize with a calculated value
    const { width, height } = require('react-native').Dimensions.get('window');
    const isTablet = Math.min(width, height) >= 600;
    return calculateFontSize(baseFontSize, isTablet);
  });

  // Always call useDimensions with callback - never conditionally
  const dimensions = useDimensions(React.useCallback((newDimensions: DimensionsData) => {
    const newFontSize = calculateFontSize(baseFontSize, newDimensions.isTablet);
    setFontSize(newFontSize);
  }, [baseFontSize]));

  // Update font size when baseFontSize changes
  React.useEffect(() => {
    const newFontSize = calculateFontSize(baseFontSize, dimensions.isTablet);
    setFontSize(newFontSize);
  }, [baseFontSize, dimensions.isTablet]);

  return fontSize;
};

export const useFontSizeFromKey = (sizeKey: SizeKey) => {
  // Fallback for undefined Size keys
  const baseSize = Size?.[sizeKey] ?? 16;
  return useFontSize(baseSize);
};

export const useCustomFontSize = (
  baseFontSize: number,
  customScaling?: {
    small?: number;
    medium?: number;
    large?: number;
  }
) => {
  const [fontSize, setFontSize] = React.useState<number>(() => {
    const { width, height } = require('react-native').Dimensions.get('window');
    const isTablet = Math.min(width, height) >= 600;
    return calculateFontSize(baseFontSize, isTablet, customScaling);
  });

  const dimensions = useDimensions(React.useCallback((newDimensions: DimensionsData) => {
    const newFontSize = calculateFontSize(baseFontSize, newDimensions.isTablet, customScaling);
    setFontSize(newFontSize);
  }, [baseFontSize, customScaling]));

  React.useEffect(() => {
    const newFontSize = calculateFontSize(baseFontSize, dimensions.isTablet, customScaling);
    setFontSize(newFontSize);
  }, [baseFontSize, dimensions.isTablet, customScaling]);

  return fontSize;
};

// Simple versions without state (recommended for better performance)
export const useResponsiveFontSize = (baseFontSize: number) => {
  const dimensions = useDimensions();
  
  return React.useMemo(() => {
    return calculateFontSize(baseFontSize, dimensions.isTablet);
  }, [baseFontSize, dimensions.isTablet]);
};

export const useResponsiveFontSizeFromKey = (sizeKey: SizeKey) => {
  const baseSize = Size?.[sizeKey] ?? 16;
  return useResponsiveFontSize(baseSize);
};