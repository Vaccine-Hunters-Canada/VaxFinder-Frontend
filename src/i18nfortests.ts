/* eslint-disable import/no-default-export */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nconfig } from "./i18n";
import cloneDeep from "lodash.clonedeep";

const i18nconfig_test = cloneDeep(i18nconfig); // Copy default configuration
i18nconfig_test.lng = "en-CA"; // Set default language to en-CA for tests don't use language detector

i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(i18nconfig_test);

export default i18n;
