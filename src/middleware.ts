import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Protected routes that require authentication
const protectedRoutes = ["/dashboard", "/profile"];

// Public routes that don't require authentication
const publicRoutes = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => pathname.startsWith(route));
}

function getTokenFromCookies(request: NextRequest): string | null {
  const idToken = request.cookies.get("idToken")?.value;

  return idToken || null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Since localePrefix is "never", pathname is already without locale
  // But we need to handle both cases: with and without locale
  let pathnameWithoutLocale = pathname;

  // Remove locale prefix if present (for safety)
  const localeMatch = pathname.match(/^\/(en|fr|ar|pt)(\/|$)/);
  if (localeMatch) {
    pathnameWithoutLocale = pathname.replace(/^\/(en|fr|ar|pt)/, "") || "/";
  }

  // Normalize pathname (ensure it starts with /)
  if (!pathnameWithoutLocale.startsWith("/")) {
    pathnameWithoutLocale = "/" + pathnameWithoutLocale;
  }

  // Check if route is protected
  if (isProtectedRoute(pathnameWithoutLocale)) {
    const token = getTokenFromCookies(req);

    // If no token, redirect to signin
    if (!token) {
      const signinUrl = new URL("/signin", req.url);
      // Preserve the original URL as a redirect parameter
      signinUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signinUrl);
    }
  }

  // If user is authenticated and tries to access signin page, redirect to dashboard
  if (
    pathnameWithoutLocale === "/signin" ||
    pathnameWithoutLocale.startsWith("/signin/")
  ) {
    const token = getTokenFromCookies(req);
    if (token) {
      const dashboardUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // Continue with i18n middleware
  const i18nMiddleware = createMiddleware(routing);
  return i18nMiddleware(req);
}

// Configure which paths Middleware will run on
export const config = {
  matcher: [
    // Match all routes except:
    // - API routes
    // - Next.js internal static/image files
    // - favicon.ico
    // - Any file with an extension (e.g., .jpg, .png, .css, .js, .svg, .pdf, etc.)
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
