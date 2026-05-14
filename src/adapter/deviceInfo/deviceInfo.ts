// get the device info here
import DeviceInfo from 'react-native-device-info';

export const getDeviceDetails = () => ({
  brand: DeviceInfo.getBrand(),
  model: DeviceInfo.getModel(),
  systemName: DeviceInfo.getSystemName(),
  systemVersion: DeviceInfo.getSystemVersion(),
  appVersion: DeviceInfo.getVersion(),
  buildNumber: DeviceInfo.getBuildNumber(),
  uniqueId: DeviceInfo.getUniqueId(),
});

// usage
// const deviceInfo = DeviceInfo.getDeviceDetails();