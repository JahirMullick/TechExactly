import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './en';
import { sp } from './sp';
import { getData } from '../store/asyncStorage/asyncStorage';

export const LANGUAGE_KEY = '@app_language';

const initI18n = async () => {
  let savedLanguage = 'en'; // default fallback

  // try {
  //   const storedLanguage = await getData<string>(LANGUAGE_KEY);
  //   if (storedLanguage) {
  //     savedLanguage = storedLanguage;
  //   }
  // } catch (error) {
  //   console.error('Error loading language from storage:', error);
  // }

  i18n.use(initReactI18next).init({
    lng: savedLanguage,
    compatibilityJSON: 'v4',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: en.translation },
      sp: { translation: sp.translation },
    },
  });
};

initI18n();

export default i18n;
