
import { useAppDispatch, useAppSelector } from "../../store";
import { ThemeType, updateTheme } from "./themeSlice";


export const useTheme = () => {
  const defaultTheme = useAppSelector(state => state.theme.themePreference);
  const dispatch = useAppDispatch();
  const getCurrentTheme = () => {
    return defaultTheme;
  };
  const changeTheme = (theme: ThemeType) => {
    dispatch(updateTheme(theme));
  };

  return {changeTheme, getCurrentTheme};
};
