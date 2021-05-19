/* eslint-disable import/no-default-export */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { format as date_fns_tz_format } from "date-fns-tz";
import { enCA as date_fns_enCA, frCA as date_fns_frCA } from "date-fns/locale";
import enCA from "./locales/en/translation.json";
import frCA from "./locales/fr/translation.json";

i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: "en",
    fallbackLng: "en",
    debug: true,
    resources: {
      en: { translation: enCA },
      fr: { translation: frCA },
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      format: function format(value, fmt, lng) {
        if (value instanceof Date && fmt !== undefined) {
          if (lng?.substring(0, 2) === "fr") {
            return date_fns_tz_format(value, fmt, { locale: date_fns_frCA });
          }
          return date_fns_tz_format(value, fmt, { locale: date_fns_enCA });
        }
        return value;
      },
    },
  });

export default i18n;
