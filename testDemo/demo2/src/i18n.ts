import i18n from 'i18next';
// import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import translation_en from "./locales/en.json";
import translation_vi from "./locales/vi.json";

// the translations


i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                translation: translation_en
            },
            vi: {
                translation: translation_vi
            }
        },
        lng: localStorage.getItem('local') || 'en', // if you're using a language detector, do not define the lng option
        fallbackLng: "en",
        // debug: true,
        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });


export default i18n;