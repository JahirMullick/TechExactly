export enum ColorName {
  // Core Colors
  Default = 'Default',
  Primary = 'Primary',
  Secondary = 'Secondary',
  Tertiary = 'Tertiary',
  Quaternary = 'Quaternary',
  Quinary = 'Quinary',
  Senary = 'Senary',
  backgroudColor = 'backgroudColor', //#FAF7F0
  Greentxt = 'Greentxt', //#18795B
  Blacktxt = 'Blacktxt', //#505050,
  placeholderTxt = 'placeholderTxt', //#7F7F7F
  placeholderTxt2 = 'placeholderTxt2', //#E4E6DF80
  GreyVariant = 'GreyVariant', //#7C7C7C,
  GreenVariant = 'GreenVariant', //#3C8E60
  lightPink1 = '#F18F84',
  lightPink2 = '#F18F8466',
  // Additional Colors
  Black = 'Black',
  Grey1 = 'Grey1',
  Grey2 = 'Grey2',
  Grey3 = 'Grey3',
  Grey4 = 'Grey4',
  Grey5 = 'Grey5',
  Grey6 = 'Grey6',
  Grey7 = 'Grey7',
  Grey8 = 'Grey8',
  White = 'White',
  OysterWhite = 'OysterWhite',
  Ripple = 'Ripple',
  Red = 'Red',
  LightGreen = 'LightGreen',
}

export type ColorObject = { [key in ColorName]: string };
