import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Aynı locale listesi burada da olmalı
const supportedLngs = [
  'en', 'tr', 'de', 'fr', 'es-Es', 'es-MX', 'pt-BR', 'pt-PT', 'zh-CN', 'zh-TW',
  'ja', 'ko', 'ru', 'uk', 'vi', 'bg', 'cs', 'da', 'el', 'fi', 'hu', 'it', 'nl',
  'no', 'pl', 'ro', 'sk', 'sv', 'th'
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs,
    interpolation: {
      escapeValue: false,
    },
    resources: {}, // Çeviri kullanılmıyor
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
  });

export default i18n;