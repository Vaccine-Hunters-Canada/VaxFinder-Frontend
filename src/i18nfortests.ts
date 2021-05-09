/* eslint-disable import/no-default-export */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-fs-backend";

i18n
  .use(initReactI18next)
  .use(Backend)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      loadPath: "./public/locales/en/translation.json",
    },
  });

export default i18n;
