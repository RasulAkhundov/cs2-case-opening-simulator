import { NextResponse } from 'next/server';

const locales = [
  'en', 'tr', 'de', 'fr', 'es-Es', 'es-MX', 'pt-BR', 'pt-PT', 'zh-CN', 'zh-TW',
  'ja', 'ko', 'ru', 'uk', 'vi', 'bg', 'cs', 'da', 'el', 'fi', 'hu', 'it', 'nl',
  'no', 'pl', 'ro', 'sk', 'sv', 'th'
];
const defaultLocale = 'en';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.(.*)$/.test(pathname)
  ) {
    return;
  }

  const pathLocale = pathname.split('/')[1];
  if (locales.includes(pathLocale)) {
    return;
  }

  const langHeader = request.headers.get('accept-language');
  const preferredLang = langHeader?.split(',')[0].split('-')[0];
  const matched = locales.find((lng) => lng.startsWith(preferredLang)) || defaultLocale;

  return NextResponse.redirect(new URL(`/${matched}${pathname}`, request.url));
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\..*).*)'],
};