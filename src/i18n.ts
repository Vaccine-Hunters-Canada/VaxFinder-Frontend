import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";
import { format as date_fns_tz_format } from "date-fns-tz";
import {
  arSA as date_fns_arSA,
  enCA as date_fns_enCA,
  de as date_fns_de,
  frCA as date_fns_frCA,
  pl as date_fns_pl,
  ru as date_fns_ru,
  zhCN as date_fns_zhCN,
} from "date-fns/locale";
import ar from "./locales/ar/translation.json";
import de from "./locales/de/translation.json";
import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";
import pl from "./locales/pl/translation.json";
import ru from "./locales/ru/translation.json";
import zhCN from "./locales/zhCN/translation.json";

export const i18nconfig: InitOptions = {
  fallbackLng: "en-CA",
  debug: false,
  resources: {
    ar: { translation: ar },
    de: { translation: de },
    en: { translation: en },
    fr: { translation: fr },
    pl: { translation: pl },
    ru: { translation: ru },
    "zh-CN": { translation: zhCN },
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
    format: function format(value, fmt, lng) {
      if (value instanceof Date && fmt !== undefined) {
        const lang = lng?.substring(0, 2);
        switch (lang) {
          case "ar":
            return date_fns_tz_format(value, fmt, { locale: date_fns_arSA });
          case "de":
            return date_fns_tz_format(value, fmt, { locale: date_fns_de });
          case "fr":
            return date_fns_tz_format(value, fmt, { locale: date_fns_frCA });
          case "pl":
            return date_fns_tz_format(value, fmt, { locale: date_fns_pl });
          case "ru":
            return date_fns_tz_format(value, fmt, { locale: date_fns_ru });
          case "zh":
            return date_fns_tz_format(value, fmt, { locale: date_fns_zhCN });
          default:
            return date_fns_tz_format(value, fmt, { locale: date_fns_enCA });
        }
      }
      return value;
    },
  },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(i18nconfig);
