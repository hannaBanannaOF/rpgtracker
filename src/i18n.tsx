import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(Backend)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        supportedLngs: ['en', 'es', 'pt-BR'],
        detection: { order: ["path", "querystring", "navigator"], lookupQuerystring: 'lng' },
        fallbackLng: 'en',
        keySeparator: '.',
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json'
        }
    });

export default i18n;