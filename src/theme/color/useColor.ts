/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import { ColorObject } from './colorName';
import { light } from './light';
import { useTheme } from '../theme/useTheme';
import { ThemeType } from '../theme/themeSlice';
import { dark } from './dark';

export const useColor = () => {
  const [allColors, setAllColors] = useState<ColorObject>(light);
  const theme = useTheme();
  // console.log(allColors, 'checking');
  useEffect(() => {
    if (theme.getCurrentTheme() === ThemeType.LIGHT) {
      setAllColors(light);
    } else {
      setAllColors(dark);
    }
  }, [theme.getCurrentTheme()]);
  return allColors;
};
