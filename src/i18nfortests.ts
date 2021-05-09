/* eslint-disable import/no-default-export */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-fs-backend";
import { format as date_fnz_tz_format } from "date-fns-tz";
import { enCA, frCA } from "date-fns/locale";

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
    backend: {
      loadPath: "./public/locales/en/translation.json",
    },
  });

export default i18n;
