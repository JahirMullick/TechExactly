import { ColorName, ColorObject } from './colorName';

export const dark: ColorObject = {
  // Core Palette (darker for dark theme)
  [ColorName.Default]: '#18795B',
  [ColorName.Primary]: '#2F5A62',
  [ColorName.Secondary]: '#669591',
  [ColorName.Tertiary]: '#8FCDB5',
  [ColorName.Quaternary]: '#FAF7F0',
  [ColorName.Quinary]: '#FEEFEE',
  [ColorName.Senary]: '#FFAB91',

  // Greys (adjusted for dark theme)
  [ColorName.Black]: '#FFFFFF',
  [ColorName.Grey1]: '#F7F7F7',
  [ColorName.Grey2]: '#EEEEEE',
  [ColorName.Grey3]: '#CCCCCC',
  [ColorName.Grey4]: '#AAAAAA',
  [ColorName.Grey5]: '#888888',
  [ColorName.Grey6]: '#505050',
  [ColorName.Grey7]: '#333333',
  [ColorName.Grey8]: '#222222',
  [ColorName.White]: '#1C1C1C',
  [ColorName.OysterWhite]: '#F7F6F1',
  [ColorName.Ripple]: 'rgba(0,0,0,0.1)',
  [ColorName.Red]: '#E90000'
};
