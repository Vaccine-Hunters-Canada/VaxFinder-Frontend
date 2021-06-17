import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

import ar from "./locales/ar/translation.json";
import bn from "./locales/bn/translation.json";
import de from "./locales/de/translation.json";
import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";
import fa from "./locales/fa/translation.json";
import fr from "./locales/fr/translation.json";
import he from "./locales/he/translation.json";
import hr from "./locales/hr/translation.json";
import hu from "./locales/hu/translation.json";
import it from "./locales/it/translation.json";
import ja from "./locales/ja/translation.json";
import pl from "./locales/pl/translation.json";
import pt from "./locales/pt/translation.json";
import ro from "./locales/ro/translation.json";
import ru from "./locales/ru/translation.json";
import sr from "./locales/sr/translation.json";
import ta from "./locales/ta/translation.json";
import tl from "./locales/tl/translation.json";
import tr from "./locales/tr/translation.json";
import vi from "./locales/vi/translation.json";
import zhCN from "./locales/zhCN/translation.json";
import zhTW from "./locales/zhTW/translation.json";

export const i18nconfig: InitOptions = {
  fallbackLng: "en",
  debug: false,
  resources: {
    ar: { translation: ar }, // Arabic
    bn: { translation: bn }, // Bengali
    de: { translation: de }, // German
    en: { translation: en }, // English
    es: { translation: es }, // Spanish
    fa: { translation: fa }, // Persian/Farsi
    fr: { translation: fr }, // French
    he: { translation: he }, // Hebrew
    hr: { translation: hr }, // Croatian
    hu: { translation: hu }, // Hungarian
    it: { translation: it }, // Italian
    ja: { translation: ja }, // Japanese
    pl: { translation: pl }, // Polish
    pt: { translation: pt }, // Portugese
    ro: { translation: ro }, // Romanian
    sr: { translation: sr }, // Serbian
    ru: { translation: ru }, // Russian
    ta: { translation: ta }, // Tamil
    tl: { translation: tl }, // Tagalog
    tr: { translation: tr }, // Turkish
    vi: { translation: vi }, // Vietnamese
    "zh-CN": { translation: zhCN }, // Chinese (Traditional)
    "zh-TW": { translation: zhTW }, // Chinese (Simplified)
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
    format: function format(value, fmt, lng) {
      if (value instanceof Date && fmt !== undefined) {
        return value.toLocaleDateString(lng, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
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
  .init(i18nconfig, function callback() {
    // We use zh-CN for Simplified Chinese and zh-TW for Traditional Chinese
    // If language detected by browser is zh-HK or zh-MO (Hong Kong/Macau) switch to zh-TW (Taiwan)
    // If language detected by browser is zh-SG (Singapore) switch to zh-CN (Mainland China)
    // We will need to do this for other languages for which we implement multiple translations (e.g. Punjabi)
    // This is not needed for other languages
    if (i18n?.language === "zh-HK" || i18n?.language === "zh-MO") {
      i18n.changeLanguage("zh-TW");
    }
    if (i18n?.language === "zh-SG") {
      i18n.changeLanguage("zh-CN");
    }
  });
