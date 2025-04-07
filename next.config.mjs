/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   images: {
      domains: ['raw.githubusercontent.com'],
   },
   swcMinify: true,
   i18n: {
      locales: ['en', 'tr', 'de', 'fr', 'es-Es', 'es-MX', 'pt-BR', 'pt-PT', 'zh-CN', 'zh-TW',
      'ja', 'ko', 'ru', 'uk', 'vi', 'bg', 'cs', 'da', 'el', 'fi', 'hu', 'it', 'nl',
      'no', 'pl', 'ro', 'sk', 'sv', 'th'],
      defaultLocale: 'en',
      localeDetection: true
   }
};

export default nextConfig;