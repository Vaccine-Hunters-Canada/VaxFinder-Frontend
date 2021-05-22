import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";
import { format as date_fns_tz_format } from "date-fns-tz";
import {
  enCA as date_fns_enCA,
  frCA as date_fns_frCA,
  zhCN as date_fns_zhCN,
} from "date-fns/locale";
import ar from "./locales/ar/translation.json";
import enCA from "./locales/en/translation.json";
import frCA from "./locales/fr/translation.json";
import zhCN from "./locales/zh/translation.json";

export const i18nconfig: InitOptions = {
  fallbackLng: "en-CA",
  debug: false,
  resources: {
    ar: { translation: ar },
    "en-CA": { translation: enCA },
    "fr-CA": { translation: frCA },
    "zh-CN": { translation: zhCN }, // TODO Chinese is Google Translate should be reviewed by a human before putting on production
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
    format: function format(value, fmt, lng) {
      if (value instanceof Date && fmt !== undefined) {
        const lang = lng?.substring(0, 2);
        switch (lang) {
          case "fr":
            return date_fns_tz_format(value, fmt, { locale: date_fns_frCA });
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
