import { en } from './en';

const keys: { [key: string]: string } = {};

Object.keys(en.translation).forEach(key => (keys[key] = key));

export const lngKey = Object.keys(en.translation).reduce((acc, key) => {
  acc[key as keyof typeof en.translation] = key as keyof typeof en.translation;
  return acc;
}, {} as { [key in keyof typeof en.translation]: keyof typeof en.translation });

// import { en } from './en';

// export const lngKey = Object.keys(en.translation).reduce((acc, key) => {
//   const typedKey = key as keyof typeof en.translation;
//   acc[typedKey] = typedKey;
//   return acc;
// }, {} as Record<keyof typeof en.translation, keyof typeof en.translation>);
