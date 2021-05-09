import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { format as date_fnz_tz_format } from "date-fns-tz";
import enCA from "date-fns/locale/en-CA";
import frCA from "date-fns/locale/fr-CA";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      // eslint-disable-next-line func-names
      format: function (value, format, lng) {
        if (value instanceof Date && format !== undefined) {
          if (lng !== undefined && lng.substring(0, 2) === "fr") {
            return date_fnz_tz_format(value, format, { locale: frCA });
          }
          return date_fnz_tz_format(value, format, { locale: enCA });
        }
        return value;
      },
    },
  });
