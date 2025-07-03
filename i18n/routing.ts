import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'es', 'fr', 'ru'],
  defaultLocale: 'en'
});