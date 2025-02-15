import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18nConfig } from './i18n/config'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the request is for a static file
  if (
    pathname.startsWith('/_next/') || // Next.js assets
    pathname.startsWith('/img/') ||   // Images
    pathname.startsWith('/api/') ||   // API routes
    pathname.includes('.') ||         // Files with extensions (e.g., favicon.ico)
    pathname === '/favicon.ico'       // Favicon specifically
  ) {
    return NextResponse.next()
  }

  // Handle locale routing for non-static paths
  const pathnameIsMissingLocale = i18nConfig.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = request.headers.get('accept-language')?.split(',')[0].split('-')[0] || i18nConfig.defaultLocale

    if (i18nConfig.locales.includes(locale as any)) {
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname === '/' ? '' : pathname}`,
          request.url
        )
      )
    }

    return NextResponse.redirect(
      new URL(
        `/${i18nConfig.defaultLocale}${pathname === '/' ? '' : pathname}`,
        request.url
      )
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
    // Optional: add public files here if you want them to be handled by middleware
    // '/img/:path*',
  ],
} 