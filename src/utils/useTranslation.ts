import { translations, translationsKey } from "./translations";
import { useLanguage } from "../context/LanguageContext";

export function useTranslation() {
  const { language } = useLanguage();
  return translations[language];
}

export function useTranslationKey(key: keyof typeof translationsKey) {
  return translationsKey[key];
}
