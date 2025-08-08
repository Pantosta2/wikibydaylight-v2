import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = routing.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

  let currentLocale = pathnameLocale || cookieLocale || routing.defaultLocale;

  if (!routing.locales.includes(currentLocale as any)) {
    currentLocale = routing.defaultLocale;
  }
  const response = intlMiddleware(request);

  const modifiedResponse = NextResponse.next();

  for (const [key, value] of response.headers.entries()) {
    modifiedResponse.headers.set(key, value);
  }

  if (cookieLocale !== currentLocale) {
    modifiedResponse.cookies.set("NEXT_LOCALE", currentLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, 
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  if (!pathnameLocale && currentLocale !== routing.defaultLocale) {
    const newUrl = new URL(`/${currentLocale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  if (pathnameLocale && pathnameLocale !== cookieLocale) {
    modifiedResponse.cookies.set("NEXT_LOCALE", pathnameLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, 
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  return modifiedResponse;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
