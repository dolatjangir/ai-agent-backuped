import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // console.log("MIDDLEWARE PATH:", pathname);

  // ==========================================
  // SEO PROTECTION: Check /seo routes first
  // ==========================================
  if (pathname === '/seo' || pathname.startsWith('/seo/')) {
    const authToken = request.cookies.get('seo-auth-token')?.value;
    
    // Validate token
    const isValid = (() => {
      try {
        const decoded = JSON.parse(Buffer.from(authToken || '', 'base64').toString());
        return decoded.exp > Date.now();
      } catch {
        return false;
      }
    })();

    if (!isValid) {
      const loginUrl = new URL('/seo-login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
//  header logics
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// ✅ THIS IS REQUIRED
export const config = {
   matcher: [
    /*
     * Match all request paths except:
     * - _next (static files)
     * - api (API routes)
     * - assets, images, icons
     */
    "/((?!_next|api|assets|icons|.*\\..*).*)",
    "/seo",
    "/seo/:path*",
  ],
};

