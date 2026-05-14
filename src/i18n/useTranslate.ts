import { useTranslation } from 'react-i18next';
import { setData } from '../store/asyncStorage/asyncStorage';
import { LANGUAGE_KEY } from './config';

export enum LanguageTypeEnum {
  ENGLISH = 'en',
  SPANISH = 'sp',
}
export const useTranslate = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = async (lngKey: LanguageTypeEnum) => {
    await setData(LANGUAGE_KEY, lngKey);
    await i18n.changeLanguage(lngKey);
  };

  const translate = (text: string) => {
    return t(text);
  };
  return { changeLanguage, translate };
};
